/**
 *  Answer Service
 *  Answer data handling
 */
angular.module('swift.services')
    .factory('$answer', ['$http', '$swiftConfig', '$platformService', '$utils', '$localStorageService', '$log', function ($http, $swiftConfig, $platformService, $utils, $localStorageService, $log) {

        //TODO : set value to identity field
        var answerDefaultData = {
            "type": $swiftConfig.customObjects.ANSWER,
            "identity": new Date(),
            "pollUid": "", // set on create
            "questionUid": "", // set on create
            "status": "active",
            "answerStatus": "active",
            "submittedBy": "", // set on create
            "submittedDate": "", // set on create
            "owner": {
                "partyRoleCode": "Buyer",
                "address": {
                    "countryCode": "LK",
                    "addressLine2": "5th lane",
                    "addressLine1": "no 231",
                    "city": "colombo"
                },
                "name": "Swift Buyer",
                "memberId": "3717989018024871",
                "contact": {}
            },
            "participant": {
                "memberId": ''
            },
            "response": [] //set on create
        };

        function allByUids(uids, callback) {
            var username = $localStorageService.get('username');
            if (!username) {
                callback(false, 'Invalid Username ');
                return;
            }

            var oql = "pollUid in(" + uids.toString() + ") and answerStatus='active' and submittedBy ='" + username + "'";
            var request = $platformService.all($swiftConfig.customObjects.ANSWER, oql);
            request.success(function (data, status, headers) {
                if (status == 200) {
                    callback(true, data);
                    return;
                }

                callback(false, data);
            }).error(function (data, status) {
                callback(false, data);
                return;
            })
        }

        function getAnswersForPolls(pollUids, callback) {
            var username = $localStorageService.get('username');
            if (!username) {
                callback(false, 'Invalid Username ');
                return;
            }
            var pollUidsList = "";
            if (pollUids != null && pollUids != 'undefined') {
                if (angular.isArray(pollUids)) {

                    for (var i = 0; i < pollUids.length; i++) {
                        pollUidsList = pollUids[i];
                        if (i != (pollUids.length - 1)) {
                            pollUidsList = pollUidsList + ",";
                        }
                    }
                }
            } else {
                $log.error("pollUids argument is invalid");
                callback(false, "Invalid pollUids argument");
            }


            var oql = $swiftConfig.oql.ANSWERED_PROVIDED_BY_ME_FOR_POLLS_ASSGINGED_TO_ME.replace("1@@", username).replace("2@@", pollUidsList);
            var request = $platformService.all($swiftConfig.customObjects.ANSWER, oql);
            request.success(function (data, status, headers) {
                if (status == 200) {
                    callback(status, data);
                    return;
                }

                callback(status, data);
            }).error(function (data, status) {
                callback(status, data);
                return;
            })
        }

        function getUserAnswered(callback) {
            var username = $localStorageService.get('username');
            if (!username) {
                callback(false, 'Invalid Username ');
                return;
            }
            var oql = "answerStatus='active' and submittedBy ='" + username + "'";
            var request = $platformService.all($swiftConfig.customObjects.ANSWER, oql);
            request.success(function (data, status, headers) {
                if (status == 200) {
                    callback(status, data);
                    return;
                }

                callback(status, data);
            }).error(function (data, status) {
                callback(status, data);
                return;
            })
        }

        //TODO : optimization required for large data set (filters and limit)
        function getAllAnswers(callback) {
            var username = $localStorageService.get('username');
            if (!username) {
                $log.error("ERROR : Invalid Username in LS ");
                callback(false, 'Invalid Username ');
                return;
            }
            var oql = "answerStatus='active'";
            var request = $platformService.all($swiftConfig.customObjects.ANSWER, oql);
            request.success(function (data, status, headers) {
                if (status == 200) {
                    callback(status, data);
                    return;
                }
                $log.error("ERROR : Get All Answer list failed - status : " + status);
                callback(status, data);
            }).error(function (data, status) {
                $log.error("ERROR : Get All Answer list request failed - status : " + status);
                $log.error(data);
                callback(status, data);
            })
        }

        function createAnswer(data, callback) {

            var username = $localStorageService.get('username');
            if (!username) {
                $log.error("ERROR : Invalid Username in LS ");
                callback(false, 'Invalid Username ');
                return;
            }

            answerDefaultData.pollUid = data.uid;
            answerDefaultData.questionUid = data.questions[0].uid;
            answerDefaultData.submittedBy = username;
            answerDefaultData.submittedDate = $utils.formatDate(new Date());
            answerDefaultData.participant.memberId = $localStorageService.getObject('user').organizationUid;
            answerDefaultData.response =[];
            for (var key in data.questions[0].answers) {
                if (data.questions[0].answers[key].selected) {
                    answerDefaultData.response.push({
                        answerUid: data.questions[0].answers[key].uid,
                        txtValue: data.questions[0].answers[key].txtValue
                    });
                }
            }

            var request = $platformService.create($swiftConfig.customObjects.ANSWER, answerDefaultData, callback);
            request.success(function (data, status, headers) {
                if (status == 201) { // 201 status created
                    callback(status, data);
                    return;
                }
                $log.error("ERROR : Answer Create failed - status : " + status);
                callback(status, data);
                return;
            }).error(function (data, status) {
                $log.error("ERROR : Answer Create request failed - status : " + status);
                $log.error(data);
                callback(status, data);
                return;
            })
        }


        return {
            allByUids: allByUids,
            getUserAnswered: getUserAnswered,
            getAnswersForPolls: getAnswersForPolls,
            getUserAnswered: getUserAnswered,
            getAllAnswers: getAllAnswers,
            createAnswer: createAnswer
        };

}]);
