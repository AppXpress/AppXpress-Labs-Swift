/*
  Author: NThusitha
  Date: 19-Oct-2015

  Watch capabilty on $rootScope level. Use it with care.
  Large watched object will cause performance issues.

  If you don't require the watch capability make sure to call removeWatch()
  on the registered target;

*/

angular.module('swift.services')
  .factory('WatchTower', WatchTower);


WatchTower.$inject = ['$rootScope'];

function WatchTower($rootScope) {

  var $rs_ = $rootScope;
  $rs_.registry = new Array();
  function add(key, value, event) {
    if (key != null && key != 'undefined' && value != null && value != 'undefined' && event != null && event != 'undefined') {

      if (typeof key === 'string' && typeof value === 'object') {
        $rs_.key = value;
        var destroyerFn = $rs_.$watch(key, event);
        $rs_.registry.push({index: key, destroyer : destroyerFn, value_ : value});
      }

    }
  }

  /*
    Perform ng apply. Target is the fn that need to execute.
    Once the target is executed $digest() on $rootScope will be called.
  */
  function applyToRootScope(target){
    if(target != null && target != 'undefind'){
          $rs_.$apply(target);
    }
  }

  /*
    Seek key-value pair.
    Use this with care.
  */
  function seek(key){
      if(key != null && key != 'undefined'){
        for(var i = 0; i < $rs_.registry.length(); i++ ){
            if($rs_.registry[i].index == 'key'){
                return $rs_.registry.splice(i, 1);
            }
        }
      }
  }

  function destroy(mutant){
    if(mutant != null && mutant != 'undefind'){
      mutant.destroyer();
      delete $rs_.mutant.key;
    }
  }
  
  function find(key){
	  for(var i = 0; i < $rs_.registry.length; i++){
		  if($rs_.registry[i].key == key){
			  return 
		  }
	  }
  }


  return {

    addToWatch: add,
    get : find
    notifyAll : applyToRootScope,
    removeWatch : function(key){
        destroy(seek(key));
    }
  }

}
