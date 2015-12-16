angular.module('swift.services')
    .factory('$statisticBreadcrumb', statisticBreadcrumb);


statisticBreadcrumb.$inject = ['$rootScope', '$state', '$controlBreadcrumb'];

function statisticBreadcrumb($rootScope, $state, $controlBreadcrumb) {
    var graph_one, graph_one;

    graph_one = angular.element('#graph-one-answer'); //first graph in statistics on answer
    graph_two = angular.element('#graph-two-org'); // second graph in statistics in organization
    /*
     * control the breadcrumb
     * function - active to graph org level
     * activeOrgStatisticGraph(slideId)
     */

    var activeOrgStatisticGraph = function(sliderId) {
        $rootScope.graph_name = "Organization";
        graph_one.addClass('disabled');
        graph_two.removeClass('disabled');

        $controlBreadcrumb.slidingPageContent(1, sliderId);
    }

    /*
     * control the breadcrumb
     * function - active to graph user level
     * activeAnswerStatisticGraph(slideId)
     */
    var activeAnswerStatisticGraph = function(sliderId) {
        $rootScope.graph_name = "Answer";
        graph_two.addClass('disabled');
        graph_one.removeClass('disabled');

        $controlBreadcrumb.slidingPageContent(0, sliderId);
    }



    return {
        activeAnswerStatisticGraph: activeAnswerStatisticGraph,
        activeOrgStatisticGraph: activeOrgStatisticGraph
    }

}
