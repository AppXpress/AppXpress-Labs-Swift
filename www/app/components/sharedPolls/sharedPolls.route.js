angular.module('starter.sharedpolls')
.config(sharedPollsConfiguration);

sharedPollsConfiguration.$inject = ['$stateProvider' ];

function sharedPollsConfiguration($stateProvider){
	$stateProvider
	.state('sharedpolls',{
		url : "/sharedpolls",
		views : {
			'swiftContainer' : {
				templateUrl : "app/components/sharedPolls/sharedPolls.html",
				controller : 'sharedPollsController'

			}
		}

	})
	// .state('answerPoll',{
	// 	url : "/answerPoll",
	// 	views : {
	// 		'swiftContainer' : {
	// 			templateUrl : "app/components/sharedPolls/sharedPollsAnswer.html"
	// 			controller : 'sharedPollsController'

	// 		}
	// 	}

	// })


}