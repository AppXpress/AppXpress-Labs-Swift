angular.module('swift.core')
    .controller('coreController', coreController);

coreController.$inject = ['$rootScope', '$scope', '$state', '$poll', '$pollStore', '$log','$controlAppThemeColor','$popupService','$window','$ionicHistory'];

function coreController($rootScope, $scope, $state, $poll, $pollStore, $log,$controlAppThemeColor,$popupService,$window,$ionicHistory) {

    

    $rootScope.colors = ["#F44336", "#4CAF50", "#03A9F4", "#FFC107", "#FFFF00", "#536DFE", "#673AB7", "#795548", "#FF9800"];

    $scope.menulist = [ {
        name: 'Settings',
        icon: 'ion-ios-gear-outline ion-android-settings',
        goTo: 'settings'
    },{
        name: 'Help',
        icon: 'ion-help-circled ion-ios-help-outline ', //ion-information-circled ion-ios-help-outline
        goTo: 'help'
    },  {
        name: 'Terms and Conditions',
        icon: 'ion-ios-locked-outline',
        goTo: 'disclaimer'
    }, {
        name: 'Feedback',
        icon: 'ion-ios-star-outline ion-android-star-outline',
        goTo: 'feedback'
    }, {
        name: "Thank-You's",
        icon: 'ion-ios-heart-outline ion-android-favorite-outline',
        goTo: 'thankyou'
    }];

// var Floatingbutton = new Floatingbutton();

    // open menu
    $rootScope.openSideMenu = function() {
        /**
         * Slide left instantiation and action.
         */

        $rootScope.slideLeft.open();
    }

    $rootScope.closeSideMenu = function(state) {
        console.log(state);
        if(state){
            $state.go(state);
        }
        
        $rootScope.slideLeft.close();

    }

    $rootScope.logout = function() {
        $rootScope.closeSideMenu();

            $popupService.showConfirm('Are you sure want to logout?', function(res) {
                $window.localStorage.clear(); // clear loaclStorage
                $ionicHistory.clearCache(); // clear cache
                $ionicHistory.clearHistory(); // clear history
                $rootScope.assignedPollsui = [];
                $rootScope.assignedPolls =  [];
                $rootScope.createdPollsui = [];
                $rootScope.createdPolls = [];
                $state.go('login');

            }, function(res) {
                $scope.logout.checked = false;
            });
    }

}
