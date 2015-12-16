angular.module('swift.home')
    .config(homeConfigurations);
homeConfigurations.$inject = ['$stateProvider'];

function homeConfigurations($stateProvider) {
    // state home tab view
    // setup an abstract state for the tabs directive
    $stateProvider
        .state('tab', {
            url: '/tab',
            abstract: true,
            templateUrl: 'app/components/home/tabs.html'
        })

    // Each tab has its own nav history stack:

    .state('tab.mypolls', {
        url: '/mypolls',
        views: {
            'tab-mypolls': {
                templateUrl: 'app/components/home/tab-mypolls.html',
                controller: 'mypollController'

            }
        }
    })

    .state('tab.myresponses', {
            url: '/myresponses',
            views: {
                'tab-myresponses': {
                    templateUrl: 'app/components/home/tab-myresponses.html',
                    controller: 'myresponseConroller'
                }
            }
        })
        .state('tab.chat-detail', {
            url: '/myresponses/:chatId',
            views: {
                'tab-myresponses': {
                    templateUrl: 'app/components/home/chat-detail.html'
                }
            }
        })
        //  poll statistics state

    .state('statistics', {
        url: "/statistics",
        params: {
            passedPoll: null
        },
        cash: false,
        templateUrl: "app/components/home/statistics/statistics.html",
        controller: "statisticsConroller"
    })

    .state('settings', {
            url: "/settings",
            templateUrl: "app/components/home/settings.html"
        })
        .state('disclaimer', {
            url: "/disclaimer",
            templateUrl: "app/components/home/disclaimer.html"
        })
        .state('help', {
            url: "/help",
            templateUrl: "app/components/home/help.html"
        })
        .state('feedback', {
            url: "/feedback",
            templateUrl: "app/components/home/feedback.html"
        })
        .state('thankyou', {
            url: "/thankyou",
            templateUrl: "app/components/home/thankyou.html"
        })
        .state('detail', {
            url: "/detail",
            params: {
                answer: null
            },
            cash: false,
            templateUrl: "app/components/home/statistics/answerDetail.html",
            controller: "statisticsDetailController"
        })


    // })

    // //  user detail state

    // .state('userdetail', {
    //     url: "/home/mypolls/statistics/userdetail",
    //     views: {
    //         'swiftContainer': {
    //             templateUrl: "app/components/home/answeredUserDetail.html",
    //             controller: 'answerdUserDetailController'
    //         }
    //     }


    // })


}
