/*
* Timer directive
* 
*/
angular.module('starter.directives')
    .directive('timer', function() {
        return {
            restrict: 'EA',
            transclude: true,
            //replace: true,
            scope: {
                closingdate: '@'
            },
            template: '<div>' +
                '<div class="closed_poll {{poll_color_class_closed}}" >' +

                '<p class="closed_poll_color_text">Closed</p>' +

                '<p class="closed_poll_color_date">{{date}}</p>' +
                '</div>' +
                '<div class="open_poll {{poll_color_class_open}}" >' +
                '<p class="open_poll_color_time_{{date_color}}">Expire in {{date}}</p>' +
                // '<p class="open_poll_color_text">on</p>' +
                // '<p class="open_poll_color_text">{{closingDate}}</p>' +
                '</div>' +
                '</div>',
            controller: ['$scope', '$dateService', function($scope, $dateService) {

                // set up time detail section
                // $scope.setTimer(closingDate);
                $scope.setTimer = function(closingdate) {

                    var diffDays;

                    $scope.closingDate = closingdate;

                    moment.duration.fn.format.defaults.months = /m+/;


                    //get the date diffrence
                    //$dateService.getDateDiffrence(date);
                    diffDays = $dateService.getDateDiffrence(closingdate);
                    
                    
                    // change the card detail format
                    // if(diffDays < 1) ? closed poll : open poll
                    if (diffDays < 1) {
                        $scope.poll_color_class_closed = "show_poll";
                        $scope.poll_color_class_open = "hide_poll";

                        // show overdue days 
                        $scope.date = moment(moment(closingdate).format('YYYYMMDD'), "YYYYMMDD").fromNow();

                    } else {
                        $scope.poll_color_class_open = "show_poll";
                        $scope.poll_color_class_closed = "hide_poll";

                        // show remaining days
                        // if (diffDays < 31) ? show only days : show days and months
                        if (diffDays < 31) {
                            $scope.date = moment.duration(diffDays, "days").format("d [days]");

                        } else {
                            $scope.date = moment.duration(diffDays, "days").format("m [Month] [and] d [days]");

                        }
                    }

                    // change the font color
                    // diffDays < 2  = closed poll , shows in red color
                    // 15 < diffDays < 2  = about to expire , shows in orange
                    // diffDays > 15  = open poll, shows in green
                    if (diffDays < 2) {
                        $scope.date_color = "red";

                    } else if (2 <= diffDays && diffDays < 15) {

                        $scope.date_color = "orange";

                    } else {
                        $scope.date_color = "green";

                    }

                }
            }],
            link: function(scope, iElement, iAttrs, countryCtrl) {
                // Intialize the time detail
                // scope.setTimer(closingDate)
                scope.setTimer(iAttrs.closingdate);
            }
        }

    })
