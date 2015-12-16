/*
  Author: NThusitha
  Date: 19-Oct-2015

 Watch cabability using a singleton object.
 Any object that needs to watch for a particular property
 need to register key value pair.
 
 Then any notify party need to access the same key-value pair and
 perform the update action.

*/

angular.module('swift.services')
  .factory('LazyObserver', LazyObserver);


LazyObserver.$inject = ['$rootScope'];

function LazyObserver($rootScope) {

	var keyValueMap = new Array();

	/*
	 * Use for insert/update
	 * put key-value
	 * */
	function put_(key, value){
		var existingValue = get_(key);
		//remove if exists
		if(existingValue != null && existingValue != 'undefined'){
			purge_(key);
		}
		
		this.keyValueMap.push({k : key, v : value});
	}
	
	/*
	 * 
	 * get value given by key
	 * */
	function get_(key){
		for(var i = 0; i < keyValueMap.length; i++){
			if(keyValueMap[i].k == key){
				return keyValueMap[i].v;
			}
		}
	}
	
	function purge_(key){
		for(var i = 0; i < keyValueMap.length; i++){
			if(keyValueMap[i].k == key){
				return keyValueMap.slice(i, 1);
			}
		}
	}
  return {
	  
	  put : put_,
	  get : get_,
	  purge : purge_
  }

}
