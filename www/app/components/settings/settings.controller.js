/**
 * Settings controller 
 * Handle settings
 */

angular.module('starter.settings')
    .controller('settingsController', settingsController);


settingsController.$inject = ['$rootScope', '$scope', '$state', '$stateParams', '$ionicLoading', '$poll', '$popupService', '$ionicHistory', '$window'];


function settingsController($rootScope, $scope, $state, $stateParams, $ionicLoading, $poll, $popupService, $ionicHistory, $window) {

    // logout the user
    // logout() 
    $scope.logout = function() {
        if ($scope.logout.checked) {

            $popupService.showConfirm('Are you sure want to logout?', function(res) {
                $window.localStorage.clear(); // clear loaclStorage
                $ionicHistory.clearCache(); // clear cache
                $ionicHistory.clearHistory(); // clear history
                $rootScope.polllist_mypolls = null;
                $rootScope.polllist_drafts = null;
                $rootScope.assignedPolls = null;
                $rootScope.answersList = null;
                $rootScope.polllist_missed = null;
                $state.go('login');

            }, function(res) {
                $scope.logout.checked = false;
            });


        }
    }
}
