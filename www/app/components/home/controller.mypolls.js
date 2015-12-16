angular.module('swift.home')
    .controller('mypollController', mypollConroller);


mypollConroller.$inject = ['$rootScope', '$scope', '$stateParams', '$poll', '$state', '$ionicLoading', '$ionicActionSheet', '$pollStore'];

function mypollConroller($rootScope, $scope, $stateParams, $poll, $state, $ionicLoading, $ionicActionSheet, $pollStore) {

    $rootScope.slideLeft = new Menu({
        wrapper: '#o-wrapper',
        type: 'slide-left',
        menuOpenerClass: '.swift-button',
        maskId: '#swift-mask'
    });

    $scope.config = {
        title: '',
        tooltips: true,
        labels: false,
        mouseover: function() {},
        mouseout: function() {},
        click: function() {},
        legend: {
            display: false,
            //could be 'left, right'
            position: 'right'
        },
        colors: ["#F44336", "#4CAF50", "#03A9F4", "#FFC107", "#FFFF00", "#536DFE", "#673AB7", "#795548", "#FF9800"]
            // colors: ["#F44336", "#4CAF50", "#03A9F4", "#FFC107", "#FFFF00","#536DFE","#673AB7","#795548","#FF9800"]

    };
    $rootScope.test = function(state) {
        console.log(state);
    }


    // Triggered on a button click, or some other target
    $scope.showActionsheet = function(poll) {
        if (poll.questions[0].totalNumofAnswers > 0) {
            // Show the action sheet
            var hideSheet = $ionicActionSheet.show({
                buttons: [{
                    text: '<img class="swift-project-actionsheet-img" src="img/stat.png"> <div style="color: #004971;font-weight: 600;" class="swift-project-stat">Summary</div>'
                }, {
                    text: '<img class="swift-project-actionsheet-img" src="img/archive.png"><div style="color: #C25A5A;font-weight: 600;" class="swift-project-archive">Archive</div>'
                }],
                // destructiveText: '<img src="img/delete.png"><div class="delete">Delete</div>',

                // cancelText: 'Cancel',
                // cancel: function() {
                //     // add cancel code..
                // },

                buttonClicked: function(index) {
                    switch (index) {
                        case 0:
                            $state.go('statistics', {
                                passedPoll: poll.uid,
                                endDate: poll.endDate
                            });
                            return true;
                            break;
                        case 1:
                            hideSheet();
                            poll.status = "archived";
                            $ionicLoading.show();
                            $poll.updatePoll(poll, function(status, data) {

                                if (status == 202) {
                                    // for (var key in $rootScope.polllist_mypolls) {
                                    //     if ($rootScope.polllist_mypolls[key].uid == poll.uid) {
                                    //         $rootScope.polllist_mypolls[key]['archived'] = true;
                                    //         continue;
                                    //     }
                                    //     $rootScope.polllist_mypolls[key]['archived'] = false;
                                    // }
                                    //$pollStore.updateUserCreatedPolls();
                                    $pollStore.updateUserCreatedPolls(function(status, data) {
                                        $ionicLoading.hide();

                                    });
                                    
                                    return true;
                                }
                                $ionicLoading.hide();
                                $log.error("ERROR : Poll update failed - status : " + status + " | Data : " + JSON.stringify($scope.poll));
                                return true;
                            });
                            break;
                    }

                }
            });

        }


    };

    // Triggered on a button click, or some other target
    $scope.showActionsheetDrafts = function(pollitem) {

        // Show the action sheet
        var hideSheet = $ionicActionSheet.show({
            buttons: [{
                text: '<img class="swift-project-actionsheet-img" src="img/edit.png"> <div class="swift-project-stat">Edit</div>'
            }],
            destructiveText: '<img class="swift-project-actionsheet-img" src="img/delete.png"><div class="swift-project-archive">Delete</div>',

            // cancelText: 'Cancel',
            // cancel: function() {
            //     // add cancel code..
            // },
            buttonClicked: function(index) {
                console.log(pollitem);
                $state.go('newpolls', {
                    pollUid: pollitem.uid
                });
                return true;
            },
            destructiveButtonClicked: function() {
                hideSheet();
                //TODO: delete implementation
                pollitem.status = "discarded";
                $ionicLoading.show();
                $poll.updatePoll(pollitem, function(status, data) {

                    if (status == 202) {

                        $pollStore.updateUserCreatedPolls(function(status, data) {
                            $ionicLoading.hide();

                        });
                        // for(var key in /$rootScope.polllist_drafts){
                        //      if($rootScope.polllist_drafts[key].uid == pollitem.uid){
                        //          $rootScope.polllist_drafts[key]['deleted']=true;
                        //          continue;
                        //      }
                        //      $rootScope.polllist_drafts[key]['deleted']=false;
                        //  }
                        //$ionicLoading.hide();
                        return true;
                    }
                    $ionicLoading.hide();
                    $log.error("ERROR : Poll update failed - status : " + status + " | Data : " + JSON.stringify($scope.poll));
                    return true;
                });
            }
        });

        // For example's sake, hide the sheet after two seconds
        // $timeout(function() {
        //     hideSheet();
        // }, 2000);

    };

      $scope.doRefresh = function(){
        $pollStore.updateUserCreatedPolls(function(status, data){
            $scope.$broadcast('scroll.refreshComplete');
        });
        
    }
    $scope.pollStat = function(data) {
        console.log(data);

        $state.go('statistics', {
            passedPoll: data
        }, {
            reload: true
        })
    }
}
