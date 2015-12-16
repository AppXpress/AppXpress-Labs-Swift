angular.module('swift.services')
    .factory('$dateService', dateService);


dateService.$inject = ['$rootScope', '$state'];

function dateService($rootScope, $state) {

    /*
     * get the diffrence between dates
     * usage: $dateService.getDateDiffrence();
     */
    var getDateDiffrence = function(date) {
        var today, selectDate, diff, diffDays;

        today = new Date();
        selectDate = new Date(date);
        diff = selectDate.getTime() - today.getTime();
        diffDays = Math.ceil(diff / (1000 * 3600 * 24));

        return diffDays;

    }


    return {
        getDateDiffrence: getDateDiffrence
    }

}
