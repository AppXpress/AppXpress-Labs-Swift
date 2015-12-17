// Ionic swift App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'swift' is the name of this angular module example (also set in a <body> attribute in
// index.html)
// the 2nd parameter is an array of 'requires'
// 'swift.services' is found in services.js
// 'swift.controllers' is found in controllers.js

// angular.module('swift', [ 'ionic', 'swift.controllers','chart.js','swift.services', 'swift.directives','pascalprecht.translate','swift.core','swift.login', 'swift.home','swift.sharedpolls','ab-base64','swift.newpolls','swift.settings'])
angular.module('swift', [ 'ionic', 'pascalprecht.translate','angularCharts',"ngSanitize", "ngCordova",'swift.directives','swift.core','swift.services','swift.login','swift.home','swift.newpolls','swift.menu'])

.run(function($ionicPlatform, $translate) {
	$ionicPlatform.ready(function() {
		// Hide the accessory bar by default (remove this to show the accessory
		// bar above the keyboard
		// for form inputs)
		if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		}
		if (window.StatusBar) {
			// org.apache.cordova.statusbar required
			StatusBar.styleLightContent();
		}
		if (typeof navigator.globalization != "undefined") {

			navigator.globalization.getLocaleName(function(locale) {

				if (typeof console != "undefined") {
					console.log('locale: ' + locale.value + '\n');
				}
				// use is async with un-known language keys
				$translate.use((locale.value).split("-")[0]).then(function(data) {
					if (typeof console != "undefined") {
						console.log("SUCCESS -> " + data);
					}

				}, function(error) {
					if (typeof console != "undefined") {
						console.log("ERROR -> " + error);
					}
					alert("Failed to set locale based on the device locale");
				});
			}, function(e) {

				if (typeof console != "undefined") {
					console.log("Error code: " + e.code + " error msg: " + e.message);
				}
				alert('Error getting language\n');

			});
		} else {
			if (typeof console != "undefined") {
				console.log("Globalization plugin is not activated");
			}
		}

	});

})

.config(function($stateProvider, $urlRouterProvider, $translateProvider, $ionicConfigProvider,$logProvider, $swiftConfig) {
	if($swiftConfig.log){
		$logProvider.debugEnabled(true);
	}else{
		$logProvider.debugEnabled(false);
	}

	$ionicConfigProvider.views.transition('none');

	// Ionic uses AngularUI Router which uses the concept of states
	// Learn more here: https://github.com/angular-ui/ui-router
	// Set up the various states which the app can be in.
	// Each state's controller can be found in controllers.js
	// $stateProvider

	// setup an abstract state for the tabs directive
	// .state('app', {
	// url : "/app",
	// abstract : true,
	// templateUrl : "app/core/swiftContainer.html",
	// controller :
	// });

	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise('/login');

	// Angular Translate
	$translateProvider.useStaticFilesLoader({
		prefix : 'js/locales/locale-',
		suffix : '.json'
	}).registerAvailableLanguageKeys([ 'en', 'de', 'fr', 'es', 'it' ], {
		'en-*' : 'en',
		'de-*' : 'de',
		'fr-*' : 'fr',
		'es-*' : 'es',
		'it-*' : 'it'
	}).preferredLanguage('en').fallbackLanguage("en").useSanitizeValueStrategy('sanitize');
	;

});
