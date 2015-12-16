/* 
 * New Poll create page Bread crumb directive
 */

angular.module('swift.directives')
    .directive('newpollbreadcrumb', function() {
        return {
            restrict: 'EA',

            scope: {
                editpoll: '@'
            },
            template: '<div>' +
                'Step &nbsp;' +
                '<a id="step-one" class="btn-floating btn-small waves-effect lime-bg" ng-click="goToQuestionerSection()">' +
                '<i class="">1</i></a>' +
                '&nbsp; of &nbsp;' +
                '<a id ="step-two" class="btn-floating btn-small waves-effect disabled lime-bg" ng-click="goToOraganizationSection()">' +
                '<i class="">2</i></a></div>',

            controller: ['$rootScope', '$scope', '$state', '$controlBreadcrumb', '$newpollBreadcrumb', function($rootScope, $scope, $state, $controlBreadcrumb, $newpollBreadcrumb) {

                var pageWidth, breadcrumbItemWidth, slider_content, contentId, slidercontainerId, sliderId;

                // set the breadcrumb responsive
                // $scope.initialize(element, canEditPoll);
                $scope.initialize = function(element, editpoll) {
                    // assign element ids
                    contentId = "#newpolls-content";
                    slidercontainerId = "#slider-container";
                    sliderId = "#slider-content";

                    // assign attributes
                    $scope.editpoll = editpoll;
                    $scope.element = element;

                    // set the breadcrumb body responsive
                    // $controlBreadcrumb.initialize(element, contentId, sliderContainerId, slideId)
                    $controlBreadcrumb.initialize(element, contentId, slidercontainerId, sliderId);

                }

                //go to questioner section
                //slide the pages depends on the breadcrumb
                // $scope.activeAnswerStatisticGraph()
                $scope.goToQuestionerSection = function() {
                    $newpollBreadcrumb.activeQuestionForm(sliderId);
                }

                //go to organaization section
                //slide the pages depends on the breadcrumb
                // $scope.activeOrgStatisticGraph()
                $scope.goToOraganizationSection = function() {
                    if ($scope.editpoll == 'true') {
                        $newpollBreadcrumb.activeOrganizationForm(sliderId);
                    }
                }

                /* NOT IN USE */

                // Listen for orientation changes
                window.addEventListener("orientationchange", function() {
                    // Announce the new orientation number
                    //alert(window.orientation);
                }, false);


            }],
            link: function(scope, iElement, iAttrs, ctrl) {
                // initialize the bread crumb and its content
                scope.initialize(iElement, scope.editpoll);
            }
        }

    })
