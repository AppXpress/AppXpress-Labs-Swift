/**
 *  poll data store Service
 *  @author: Saliya Ruwan
 *  Service to format and set created, pending, shared, answered and missed polls
 */
angular.module('swift.services')
    .factory('$pollStore', ['$poll', '$answer', '$rootScope', '$swiftConfig', function($poll, $answer, $rootScope, $swiftConfig) {


        // Update list content
        function updateContent(pollData, context) {

            if (pollData && $rootScope[context]) {
                // remove polls
                $.each($rootScope[context], function(i, item) {
                    if (item) {
                        var result = $.grep(pollData, function(e) {
                            return (e.uid == item.uid) ? true : false;
                        });

                        if (result.length <= 0) {
                            $rootScope[context].splice(i, 1);
                        }
                    }
                });

                // add or update polls
                angular.forEach(pollData, function(item, key) {
                    var index, labels = [],
                        orgs = [],
                        answercount = [],
                        values = [];

                    $.each($rootScope[context], function(i, v) {
                        if (item.uid == v.uid) {
                            index = i;
                            return true;
                        }
                    });

                    if (index >= -1) {
                        $rootScope[context][index].questions = item.questions;

                    } else {
                        $rootScope[context].unshift(item);
                    }



                    if (item.questions[0] && item.questions[0].answers) {
                        angular.forEach(item.questions[0].answers, function(answer) {
                            var label = (answer && answer.txtValue) ? answer.txtValue : "no label";
                            var value = (answer && answer.answerCount) ? answer.answerCount : "0";
                            labels.push(label);
                            values.push(value);
                        })
                    }

                    if (item.questions[0] && item.questions[0].participantstats) {
                        angular.forEach(item.questions[0].participantstats, function(participants) {
                            var label = (participants && participants.participantOrg) ? participants.participantOrg.name : "no label";
                            var value = (participants && participants.answerCount) ? participants.answerCount : "0";
                            orgs.push(label);
                            answercount.push(value);
                        })
                    }

                    pollData[key].questions[0].answerLabel = labels;
                    pollData[key].questions[0].answerCountValue = values;

                    pollData[key].questions[0].orgsLabel = orgs;
                    pollData[key].questions[0].orgsAnswerCountValue = answercount;

                    if (key == pollData.length - 1) {
                        pollData[pollData.length - 1].last = true;

                    } else {
                        pollData[key].last = false;

                    }
                });
                console.log(pollData[pollData.length - 1]);


            } else {

                angular.forEach(pollData, function(item, key) {
                    // console.log(item);
                    var labels = [],
                        orgs = [],
                        answercount = [],
                        values = [];

                    if (item.questions[0] && item.questions[0].answers) {
                        angular.forEach(item.questions[0].answers, function(answer) {
                            var label = (answer && answer.txtValue) ? answer.txtValue : "no label";
                            var value = (answer && answer.answerCount) ? answer.answerCount : "0";
                            labels.push(label);
                            values.push(value);
                        })
                    }

                    if (item.questions[0] && item.questions[0].participantstats) {
                        angular.forEach(item.questions[0].participantstats, function(participants) {
                            var label = (participants && participants.participantOrg) ? participants.participantOrg.name : "no label";
                            var value = (participants && participants.answerCount) ? participants.answerCount : "0";
                            orgs.push(label);
                            answercount.push(value);
                        })
                    }

                    pollData[key].questions[0].answerLabel = labels;
                    pollData[key].questions[0].answerCountValue = values;

                    pollData[key].questions[0].orgsLabel = orgs;
                    pollData[key].questions[0].orgsAnswerCountValue = answercount;

                    if (key == pollData.length - 1) {
                        pollData[pollData.length - 1].last = true;

                    } else {
                        pollData[key].last = false;

                    }
                });

                $rootScope[context] = pollData;
                console.log(pollData[pollData.length - 1]);

            }

        }


        //fetch poll data and assigning shared, answered and missed polls
        function updateAssignedPollData(callback) {
            $poll.getUserAssignedPolls(function(status, data) {
                if (!status || !data.result) {
                    //update all poll lists
                    $rootScope.polllist_answered = [];
                    $rootScope.polllist_missed = [];
                    $rootScope.polllist_shared = [];
                    $rootScope.assignedPolls = [];
                    $rootScope.answersList = [];
                    callback(true, "no data available");
                    return;
                }
                $rootScope.assignedPolls = data.result;
                var uids = [];
                for (var key in data.result) {
                    uids.push(data.result[key].uid);
                }

                $answer.allByUids(uids, function(answerStatus, answerData) {
                    if (!answerStatus || !answerData.result) {
                        $rootScope.answersList = [];
                        setAssignedPollsData(callback);
                        return;
                    }

                    $rootScope.answersList = answerData.result;

                    setAssignedPollsData(callback);
                });

            });

        }

        //set data - shared, answered and missed polls
        function setAssignedPollsData(callback) {
            // console.log('setAssignedPollsData');
            if (!$rootScope.assignedPolls && !$rootScope.assignedPolls.length) {
                callback(true, "no data available");
                return;
            }

            if (!$rootScope.answersList) {
                $rootScope.answersList = [];
            }

            var answers = [];
            
            for (var key in $rootScope.answersList) {
                answers[$rootScope.answersList[key].pollUid] = $rootScope.answersList[key];
            }

            var today = new Date();

            // assign status to assignedpolls array
            for (var key in $rootScope.assignedPolls) {
                // var today = new Date();
                var expireDate = new Date($rootScope.assignedPolls[key].endDate);
                var expireLimit = new Date(expireDate.setDate(expireDate.getDate() + $swiftConfig.missedPollLimit));

                // console.log('=======CHECK ANSWER=========');
                // console.log($rootScope.assignedPolls[key].uid);
                // console.log(answers[$rootScope.assignedPolls[key].uid]);
                // console.log($rootScope.assignedPolls[key]);

                if ((new Date($rootScope.assignedPolls[key].endDate) >= today.getTime()) && !answers[$rootScope.assignedPolls[key].uid]) {
                    $rootScope.assignedPolls[key]['viewStatus'] = 'shared';
                    continue;
                }

                if (answers[$rootScope.assignedPolls[key].uid]) {
                    $rootScope.assignedPolls[key]['questions'][0]['response'] = answers[$rootScope.assignedPolls[key].uid]['response'];
                    $rootScope.assignedPolls[key]['viewStatus'] = 'answered';
                    continue;
                }
                
                if ((expireDate <= today.getTime()) && !answers[$rootScope.assignedPolls[key].uid]) {
                    $rootScope.assignedPolls[key]['viewStatus'] = 'missed';
                    continue;
                }
                
                if(!$rootScope.assignedPolls[key]['viewStatus']){
                    $rootScope.assignedPolls[key]['viewStatus'] = "deleted";
                }
            }
            
            $rootScope.assignedPollsui =$rootScope.assignedPolls;
//            var shared = $rootScope.assignedPolls.filter(function(el) {
//                return ((new Date(el.endDate) >= today.getTime()) && !answers[el.uid]) ? true : false;
//            });
//
//            var missed = $rootScope.assignedPolls.filter(function(el) {
//                var today = new Date();
//                var expireDate = new Date(el.endDate);
//                var expireLimit = new Date(expireDate.setDate(expireDate.getDate() + $swiftConfig.missedPollLimit));
//                return ((expireDate < today.getTime()) && (today.getTime() < expireLimit) && !answers[el.uid]) ? true : false;
//            });
//
//            var answered = $rootScope.assignedPolls.filter(function(el) {
//                if (answers[el.uid]) {
//                    el['questions'][0]['response'] = answers[el.uid]['response'];
//                    return true;
//                }
//                return false;
//            });


             //updateContent(shared, 'assignedPolls');
            // updateContent(missed, 'polllist_missed');
            // updateContent(answered, 'polllist_answered');
//            console.log($rootScope.assignedPolls);
            callback(true, "updated successfully");
        }

        //fetch poll data and assigning created and pending poll data
        function updateUserCreatedPolls(callback) {
            $poll.getAllUserPolls(function(status, data) {
                if (!status || !data.result) {
                    //update all poll lists
                    $rootScope.polllist_mypolls = [];
                    $rootScope.polllist_drafts = [];
                    $rootScope.assignedPolls = [];
                    $rootScope.answersList = [];
                    
                    callback(true, "no data available");

                    
                    return;
                }

                $rootScope.createdPolls = data.result;

                for (var key in $rootScope.createdPolls) {
                    if ($rootScope.createdPolls[key].status == 'active') {
                        $rootScope.createdPolls[key]['viewStatus'] = 'active';
                        var labels = [],
                            orgs = [],
                            answercount = [],
                            values = [],
                            answerDatalist = {
                                data: []
                            },
                            orgDatalist = {
                                data: []
                            },
                            totalNumofAnswers = 0;


                        if ($rootScope.createdPolls[key].questions[0] && $rootScope.createdPolls[key].questions[0].answers) {
                            angular.forEach($rootScope.createdPolls[key].questions[0].answers, function(answer) {
                                var label = (answer && answer.txtValue) ? answer.txtValue : "no label";
                                var value = (answer && answer.answerCount) ? parseInt(answer.answerCount) : 0;
                                //console.log(value);
                                var answerData = {
                                    x: '',
                                    y: []
                                };
                                answerData.x = (answer && answer.txtValue) ? answer.txtValue : "no label";
                                answerData.y.push(value);
                                answerDatalist.data.push(answerData);
                                labels.push(label);
                                values.push(value);
                                totalNumofAnswers+=value;

                            })
                        }

                        if ($rootScope.createdPolls[key].questions[0] && $rootScope.createdPolls[key].questions[0].participantstats) {
                            angular.forEach($rootScope.createdPolls[key].questions[0].participantstats, function(participants) {
                                var label = (participants && participants.participantOrg) ? participants.participantOrg.name : "no label";
                                var value = (participants && participants.answerCount) ? participants.answerCount : "0";
                                
                                var orgData = {
                                    x: '',
                                    y: []
                                };
                                orgData.x = (participants && participants.participantOrg) ? participants.participantOrg.name : "no label";
                                orgData.y.push(value);
                                orgDatalist.data.push(orgData);
                                orgs.push(label);
                                answercount.push(value);
                            })
                        }

                        $rootScope.createdPolls[key].questions[0].answerLabel = labels;
                        $rootScope.createdPolls[key].questions[0].answerCountValue = values;
                        $rootScope.createdPolls[key].questions[0].answerDataList = answerDatalist;
                        $rootScope.createdPolls[key].questions[0].totalNumofAnswers =totalNumofAnswers;


                        $rootScope.createdPolls[key].questions[0].orgsLabel = orgs;
                        $rootScope.createdPolls[key].questions[0].orgsAnswerCountValue = answercount;
                        $rootScope.createdPolls[key].questions[0].orgDataList = orgDatalist;

                        // console.log($rootScope.createdPolls[key]);

                        // if (key == pollData.length - 1) {
                        //     pollData[pollData.length - 1].last = true;

                        // } else {
                        //     $rootScope.createdPolls[key].last = false;

                        // }
                    };
                    if ($rootScope.createdPolls[key].status == 'inactive') {
                        $rootScope.createdPolls[key]['viewStatus'] = 'inactive';
                    };

                }

                $rootScope.createdPollsui =$rootScope.createdPolls;

//                var myPolls = $rootScope.createdPolls.filter(function(el) {
//                    return (el.status == 'active') ? true : false;
//                });
//
//                var drafts = $rootScope.createdPolls.filter(function(el) {
//                    return (el.status == 'inactive') ? true : false;
//                });

                // updateContent(myPolls, 'polllist_mypolls');
                // updateContent(drafts, 'polllist_drafts');

                callback(true, "updated successfully");
            });
        }

        return {
            updateAssignedPollData: updateAssignedPollData,
            updateUserCreatedPolls: updateUserCreatedPolls
        };

    }]);
