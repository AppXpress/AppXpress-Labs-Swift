angular.module('swift.home')
    .controller('statisticsDetailController', statisticsDetailController);


statisticsDetailController.$inject = ['$rootScope', '$scope', '$stateParams', '$poll', '$state', '$ionicLoading', '$cordovaEmailComposer', 'base64'];

function statisticsDetailController($rootScope, $scope, $stateParams, $poll, $state, $ionicLoading, $cordovaEmailComposer, base64) {

    // draw graph each time enters to the page
    $scope.$on('$ionicView.afterEnter', function(viewInfo) {
        console.log($stateParams);
        $scope.answerObj = $stateParams.answer;
        $scope.stat = [];
        for (key in $scope.answerObj) {
            if ($scope.answerObj[key] && $scope.answerObj[key].participants) {
                for (item in $scope.answerObj[key].participants) {
                    $scope.answerObj[key].participants[item].answer = ($scope.answerObj[key] && $scope.answerObj[key].txtValue) ? $scope.answerObj[key].txtValue : "null";
                    $scope.stat.push($scope.answerObj[key].participants[item]);

                }

            }
        }
        console.log($scope.stat);
        if ($stateParams.answer && $stateParams.answer.participants) {
            $scope.participants = $stateParams.answer.participants;
        } else {
            $scope.participants = [];
        }
        console.log($scope.stat);
        JSONToCSVConvertor($scope.stat, "Swift Statistics Report", true);

    });

   

    $scope.addRandomRow = function() {
        $scope.getArray.push({
            a: Math.floor((Math.random() * 10) + 1),
            b: Math.floor((Math.random() * 10) + 1)
        });
    };

    // $scope.getHeader = function() {
    //     return ["UID", "USERNAME", "ORGID", "ANSWER"]
    // };
    $scope.sendFeedback = function() {
        cordova.plugins.email.open({
            to: '',
            cc: '',
            bcc: '',
            subject: 'Date export ', //+ $scope.Date.date,
            body: '',
            attachments: $scope.uri
        });
    }

    function JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel) {
        //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
        var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;

        var CSV = '';
        //Set Report title in first row or line

        CSV += ReportTitle + '\r\n\n';

        //This condition will generate the Label/Header
        if (ShowLabel) {
            var row = "";
            var header = ["UID", "USERNAME", "ORGID", "ANSWER"];

            //This loop will extract the label from 1st index of on array
            for (var index in header) {

                //Now convert each value to string and comma-seprated
                row += index + ',';
            }

            row = row.slice(0, -1);

            //append Label row with line break
            CSV += row + '\r\n';
        }

        //1st loop is to extract each row
        for (var i = 0; i < arrData.length; i++) {
            var row = "";

            //2nd loop will extract each column and convert it in string comma-seprated
            for (var index in arrData[i]) {
                row += '"' + arrData[i][index] + '",';
            }

            row.slice(0, row.length - 1);

            //add a line break after each row
            CSV += row + '\r\n';
        }

        if (CSV == '') {
            alert("Invalid data");
            return;
        }

        //Generate a file name
        var fileName = "MyReport_";
        //this will remove the blank-spaces from the title and replace it with an underscore
        fileName += ReportTitle.replace(/ /g, "_");

        //Initialize file format you want csv or xls
        //  $scope.uri = 'data:text/csv;charset=utf-8;base64,' + Base64EncodeUrl(CSV);

        $scope.uri = 'base64:report.csv//' + base64.encode(CSV);

        // Now the little tricky part.
        // you can use either>> window.open(uri);
        // but this will not work in some browsers
        // or you will not get the correct file extension    

        //this trick will generate a temp <a /> tag
        // var link = document.createElement("a");
        // link.href = uri;

        // //set the visibility hidden so it will not effect on your web-layout
        // link.style = "visibility:hidden";
        // link.download = fileName + ".csv";

        // //this part will append the anchor tag and remove it after automatic click
        // document.body.appendChild(link);
        // link.click();
        // document.body.removeChild(link);
    }
}
