angular.module('swift.services')
    .factory('$loadingService', loadingService);


loadingService.$inject = ['$rootScope', '$state','$ionicLoading'];

function loadingService($rootScope, $state,$ionicLoading) {

    /*
     * show loading 
     * usage: $loadingService.show();
     */
    var show = function() {
        $ionicLoading.show({
            template: '<ion-spinner icon="bubbles"></ion-spinner>'
        });
    };

     /*
     * hide loading 
     * usage: $loadingService.hide();
     */
    var hide = function() {
        $ionicLoading.hide();
    };

    
    return {
        show: show,
        hide: hide
    }


}
