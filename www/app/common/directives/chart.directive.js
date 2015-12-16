angular.module('starter.directives')
    .directive('piechart', function() {
        return {
            restrict: 'EA',

            scope: {
                id: '@',
                data: "@",
                height: "@",
                backgroundcolor: "@",
                answer: '@'

            },
            template: ' <div id="container{{containerId}}" style="height:{{height}}; "></div>' +
                ' <div id="no_data{{containerId}}" class="no_data" style="display:none"><p class="closed_poll_color_text">No Statistics</p></div>',

            controller: ['$scope', '$plotStaisticsService', function($scope, $plotStaisticsService) {

                $scope.plottChart = function(background_color, id, data, height, answer) {
                    $scope.containerId = id;
                    $scope.height = height;

                    $scope.$watch('containerId', function(oldValue, newValue) {
                        
                        if (data) {
                            $scope.chartdata = JSON.parse(data);

                            angular.element('#container' + id).css('display', 'block');
                            angular.element('#no_data' + id).css('display', 'none');

                            $plotStaisticsService.draftPieChart(id, $scope.chartdata, background_color, answer);

                        }

                    });

                }

            }],
            link: function(scope, iElement, iAttrs, ctrl) {
                scope.plottChart(iAttrs.backgroundcolor, iAttrs.id, iAttrs.data, iAttrs.height, iAttrs.answer);
            }
        }

    })
