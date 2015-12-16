angular.module('swift.newpolls')
    .config(sharedPollsConfiguration);

sharedPollsConfiguration.$inject = ['$stateProvider'];

function sharedPollsConfiguration($stateProvider) {
    $stateProvider
        .state('newpolls', {
            url: "/newpolls",
            params:{
                pollUid:null
            },
            cash:false,
            templateUrl: "app/components/newPolls/newPolls.html",
            controller: 'newPollsController'
        })
        .state('newpollOrganization', {
            url: "/newpollOrganization",
            views: {
                'swiftContainer': {
                    templateUrl: "app/components/newPolls/newPollsOrganization.html",
                    controller: 'newPollsController'

                }
            }

        })

}
