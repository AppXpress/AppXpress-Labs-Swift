angular.module('starter.sharedpolls')
    .controller('sharedPollsController', sharedPollsController);

sharedPollsController.$inject = ['$rootScope', '$scope', '$state', '$poll', '$answer', '$loadingService', '$log', '$popupService', '$timeout', '$ionicModal', '$pollStore'];



function sharedPollsController($rootScope, $scope, $state, $poll, $answer, $loadingService, $log, $popupService, $timeout, $ionicModal, $pollStore) {


    //$model_header_background = "model-header-background-orange";
    $scope.polllist = [];

    // model window initilization 
    $ionicModal.fromTemplateUrl('app/components/core/sharedpollModel.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        console.log(modal);
        $scope.sharedpollmodal = modal;
    })

    // open modal
    $scope.openModal = function(poll) {
        $scope.sharedpollmodal.show();
        $scope.poll = poll;

    }

    // close modal
    $scope.closeModal = function() {
        $scope.sharedpollmodal.hide();
    };

    // distroy the modal 
    $scope.$on('$destroy', function() {
        $scope.sharedpollmodal.remove();
    });


    // get shared polls list
    $scope.getSharedPolls = function(refresh) {
        if (!refresh) {
            $loadingService.show();
        }
        
        $pollStore.updateAssignedPollData(function (status, msg) {
            if (!refresh) {
                $loadingService.hide();
            }
            $rootScope.answeredpolls_status = status;
            $rootScope.sharedpolls_status = status;
            $rootScope.missedpolls_status = status;
        });
        //get the poll data and update the ui
//        $poll.getSharedPolls(function(status, data) {
//            $scope.status = status;
//            console.log("----- loading shared polls-----");
//            //console.log($scope.polllist);
//            if (data.result && $scope.polllist) {
//
//                // remove polls
//                $.each($scope.polllist, function(i, item) {
//                    var result = $.grep(data.result, function(e) {
//                        return e.uid == item.uid;
//                    });
//                    if (result.length <= 0) {
//                        console.log("twcwd " + i);
//                        $scope.polllist.splice(i, 1);
//                    }
//                });
//
//                // add or update polls
//                angular.forEach(data.result, function(item) {
//
//                    var index;
//
//                    $.each($scope.polllist, function(i, v) {
//                        //console.log(item.uid+" "+v.uid);
//                        if (item.uid == v.uid) {
//                            index = i;
//                            console.log(index);
//                            return true;
//                        }
//                    });
//
//
//                    if (index > -1) {
//                        console.log(index);
//                        $scope.polllist[index].questions = item.questions;
//                    } else {
//                        console.log(item);
//                        $scope.polllist.push(item);
//                    }
//
//
//                });
//
//            } else {
//                $scope.polllist = (status) ? data.result : [];
//            }
//
//            if (!refresh) {
//                $loadingService.hide();
//            }
//        });
    }

    // // answer  the poll
    // $scope.gotoanswerPoll = function(poll) {
    //     $scope.type = true;
    //     for (var key in poll.questions[0].answers) {
    //         poll.questions[0].answers[key]['selected'] = false;
    //     }
    //     $scope.poll = poll;


    //     if ($scope.multipleanswer) {
    //         $scope.type = "checkbox";
    //     } else {
    //         $scope.type = "radio";
    //     }
    // }


    // refresh the page
    $scope.doRefresh = function() {
        $rootScope.sharedpolls_status = false;
        $scope.getSharedPolls(true);

        $scope.$watch('sharedpolls_status', function(oldValue, newValue) {
            console.log(oldValue);
            console.log(newValue);
            if (oldValue) {
                $scope.$broadcast('scroll.refreshComplete');
            }

        });
        // $scope.getSharedPolls(true);

        // $scope.$watch('$scope.polllist', function(oldValue, newValue) {
        //     $scope.$broadcast('scroll.refreshComplete');

        // });

    }

    
    
    // answer  the poll
    $scope.answerPoll = function() {
        var answerStatus = false;
        for (var key in $scope.poll.questions[0].answers) {
            answerStatus = (answerStatus) ? answerStatus : $scope.poll.questions[0].answers[key]['selected'];
        }
        if (!answerStatus) {
            $popupService.showErrorMessage("Select an answer ");
            return;
        }
        $loadingService.show();
        $answer.createAnswer($scope.poll, function(status, data) {
            $loadingService.hide();
            if (status == 201) {

                $popupService.showAlert('successfully Answered', function(res) {
                    $scope.closeModal();
                    $rootScope.getAnsweredPolls(false);
                    $rootScope.getUserCreatedPolls(false);
                    for(var key in $rootScope.polllist_shared){
                        if($rootScope.polllist_shared[key].uid == $scope.poll.uid){
                            $rootScope.polllist_shared[key]['answered']=true;
                            continue;
                        }
                        $rootScope.polllist_shared[key]['answered']=false;
                    }
                    //$state.go('home.answered');
                });
                return;
            }
            $log.error("ERROR : Poll answer failed - status : " + status + " | Data : " + JSON.stringify($scope.poll));
            $log.error($scope.poll);
            if(status == 403){
                $popupService.showErrorMessage("Permission denied");
                return;
            }
            $popupService.showErrorMessage("ERROR : Poll answer failed - status : " + status);
        });

    }

    // select answer
    $scope.answerOnClick = function(uid) {
        //TODO : check hasMultiAnswer 
        for (var key in $scope.poll.questions[0].answers) {
            if (uid == $scope.poll.questions[0].answers[key].uid) {
                $scope.poll.questions[0].answers[key]['selected'] = true;
                continue;
            }
            $scope.poll.questions[0].answers[key]['selected'] = false;
        }
    }

    // init

    //$scope.getSharedPolls(false);

}
