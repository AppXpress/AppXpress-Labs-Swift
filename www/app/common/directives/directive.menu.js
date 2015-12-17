/**
 *  Menu Directive
 *  @author: Sumali Jayasinghe
 *  
 */
angular.module('swift.directives')
    .directive('menu', function($compile, $http, $templateCache) {
        return {
            restrict: 'E',
            scope: {
                menulist: '=',
                side: '@',
                direct: '&',
                logout: '&'

            },
            templateUrl: 'app/components/menu/menu.html'
        }
    })
