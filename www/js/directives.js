angular.module('swift.directives', [])
    .directive('menu', function($compile, $http, $templateCache) {

        // var linker = function(scope, element, attrs) {
        //        scope.rootDirectory = 'images/';

        //        element.html(attrs.template_name).show();

        //        $compile(element.contents())(scope);
        //    }
        // var getTemplate = function(contentType) {
        //     var templateLoader,
        //         baseUrl = '/templates/menu/',
        //         templateMap = {
        //             left: 'menu.html',
        //             right: 'menu-left.html'
        //         };

        //     var templateUrl = baseUrl + templateMap[contentType];
        //     templateLoader = $http.get(templateUrl, {
        //         cache: $templateCache
        //     });

        //     return templateLoader;

        // }

        // var linker = function(scope, element, attrs) {

        //     var loader = getTemplate(scope.slide);

        //     var promise = loader.success(function(html) {
        //         element.html(html);
        //     }).then(function(response) {
        //         element.replaceWith($compile(element.html())(scope));
        //     });
        // }
        return {
            restrict: 'E',
            scope: {
                menulist: '=',
                side: '@',
                direct: '&',
                logout: '&'

            },
            templateUrl: 'app/components/home/menu/menu.html'
        }
    })

.directive('cardview', function($compile, $http, $templateCache) {

    var getTemplate = function(contentType) {
        console.log(contentType);
        var templateLoader,
            baseUrl = 'app/components/home/polls/',
            templateMap = {
                active: 'poll-response.html',
                inactive: 'poll.html',
                missed: 'poll-response.html',
                answered: 'poll-response.html',
                shared: 'poll-response.html'
            };

        var templateUrl = baseUrl + templateMap[contentType];
        templateLoader = $http.get(templateUrl, {
            cache: $templateCache
        });

        return templateLoader;

    }
    var controller = function() {
        $scope.timeDifference = function(laterdate, earlierdate) {

            var difference = laterdate.getTime() - earlierdate.getTime();

            var daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24);
            difference -= daysDifference * 1000 * 60 * 60 * 24

            var hoursDifference = Math.floor(difference / 1000 / 60 / 60);
            difference -= hoursDifference * 1000 * 60 * 60

            var minutesDifference = Math.floor(difference / 1000 / 60);
            difference -= minutesDifference * 1000 * 60

            var secondsDifference = Math.floor(difference / 1000);

            console.log('difference = ' + yearsDifference + 'years/s' + daysDifference + ' day/s ' + hoursDifference + ' hour/s ' + minutesDifference + ' minute/s ' + secondsDifference + ' second/s ');


        }
    }

    var linker = function(scope, element, attrs) {
        
        var today = new Date();
        var endDate = new Date(scope.poll.endDate);
        var difference;

        if (today.getTime() < endDate.getTime()) {
            difference = endDate.getTime() - today.getTime();
            var days = Math.floor(difference / 1000 / 60 / 60 / 24);
            scope.daysDifference = days + " day/s";
            scope.previous = false;

        } else {
            difference = today.getTime() - endDate.getTime();
            var days = Math.floor(difference / 1000 / 60 / 60 / 24);
            if (days == 0) {
                scope.daysDifference = "Today";
                scope.previous = true;
            } else {
                scope.daysDifference = days + " day/s ago";
                scope.previous = true;

            }

        }



        console.log(endDate);
        console.log(scope.daysDifference);

        var loader = getTemplate(scope.poll.viewStatus);
        var promise = loader.success(function(html) {
            element.html(html);
        }).then(function(response) {
            element.replaceWith($compile(element.html())(scope));
        });
    }
    return {
        restrict: 'E',
        scope: {
            poll: '=',
            direct: '&'
        },
        //templateUrl: 'app/components/home/polls/poll.html',
        link: linker
    }
    // }
})

.directive('textarea', function() {
    return {
        restrict: 'E',
        link: function(scope, element, attr) {
            var update = function() {
                element.css("height", "auto");
                var height = element[0].scrollHeight;
                element.css("height", element[0].scrollHeight + "px");
            };
            scope.$watch(attr.ngModel, function() {
                update();
            });
        }
    };
});
