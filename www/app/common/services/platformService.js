/**
 *  Platform Service
 *  @author: Saliya Ruwan
 *  Service to handle platform specific data request and CRUD operations
 */
angular.module('swift.services')
    .factory('$platformService', ['$httpService', '$localStorageService', '$ionicLoading', '$swiftConfig', function ($httpService, $localStorageService, $ionicLoading, $swiftConfig) {

        /**
         * get object by UID
         * usage: $platformService.findByUid(<objectName>,<uid>);
         */
        function findByUid(obj, uid) {
            var uri = obj + '/' + uid + '?dataKey=' + $swiftConfig.dataKey;
            var authToken = $localStorageService.get('authorization');

            return $httpService.get(authToken, uri);
        }

        /**
         * get list of objects
         * usage: $platformService.all(<objectName>,<oql>, <listLimit>, <listOffset>);
         */
        function getList(obj, oql, limit, offset) {
            var uri = obj + '?dataKey=' + $swiftConfig.dataKey;

            uri += (oql) ? "&oql=" + oql : '';
            uri += (limit) ? "&limit=" + limit : '';
            uri += (offset) ? "&offset=" + offset : '';

            var authorization = $localStorageService.get('authorization');
            return $httpService.get(authorization, uri);
        }

        /**
         * create object 
         * usage: $platformService.create(<objectName>,<data>);
         */
        function createObj(obj, data) {
            var uri = obj + '?dataKey=' + $swiftConfig.dataKey;
            var authToken = $localStorageService.get('authorization');

            return $httpService.post(authToken, uri, data);
        }

        /**
         * update object 
         * usage: $platformService.update(<objectName>,<data>);
         */
        function updateObj(obj, data) {
            var uri = obj + '/' + data.uid + '?dataKey=' + $swiftConfig.dataKey;
            var authToken = $localStorageService.get('authorization');

            return $httpService.post(authToken, uri, data, data.fingerprint);
        }

        /**
         * get Party list
         * usage: $platformService.getPartyList();
         */
        function getPartyList() {
            var uri = 'Party/list?dataKey=' + $swiftConfig.dataKey;
            var authToken = $localStorageService.get('authorization');
            return $httpService.get(authToken, uri);
        }

        return {
            all: getList,
            create: createObj,
            update: updateObj,
            findByUid: findByUid,
            getPartyList: getPartyList
        }

}]);