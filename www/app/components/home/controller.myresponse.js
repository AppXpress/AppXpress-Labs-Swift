angular.module('swift.home')
    .controller('myresponseConroller', myresponseConroller);


myresponseConroller.$inject = ['$rootScope', '$scope', '$stateParams', '$poll', '$state', '$ionicLoading', '$ionicModal', '$pollStore', '$loadingService', '$log', '$pollStore', '$answer', '$popupService'];

function myresponseConroller($rootScope, $scope, $stateParams, $poll, $state, $ionicLoading, $ionicModal, $pollStore, $loadingService, $log, $pollStore, $answer, $popupService) {

    $rootScope.slideLeft = new Menu({
        wrapper: '#o-wrapper',
        type: 'slide-left',
        menuOpenerClass: '.swift-button',
        maskId: '#swift-mask'
    });

    // model window initilization 
    $ionicModal.fromTemplateUrl('app/components/core/answeredModel.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal_answered = modal
    })

    // open model window
    $scope.openAnsweredModal = function(poll) {
        $scope.modal_answered.show();
        console.log(poll);
        $scope.poll = poll;

    }

    // close model window
    $scope.closeAnsweredModal = function() {
        $scope.modal_answered.hide();
    };

    // distroy model window
    $scope.$on('$destroy', function() {
        $scope.modal_answered.remove();
    });

    $ionicModal.fromTemplateUrl('app/components/core/sharedpollModel.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        console.log(modal);
        $scope.sharedpollmodal = modal;
    })

    // open modal
    $scope.openSharedpollModal = function(poll) {
        console.log(poll);
        $scope.sharedpollmodal.show();
        $scope.poll = poll;

    }

    // close modal
    $scope.closeSharedpollModal = function() {
        $scope.sharedpollmodal.hide();
    };

    // distroy the modal 
    $scope.$on('$destroy', function() {
        $scope.sharedpollmodal.remove();
    });

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

        console.log($scope.poll);

        console.log('create poll answer');

        $ionicLoading.show();
        $answer.createAnswer($scope.poll, function(status, data) {
            console.log('status : ' + status);
            console.log(data);
            //  $ionicLoading.hide();
            // return;
            if (status == 201) {
                // $scope.closeSharedpollModal();
                // $pollStore.updateAssignedPollData(function(status, data) {
                //     $ionicLoading.hide();

                // });
                // $pollStore.updateUserCreatedPolls(function(status, data) {
                //     $ionicLoading.hide();

                // });

                //$rootScope.updateMypolls = true;

                $pollStore.updateAssignedPollData(function(status, data) {
                    $rootScope.updateUserCreatedPolls = true;
                    $ionicLoading.hide();

                });

                $popupService.showAlert('successfully Answered', function(res) {
                    $scope.closeSharedpollModal();

                    // $pollStore.updateAssignedPollData();
                    // $pollStore.updateUserCreatedPolls();
                    // for(var key in $rootScope.assignedPolls){
                    //     if($rootScope.assignedPolls[key].uid == $scope.poll.uid){
                    //         $rootScope.assignedPolls[key]['answered']=true;
                    //         continue;
                    //     }
                    //     $rootScope.assignedPolls[key]['answered']=false;
                    // }
                    // $state.go('home.answered');
                });
                //$ionicLoading.hide();
                return;
            }
            $ionicLoading.hide();
            $log.error("ERROR : Poll answer failed - status : " + status + " | Data : " + JSON.stringify($scope.poll));
            $log.error($scope.poll);
            if (status == 403) {
                $popupService.showErrorMessage("Permission denied");
                return;
            }
            $popupService.showErrorMessage("ERROR : Poll answer failed - status : " + status);
        });

    }

    $scope.doRefresh = function() {
        $pollStore.updateAssignedPollData(function(status, data) {
            $scope.$broadcast('scroll.refreshComplete');
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
}
