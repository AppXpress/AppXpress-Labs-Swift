/**
 * Questions Service questions data handling
 */
angular.module('swift.services').factory('$question', [ '$http', '$swiftConfig', function($http, $swiftConfig) {

	return {
		get : doGet,
		post : doPost
	};

} ]);