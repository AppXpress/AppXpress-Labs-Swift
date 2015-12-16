angular.module('starter.settings')
.config(settingsConfiguration);

settingsConfiguration.$inject = ['$stateProvider' ];

function settingsConfiguration($stateProvider){
	$stateProvider
	.state('settings',{
		url : "/settings",
		views : {
			'swiftContainer' : {
				templateUrl : "app/components/settings/settings.html",
				controller : 'settingsController'

			}
		}

	})
	

}