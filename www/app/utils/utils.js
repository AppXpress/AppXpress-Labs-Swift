/**
 *  Utils 
 *  @author: Saliya Ruwan
 *  For reusable functions 
 */
angular.module('swift.services')
    .factory('$utils', ['$swiftConfig', function ($swiftConfig) {

        function formatDate(date) {
            var d = new Date(date),
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();

            if (month.length < 2) month = '0' + month;
            if (day.length < 2) day = '0' + day;

            return [year, month, day].join('-');
        }


        // format chart data for my polls
        function formatChartData(polls, answers) {
            var assocArray = [];
            for (var key in answers['result']) {
                var item = answers['result'][key];

                if (!assocArray[item.pollUid]) {
                    assocArray[item.pollUid] = [];
                }

                if (item.response) {
                    if (!assocArray[item.pollUid][item.response[0].txtValue]) {
                        assocArray[item.pollUid][item.response[0].txtValue] = 1;
                    } else {
                        assocArray[item.pollUid][item.response[0].txtValue] += 1;
                    }
                }
            }

            for (var key in polls['result']) {
                polls.result[key]['chart'] = (assocArray[polls.result[key].uid]) ? assocArray[polls.result[key].uid] : [];
            }

            return polls;
        }

        return {
            formatDate: formatDate,
            formatChartData: formatChartData
        };

}]);