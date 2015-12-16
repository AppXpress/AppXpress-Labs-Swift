/*
 * Login controller
 * controlls the all the actions in login page
 */

angular.module('swift.login').controller('loginController', loginController);

loginController.$inject = ['$rootScope', '$scope', '$state', '$authentication', '$swiftConfig','$popupService'];

function loginController($rootScope, $scope, $state, $authentication, $swiftConfig, $popupService) {
  // console.log();

    //TODO : remove testing data 
    //    $scope.user = {
    //        username: "swiftUser",
    //        password: "newUser098"
    //    }

    $scope.user = {
        username: "saliyaappxpressapi",
        password: "TestingApp4765"
    }

    // $scope.user = {
    //     username: "sumali",
    //     password: "sumali123"
    // }
    //  $scope.user = {
    //     username: "",
    //     password: ""
    // }

    // User Login Fuction
    $scope.login = function() {
        // $authentication.authenticate(username, password, callback);
        $authentication.authenticate($scope.user.username, $scope.user.password, function(status, data) {
            if (status) {
                // directs to home mypolls tab
                $state.go('tab.mypolls', data);
                $rootScope.username = $scope.user.username;
                console.log(document.getElementById('username'));
                document.getElementById('username').innerHTML = $rootScope.username;
                return;
            }
            $popupService.showErrorMessage(data);
        });
    }

}
