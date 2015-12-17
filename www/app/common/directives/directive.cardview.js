/**
 *  Card View Directive
 *  @author: Sumali Jayasinghe
 *  
 */
angular.module('swift.directives')
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


        var linker = function(scope, element, attrs) {

            var today = new Date(),
                endDate = new Date(scope.poll.endDate),
                difference;

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
            link: linker
        }
    })
