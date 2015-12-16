/**
 * New Polls controller 
 * Handle new poll creation, update and community assignment
 */

angular.module('swift.newpolls')
    .controller('newPollsController', newPollsController);


newPollsController.$inject = ['$rootScope', '$scope', '$state', '$stateParams', '$loadingService', '$poll', '$controlBreadcrumb', '$platformService', '$newpollBreadcrumb', '$log', '$popupService', '$pollStore'];


function newPollsController($rootScope, $scope, $state, $stateParams, $loadingService, $poll, $controlBreadcrumb, $platformService, $newpollBreadcrumb, $log, $popupService, $pollStore) {

    $scope.allPartyList = [];
    $scope.selected = [];
    $scope.enddate = '';
    $scope.editPoll = false;
    $showSummary = false;
    $scope.uid = '';
    $model_header_background = 'model-header-background-orange';
    var newpoll_summary_overlay;
    $scope.newpoll_layout = 'app/components/newPolls/newPollQuestionerForm.html';
    $scope.newpoll_footer_buttons = 'app/components/newPolls/footer/newPollQuestionerFormFooter.html';
    


    var today = new Date();

    // Default poll data format 
    $scope.poll = {
        hasMultiAnswers: "no",
        endDate: new Date(today.setDate(today.getDate() + 7)),
        participantOrgIds: [],
        questions: [{
            questionText: "",
            questionType: "mcq",
            answers: [{
                id: 1,
                txtValue: ''

            }, {
                id: 2,
                txtValue: ''
            }],
        }],
    };


    // after enter to the page 
    $scope.$on('$ionicView.afterEnter', function(viewInfo) {
        $scope.question_form_btn_color = $rootScope.breadcrumb_btn_color;
    $scope.org_form_btn_color = 'swift-project-gray-bg';

        $scope.uid = $stateParams.pollUid;
        if ($stateParams && $stateParams.pollUid) {
            $scope.editPoll = true;
            $loadingService.show();
            $poll.getPollByUid($stateParams.pollUid, function(status, data) {
                $loadingService.hide();
                if (status) {
                    data.endDate = new Date(data.endDate);
                    $scope.poll = data;
                    return;
                }
                $popupService.showErrorMessage("Fetch poll data faild");
            });
            fetchCommunityList();
        }


    });


    // validate poll data
    function validatePollData() {
        var questionText = $scope.poll.questions[0].questionText;
        var answers = $scope.poll.questions[0].answers;
        var endDate = new Date($scope.poll.endDate);
        var today = new Date();

        if (!questionText) {
            $popupService.showErrorMessage("Question text required");
            return false;
        }

        var totalAnswers = 0;
        var ansawerText = [];
        for (var key in answers) {
            var answerValue = answers[key].txtValue;
            if (ansawerText[answerValue.toUpperCase()]) {
                $popupService.showErrorMessage("Duplicated answers");
                return false;
            }
            ansawerText[answerValue.toUpperCase()] = answers[key];
            if (answers[key].txtValue) {
                totalAnswers++;
                continue;
            }
            if (totalAnswers < 2) {
                $popupService.showErrorMessage("Answer text required");
                return false;
            }
            break;
        }

        if (today.getTime() > endDate.getTime()) {
            $popupService.showErrorMessage("Invalid expire date ");
            return false;
        }

        return true;
    }

    // remove empty values in answer array 
    function removeEmptyAnswers() {
        var filter = $scope.poll.questions[0].answers.filter(function(el) {
            return (el.txtValue) ? true : false;
        });

        $scope.poll.questions[0].answers = filter;
    }

    //save poll for share later
    $scope.savePoll = function(sharedPoll) {
        if (!validatePollData()) {
            return;
        }

        var participants = [];
        for (var key in $scope.partyList) {
            if ($scope.partyList[key]['selected']) {
                participants.push({
                    txtValue: $scope.partyList[key]['memberId']
                });
            }
        }
        $scope.poll.status = (sharedPoll) ? "active" : "inactive";
        $scope.poll.participantOrgIds = participants;

        if ($scope.poll.fingerprint) {
            updatePollData(false);
            return;
        }

        removeEmptyAnswers();
        $loadingService.show();
        $poll.createPoll($scope.poll, function(status, data) {
            $loadingService.hide();
            if (status == 201) {
                $popupService.showSuccessMessage('New Poll Created');
                $pollStore.updateUserCreatedPolls();
                //$rootScope.refreshData((sharedPoll) ? true : false);
                //$redirectTo = (sharedPoll) ? 'home.mypolls' : 'home.pending';
                $state.go('tab.mypolls');
                return;
            }
            $log.error("ERROR : Poll creation failed - status : " + status + " | Data : " + JSON.stringify($scope.poll));
            $popupService.showErrorMessage("ERROR : Poll creation failed - status : " + status);
        });
    }

    // navigate to community selection view
    $scope.goToOrganization = function() {
        if (!validatePollData()) {
            return;
        }
        fetchCommunityList();
        updateCommunityList();
        $scope.editPoll = true;
        $scope.question_form_btn_color = 'swift-project-gray-bg';
        $scope.org_form_btn_color = $rootScope.breadcrumb_btn_color;

        $scope.newpoll_layout = 'app/components/newPolls/newPollsOrganization.html';
        $scope.newpoll_footer_buttons = 'app/components/newPolls/footer/newPollOrganizationFooter.html';


        //$newpollBreadcrumb.activeOrganizationForm("#slider-content");
    }


    //add more Answers
    $scope.addMoreAnswers = function() {
        var r = Math.ceil(Math.random() * 1000);
        $scope.poll.questions[0].answers.push({
            id: r,
            txtValue: ''
        });
    };


    //remove Answers
    //allow only if there are more than two answers
    $scope.removeAnswer = function(item) {
        var answerArryLength = $scope.poll.questions[0].answers.length;
        var idx = $scope.poll.questions[0].answers.indexOf(item);
        if (answerArryLength > 2) {
            $scope.poll.questions[0].answers.splice(idx, 1);
        }
    };



    // select all communities
    $scope.selectAll = function(event) {
        var selectAll = document.getElementById('selectAll');
        var elements = document.getElementsByClassName('community-checkbox');

        for (var key in elements) {
            if ($scope.partyList[key]) {
                elements[key].checked = selectAll.checked
                $scope.partyList[key]['selected'] = selectAll.checked;
            }

        }
    };


    // navigate to question form
    $scope.goToQuestionForm = function() {
        $scope.question_form_btn_color = $rootScope.breadcrumb_btn_color;
        $scope.org_form_btn_color = 'swift-project-gray-bg';

        $scope.newpoll_layout = 'app/components/newPolls/newPollQuestionerForm.html';
        $scope.newpoll_footer_buttons = 'app/components/newPolls/footer/newPollQuestionerFormFooter.html';


        //$newpollBreadcrumb.activeQuestionForm("#slider-container");
    }


    // share poll with community
    $scope.sharePoll = function() {
        if (!validatePollData()) {
            return;
        }
        var participants = [];
        for (var key in $scope.partyList) {
            if ($scope.partyList[key]['selected']) {
                participants.push({
                    txtValue: $scope.partyList[key]['memberId']
                });
            }
        }
        if (!participants.length) {
            $popupService.showErrorMessage('Select Participants');
            return;
        }
        $scope.poll.status = "active";
        $scope.poll.participantOrgIds = participants;

        if (!$scope.poll.fingerprint) {
            $scope.savePoll(true);
            return;
        }

        //call update poll
        updatePollData(true);
    }


    // update poll data
    function updatePollData(shared) {
        removeEmptyAnswers();
        $loadingService.show();
        $poll.updatePoll($scope.poll, function(status, data) {
            $loadingService.hide();
            if (status == 202) {
                $popupService.showSuccessMessage('Poll successfully submitted');
                $pollStore.updateUserCreatedPolls();
                //$redirectTo = (shared) ? 'home.mypolls' : 'home.pending';
                $state.go('tab.mypolls');
                return;
            }
            $log.error("ERROR : Poll update failed - status : " + status + " | Data : " + JSON.stringify($scope.poll));
            $popupService.showErrorMessage('Error : ' + status);
        });
    }

    // fetch community list
    function fetchCommunityList() {
        if ($scope.allPartyList.length) {
            return;
        }
        $loadingService.show();
        //get party list from the platform service
        var partyResult = $platformService.getPartyList();

        partyResult.success(function(data, status) {
                $loadingService.hide();
                if (status == 200) {

                    $scope.allPartyList = data.result;

                    if ($scope.poll.participantOrgIds && $scope.poll.participantOrgIds.length) {
                        updateCommunityList();
                    }

                    $scope.orgType = 'All';
                    $scope.changePartyList('All');
                    return;
                }
                $log.error("ERROR : Get Community list failed - status : " + status);
                $scope.partyList = [];
            })
            .error(function(data, status) {
                $log.error("ERROR : Get Community list request failed - status : " + status);
            });
    }


    //Update community list 'selected' items 
    function updateCommunityList() {
        var participants = [];
        for (var key in $scope.poll.participantOrgIds) {
            participants[$scope.poll.participantOrgIds[key]['txtValue']] = true;
        }

        for (var key in $scope.allPartyList) {
            if (participants[$scope.allPartyList[key]['memberId']]) {
                $scope.allPartyList[key]['selected'] = true;
            }
        }
    }

    // change party list
    $scope.changePartyList = function(val) {
        if (!$scope.allPartyList) {
            return;
        }

        if (val == 'All') {
            return $scope.partyList = $scope.allPartyList;
        }

        if (val == 'Other') {
            return $scope.partyList = $scope.allPartyList.filter(function(el) {
                return (el.partyRoleCode != 'Seller' && el.partyRoleCode != 'Buyer' && el.partyRoleCode != 'Factory') ? true : false;
            });
        }

        $scope.partyList = $scope.allPartyList.filter(function(el) {
            return (el.partyRoleCode == val) ? true : false;
        });
    }


    // $scope.exists = function(item, list) {
    //     return list.indexOf(item) > -1;
    // };

}
