/*
* Card view directive
* 
*/
angular.module('starter.directives')
    .directive('cardview', function() {
        return {
            restrict: 'EA',
            transclude: true,
            replace: true,

            scope: {
                closingdate: '@',
                question: '@'

            },
            template: '<div class="{{pollcard_color}}">' +
                '<div class="indicating-layer {{indicator_color}}"></div>' +
                '<div class="poll-name"> <p>{{question}} </p></div>' +
                '<div class="poll-detail" ng-transclude></div>' +
                '</div> ',
            controller: ['$scope', '$dateService', function($scope, $dateService) {
                var timeDiff;
                
                // setup card function
                // scope.setCard(closingDate, question);
                $scope.setCard = function(closingdate, question) {
                    closingdate = closingdate;
                    timeDiff = $dateService.getDateDiffrence(closingdate);

                    // change the left indicator color
                    // timeDiff < 2  = closed poll , shows in red color
                    // 15 < timeDiff < 2  = about to expire , shows in orange
                    // timeDiff < 15  = open poll
                    if (timeDiff < 2) {
                        $scope.indicator_color = "red";
                    } else if (2 <= timeDiff && timeDiff < 15) {
                        $scope.indicator_color = "orange";
                    } else {
                        $scope.indicator_color = "green";
                    }

                }


            }],
            link: function(scope, iElement, iAttrs, ctrl) {
                //  initialize the card
                // scope.setCard(closingDate, question);
                scope.setCard(iAttrs.closingdate, iAttrs.question);
            }
        }

    })
