/**
 * Poll Service
 * 
 * @author: Saliya Ruwan 
 * @description : Service to request required poll data and handle data
 */
angular.module('swift.services').factory(
    '$poll', ['$platformService', '$swiftConfig', '$localStorageService', '$utils', '$answer', '$log',
		function ($platformService, $swiftConfig, $localStorageService, $utils, $answer, $log) {
            // default poll data for poll create
            var pollDefaultData = {
                "type": $swiftConfig.customObjects.POLL,
                "identity": new Date(),
                "hasMultiAnswers": "no",
                "creatorUsername": "",
                "creatorOrgId": "",
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
                "status": "inactive",
                "startDate": "",
                "endDate": "",
                "questions": [],
                "participantOrgIds": []
            };

            /**
             * Get poll by UID 
             * usage: $poll.getPollByUid(<uid>, function(status, data){});
             */
            function getPollByUid(uid, callback) {
                var request = $platformService.findByUid($swiftConfig.customObjects.POLL, uid);
                request.success(function (data, status) {
                    if (status == 200) {
                        callback(true, data);
                    } else {
                        $log.error("ERROR : Get poll data by uid failed - status : " + status);
                        callback(false, data);
                    }

                }).error(function (data, status) {
                    $log.error("ERROR : Get poll data by uid request failed - status : " + status);
                    callback(status, data);
                    return;
                });
            }


            /**
             * Get all polls which are created by current user or assigned to current user 
             * usage: $poll.all(function(status, data){});
             */
            function getAllUserPolls(callback) {
                var username = $localStorageService.get('username');
                if (!username) {
                    callback(false, 'Invalid Username');
                    return;
                }
                var oql = "status in ('active', 'inactive') and creatorUsername='" + username + "' order by startDate desc";
                var request = $platformService.all($swiftConfig.customObjects.POLL, oql);
                request.success(function (data, status) {
                    if (status == 200) {
                        callback(true, data);
                    } else {
                        $log.error("ERROR : Get All poll data failed - status : " + status);
                        //TODO : get request status definition and show in error message 
                        callback(status, data);
                    }

                }).error(function (data, status) {
                    $log.error("ERROR : Get All poll data request failed - status : " + status);
                    callback(status, data);
                    return;
                });
            }


            /**
             * Get all polls which are assigned to current user 
             * usage: $poll.all(function(status, data){});
             */
            function getUserAssignedPolls(callback) {
                var username = $localStorageService.get('username');
                var orgId = $localStorageService.getObject('user').organizationUid;
                if (!username) {
                    callback(false, 'Invalid Username');
                    return;
                }
                var oql = "status ='active' and participantOrgIds.txtValue='" + orgId + "' order by startDate desc";
                var request = $platformService.all($swiftConfig.customObjects.POLL, oql);
                request.success(function (data, status) {
                    if (status == 200) {
                        callback(true, data);
                    } else {
                        $log.error("ERROR : Get All poll data failed - status : " + status);
                        //TODO : get request status definition and show in error message 
                        callback(status, data);
                    }

                }).error(function (data, status) {
                    $log.error("ERROR : Get All poll data request failed - status : " + status);
                    callback(status, data);
                    return;
                });
            }



            /**
             * Get all poll data 
             * usage: $poll.all(function(status, data){});
             */
            function all(callback) {
                var oql = 'status="active" order by startDate desc';
                var request = $platformService.all($swiftConfig.customObjects.POLL, oql);
                request.success(function (data, status) {
                    if (status == 200) {
                        callback(true, data);
                    } else {
                        $log.error("ERROR : Get All poll data failed - status : " + status);
                        //TODO : get request status definition and show in error message 
                        callback(status, data);
                    }

                }).error(function (data, status) {
                    $log.error("ERROR : Get All poll data request failed - status : " + status);
                    callback(status, data);
                    return;
                });
            }

            /**
             * Get Answered polls data 
             * usage: $poll.getAnsweredPolls(function(status, data){});
             */
            function getAnsweredPolls(callback) {

                var username = $localStorageService.get('username');
                var orgId = $localStorageService.getObject('user').organizationUid;
                if (!username) {
                    callback(false, 'Invalid Username');
                    return;
                }
                var oql = "status='active' and participantOrgIds.txtValue='" + orgId + "' order by startDate desc";
                //TODO : confirm the logic and remove oql
                //                var oql = "status='active' and creatorUsername!='" + username + "' and participantOrgIds.txtValue='" + orgId + "'";
                var request = $platformService.all($swiftConfig.customObjects.POLL, oql);
                request.success(function (data, status, headers) {
                    if (status == 200) {
                        if (!data['result']) {
                            data['result'] = [];
                            callback(status, data);
                            return;
                        }

                        var uids = [];
                        for (var key in data.result) {
                            uids.push(data.result[key].uid);
                        }
                        $answer.allByUids(uids, function (answerStatus, answerData) {
                            var assocArray = [];
                            for (var key in answerData['result']) {
                                assocArray[answerData['result'][key]['pollUid']] = answerData['result'][key]['response'];
                            }


                            var filterData = data['result'].filter(function (el) {
                                if (assocArray[el.uid]) {
                                    el['questions'][0]['response'] = assocArray[el.uid];
                                }
                                return (assocArray[el.uid]) ? true : false;
                            });
                            data['result'] = filterData;
                            // TODO : update resultInfo
                            callback(true, data);
                        });
                    } else {
                        $log.error("ERROR : Get Answered polls - All poll data failed - status : " + status);
                        callback(false, data);
                    }

                }).error(function (data, status) {
                    $log.error("ERROR : Get Answered polls - All poll data request failed - status : " + status);
                    callback(status, data);
                    return;
                });
            }


            /**
             * Get Shared polls data 
             * usage: $poll.getSharedPolls(function(status, data){});
             */
            function getSharedPolls(callback) {

                var username = $localStorageService.get('username');
                var orgId = $localStorageService.getObject('user').organizationUid;
                if (!username) {
                    callback(false, 'Invalid Username');
                    return;
                }

                var oql = "status='active' and endDate>@(TODAY) and participantOrgIds.txtValue='" + orgId + "' order by startDate desc";
                var request = $platformService.all($swiftConfig.customObjects.POLL, oql);
                request.success(function (data, status, headers) {
                    if (status == 200) {
                        if (!data['result']) {
                            data['result'] = [];
                            callback(status, data);
                            return;
                        }
                        var uids = [];
                        for (var key in data.result) {
                            uids.push(data.result[key].uid);
                        }
                        $answer.allByUids(uids, function (answerStatus, answerData) {
                            var assocArray = [];
                            for (var key in answerData['result']) {
                                assocArray[answerData['result'][key]['pollUid']] = answerData['result'][key]['response'];
                            }

                            var filterData = data['result'].filter(function (el) {
                                return (assocArray[el.uid]) ? false : true;
                            });
                            data['result'] = filterData;
                            // TODO : update resultInfo
                            callback(true, data);
                        });
                    } else {
                        $log.error("ERROR : Get Answered polls - All poll data failed - status : " + status);
                        callback(false, data);
                    }

                }).error(function (data, status) {
                    $log.error("ERROR : Get Answered polls - All poll data request failed - status : " + status);
                    callback(status, data);
                    return;
                });
            }


            /**
             * Get curernt user created polls data 
             * usage: $poll.getUserCreatedPolls(function(status, data){});
             */
            function getUserCreatedPolls(callback) {

                var username = $localStorageService.get('username');
                if (!username) {
                    callback(false, 'Invalid Username');
                    return;
                }
                var oql = 'status="active" and creatorUsername="' + username + '" order by startDate desc';
                var request = $platformService.all($swiftConfig.customObjects.POLL, oql);
                request.success(function (data, status, headers) {
                    if (status == 200) {
                        callback(true, data);
                    } else {
                        $log.error("ERROR : Get user created polls failed - status : " + status);
                        callback(status, data);
                    }

                }).error(function (data, status) {
                    $log.error("ERROR : Get user created polls request failed - status : " + status);
                    callback(status, data);
                    return;
                });
            }

            /**
             * Get curernt user missed polls data 
             * usage: $poll.getUserMissedPolls(function(status, data){});
             */
            function getUserMissedPolls(callback) {
                var username = $localStorageService.get('username');
                var orgId = $localStorageService.getObject('user').organizationUid;

                if (!username) {
                    callback(false, 'Invalid Username ');
                    return;
                }

                //TODO : confirm the logic and remove oql
                //var oql = "status='active' and endDate<@(TODAY) and creatorUsername!='" + username + "' and participantOrgIds.txtValue='" + orgId + "'";

                var oql = "status='active' and endDate<@(TODAY) and participantOrgIds.txtValue='" + orgId + "' order by startDate desc";
                var request = $platformService.all($swiftConfig.customObjects.POLL, oql);
                request.success(function (data, status, headers) {
                    if (status == 200) {
                        if (!data['result']) {
                            data['result'] = [];
                            callback(status, data);
                            return;
                        }

                        var uids = [];
                        for (var key in data.result) {
                            uids.push(data.result[key].uid);
                        }
                        $answer.allByUids(uids, function (answerStatus, answerData) {

                            if (!answerData['result']) {
                                callback(status, data);
                                return;
                            }

                            var assocArray = [];
                            for (var key in answerData['result']) {
                                assocArray[answerData['result'][key]['pollUid']] = answerData['result'][key]['questionUid'];
                            }

                            var filterData = data['result'].filter(function (el) {
                                return (assocArray[el.uid]) ? false : true;
                            });
                            data['result'] = filterData;
                            // TODO : update resultInfo
                            callback(true, data);
                            return;
                        });
                    } else {
                        $log.error("ERROR : Get user missed polls failed - status : " + status);
                        callback(false, data);
                    }

                }).error(function (data, status) {
                    $log.error("ERROR : Get user missed polls request failed - status : " + status);
                    callback(status, data);
                    return;
                });
            }

            /**
             * Get curernt user pending polls data 
             * usage: $poll.getUserMissedPolls(function(status, data){});
             */
            function getUserPendingPolls(callback) {
                var username = $localStorageService.get('username');
                if (!username) {
                    callback(false, 'Invalid Username ');
                    return;
                }
                var oql = 'creatorUsername="' + username + '" and status="inactive" order by startDate desc';
                var request = $platformService.all($swiftConfig.customObjects.POLL, oql);
                request.success(function (data, status, headers) {
                    if (status == 200) {
                        callback(status, data);
                    } else {
                        $log.error("ERROR : Get user pending polls failed - status : " + status);
                        callback(status, data);
                    }

                }).error(function (data, status) {
                    $log.error("ERROR : Get user pending polls request failed - status : " + status);
                    callback(status, data);
                    return;
                });
            }

            /**
             * Create a new poll
             * 
             * @param data =
             *         {questions : [{answers:[]}], } (TODO : complete sample array ) usage:
             *         $poll.createPoll(<data>, function(status, data){});
             */
            function createPoll(data, callback) {

                var user = $localStorageService.getObject('user');
                pollDefaultData.creatorUsername = user.uid;
                pollDefaultData.creatorOrgId = user.organizationUid;
                pollDefaultData.questions = data.questions;
                pollDefaultData.startDate = $utils.formatDate(new Date());
                pollDefaultData.endDate = $utils.formatDate(data.endDate);
                pollDefaultData.status = (data.status) ? data.status : 'inactive';
                pollDefaultData.participantOrgIds = (data.participantOrgIds) ? data.participantOrgIds : [];

                var request = $platformService.create($swiftConfig.customObjects.POLL, pollDefaultData, callback);
                request.success(function (data, status, headers) {
                    if (status == 201) { // 201 status created
                        callback(status, data);
                        return;
                    }
                    $log.error("ERROR : Create poll failed - status : " + status);
                    $log.warn(pollDefaultData);
                    callback(status, data);
                    return;
                }).error(function (errorData, status) {
                    $log.error("ERROR : Create poll request failed - status : " + status);
                    $log.warn(pollDefaultData);
                    callback(status, errorData);
                    return;
                });
            }

            function updatePoll(data, callback) {
                var request = $platformService.update($swiftConfig.customObjects.POLL, data, callback);
                request.success(function (data, status, headers) {
                    if (status == 202) { // 202 status update
                        callback(status, data);
                        return;
                    }
                    $log.error("ERROR : Update poll failed - status : " + status);
                    $log.warn(data);
                    callback(status, data);
                    return;
                }).error(function (errorData, status) {
                    $log.error("ERROR : Update poll request failed - status : " + status);
                    $log.warn(data);
                    callback(status, errorData);
                    return;
                });
            }
            return {
                all: all,
                getAllUserPolls: getAllUserPolls,
                getUserAssignedPolls: getUserAssignedPolls,
                getSharedPolls: getSharedPolls,
                getAnsweredPolls: getAnsweredPolls,
                getUserCreatedPolls: getUserCreatedPolls,
                getUserMissedPolls: getUserMissedPolls,
                getUserPendingPolls: getUserPendingPolls,
                getPollByUid: getPollByUid,
                updatePoll: updatePoll,
                createPoll: createPoll
            };

		}]);