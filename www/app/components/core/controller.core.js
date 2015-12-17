angular.module('swift.core')
    .controller('coreController', coreController);

coreController.$inject = ['$rootScope', '$scope', '$state', '$poll', '$pollStore', '$log', '$controlAppThemeColor', '$popupService', '$window', '$ionicHistory'];

function coreController($rootScope, $scope, $state, $poll, $pollStore, $log, $controlAppThemeColor, $popupService, $window, $ionicHistory) {



    $rootScope.colors = ["#F44336", "#4CAF50", "#03A9F4", "#FFC107", "#FFFF00", "#536DFE", "#673AB7", "#795548", "#FF9800"];

    $scope.menulist = [{
        name: 'Settings',
        icon: 'ion-ios-gear-outline ion-android-settings',
        goTo: 'settings',
        url: ''
    }, {
        name: 'Help',
        icon: 'ion-help-circled ion-ios-help-outline ', //ion-information-circled ion-ios-help-outline
        goTo: 'help',
        url: 'http://appxpresslabs.com/swift-help/'
    }, {
        name: 'Terms and Conditions',
        icon: 'ion-ios-locked-outline',
        goTo: 'disclaimer',
        url: ''
    }, {
        name: 'Feedback',
        icon: 'ion-ios-star-outline ion-android-star-outline',
        goTo: 'feedback',
        url: 'http://appxpresslabs.com/'
    }, {
        name: "Thank-You's",
        icon: 'ion-ios-heart-outline ion-android-favorite-outline',
        goTo: 'thankyou',
        url: ''
    }];

    // var Floatingbutton = new Floatingbutton();

    // open menu
    $rootScope.openSideMenu = function() {
        /**
         * Slide left instantiation and action.
         */

        $rootScope.slideLeft.open();
    }

    // close side menu
    $rootScope.closeSideMenu = function(state, url) {
        console.log(state);
        $rootScope.slideLeft.close();
        if (state == "settings" || state == "disclaimer" || state == "thankyou") {
            $state.go(state);
        } else {
            window.open(url, '_blank', 'location=no');
            return false;
        }



    }

    // logout 
    $rootScope.logout = function() {
        $rootScope.slideLeft.close();

        $popupService.showConfirm('Are you sure want to logout?', function(res) {
            $window.localStorage.clear(); // clear loaclStorage
            $ionicHistory.clearCache(); // clear cache
            $ionicHistory.clearHistory(); // clear history
            $rootScope.assignedPollsui = [];
            $rootScope.assignedPolls = [];
            $rootScope.createdPollsui = [];
            $rootScope.createdPolls = [];
            $state.go('login');

        }, function(res) {
            $scope.logout.checked = false;
        });
    }

}
