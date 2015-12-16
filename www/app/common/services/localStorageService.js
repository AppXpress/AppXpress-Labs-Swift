/**
 *  localstorage Service
 *  @author: Saliya Ruwan
 *  Service to handle localstorage data 
 */

angular.module('swift.services')
    .factory('$localStorageService', ['$window', function ($window) {
        //TODO : LS next level - CRUD operations on saved objects
        return {
            set: function (key, value) {
                $window.localStorage[key] = value;
            },
            get: function (key, defaultValue) {
                return $window.localStorage[key] || defaultValue;
            },
            setObject: function (key, value) {
                $window.localStorage[key] = JSON.stringify(value);
            },
            getObject: function (key) {
                return JSON.parse($window.localStorage[key] || '{}');
            },
            clearObject: function (key) {
                $window.localStorage.removeItem();
            },
            clearAll: function () {
                $window.localStorage.clear();
            }
        }
    }]);