/**
 *  OQL Service
 *  @author: saliya ruwan
 *  Generate OQL string for given object 
 */
angular.module('swift.services')
    .factory('$oqlService', ['$swiftConfig', function ($http, $swiftConfig) {

        function generateOql(obj) {

            var oql;
            // filter [{ field, value, operator}]
            // sort [{field, order}] order=[asc, desc]
            var obj = {
                filter: [],
                sort: [],
                other: ''
            };
            
            if (obj.filter.length){
                for(key in obj.filter){
                    console.log(key);
                }
            }
            
            if (obj.sort.length){
                for(key in obj.sort){
                    console.log(key);
                }
            }
            
            if(obj.other){
                
            }

        }


        return {
            generateOql: generateOql
        };

}]);