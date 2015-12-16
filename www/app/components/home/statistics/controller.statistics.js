angular.module('swift.home')
    .controller('statisticsConroller', statisticsConroller);


statisticsConroller.$inject = ['$rootScope', '$scope', '$stateParams', '$poll', '$state', '$ionicLoading'];

function statisticsConroller($rootScope, $scope, $stateParams, $poll, $state, $ionicLoading) {
    $scope.stat_layout = 'app/components/home/statistics/AnswerLevelStatistics.html';

    // draw graph each time enters to the page
    $scope.$on('$ionicView.afterEnter', function(viewInfo) {
        $scope.stat_title = "Poll Statistics - By Answer";
        $scope.question_graph_btn_color = $rootScope.breadcrumb_btn_color;
        $scope.org_graph_btn_color = 'swift-project-gray-bg';
        if ($state.params && $state.params.passedPoll) {
            for (var key in $rootScope.createdPolls) {
                if ($rootScope.createdPolls[key].uid === $state.params.passedPoll) {
                    $scope.poll = $rootScope.createdPolls[key];
                }
            }

        }

    });

    $scope.config = {
        title: '',
        tooltips: true,
        labels: false,
        mouseover: function() {},
        mouseout: function() {},
        click: function() {},
        legend: {
            display: false,
            //could be 'left, right'
            position: 'right'
        },
        colors: $rootScope.colors
    };

    $scope.goToAnswerGraph = function() {
        $scope.stat_title = "Poll Statistics - By Answer";
        $scope.stat_layout = 'app/components/home/statistics/AnswerLevelStatistics.html';
        $scope.question_graph_btn_color = $rootScope.breadcrumb_btn_color;
        $scope.org_graph_btn_color = 'swift-project-gray-bg';

    }
    $scope.goToOrganizationGraph = function() {
        $scope.stat_title = "Poll Statistics - By Organization";
        $scope.question_graph_btn_color = 'swift-project-gray-bg';
        $scope.org_graph_btn_color = $rootScope.breadcrumb_btn_color;

        $scope.stat_layout = 'app/components/home/statistics/OrganizationLevelStatistics.html';

    }

    $scope.goToAnswerDetail = function(poll, index) {
        console.log(poll);
        console.log(index);
        $state.go('detail', {
            answer: poll.questions[0].answers
        });
    }
}
