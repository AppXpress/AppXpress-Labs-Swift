/*
 * Login router
 * controlls the all the state routings in login section
 */

angular.module('swift.login').config(loginConfiguration);

loginConfiguration.$inject = ['$stateProvider'];

function loginConfiguration($stateProvider) {

    // login state
    $stateProvider
        .state('login', {
            url: "/login",
            templateUrl: "app/common/components/login/login.html",
            controller: 'loginController'
        })
}
