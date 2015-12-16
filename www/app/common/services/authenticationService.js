/**
 * Authentication Service
 * 
 * @author: Saliya Ruwan Service to handle user authentication with AppXpress REST API (Login and
 *          Logout)
 */
angular.module('swift.services').factory('$authentication', authentication);

authentication.$inject = ['$httpService', '$localStorageService', '$window', '$log', '$swiftConfig',
	'$platformService', '$pollStore', '$ionicLoading'];

function authentication($httpService, $localStorageService, $window, $log, $swiftConfig, $platformService, $pollStore, $ionicLoading) {

    /**
     * user authentication usage: $authentication.authenticate(<username>,<password>,function(status,
     * data){});
     */
    function getAuthentication(username, password, callback) {
        var separator = String.fromCharCode(0x1F);
        var authorization = "Basic " + $window.btoa(username + separator + password);

        var uri = 'User/self?dataKey=' + $swiftConfig.dataKey;

        $ionicLoading.show({
            template: '<ion-spinner icon="bubbles"></ion-spinner><p style="background-color: black; padding:5px; border-radius:5px"> Authenticating </p>'
        });
        var request = $httpService.get(authorization, uri);
        request.success(function (data, status, headers) {
            if (status == 200) {
                $localStorageService.set('authorization', authorization);
                $localStorageService.set('username', username);
                $localStorageService.setObject('user', data);

                $ionicLoading.show({
                    template: '<ion-spinner icon="bubbles"></ion-spinner><p style="background-color: black; padding:5px; border-radius:5px"> Loading </p>'
                });

                $pollStore.updateUserCreatedPolls(function (status, msg) {
                    $log.info("Initial assigned poll data load : " + status + " | " + msg);
                    $pollStore.updateAssignedPollData(function (status, msg) {
                        $log.info("Initial user created data load : " + status + " | " + msg);
                        $ionicLoading.hide();
                        callback(true, data);
                    });
                    //callback(true, data);
                });


                //TODO : to be tested - user creation 
                //				if (data != null && data != 'undefined' && data.hasOwnProperty("__metadata")) {
                //					delete data["__metadata"];
                //					$localStorageService.setObject('user', data);
                //				}
                //
                //				var userOrgId = data.organizationUid;
                //				getUserCustomObject(authorization, username, userOrgId, function(status, userData) {
                //					if (status) {
                //						callback(true, data);
                //					}
                //				});
                //                callback(true, data);
                return;
            }
            $ionicLoading.hide();
            callback(false, "Invalid username or password");
            $log.debug('status : ' + status);
        }).error(function (data, status) {
            $ionicLoading.hide();
            $log.error('ERROR Status :' + status );
            if(status==401){
                callback(false, "Invalid username or password");
                return;
            }
            callback(false, "NETWORK ERROR");
            
        })
    }

    /*
     * Check if there is an existing User custom object.
     */
    function getUserCustomObject(authToken, username, userOrgId, callback) {

        if (authToken && username && userOrgId) {
            $log.debug("checking for user custom object");
            var oql = $swiftConfig.oql.CURRENT_LOGGED_IN_USER_CO.replace("1@@", username).replace("2@@", userOrgId);
            $platformService.all($swiftConfig.customObjects.USER, oql).then(function (response) {
                var data = response.data;
                if (data.hasOwnProperty("resultInfo")) {
                    if (data.resultInfo.count > 0) {
                        if (data.hasOwnProperty("result")) {
                            updateUserWithDeviceToken(data.result[0], callback);
                            callback(true, data.result[0]);
                        }
                    } else {
                        // if there are no user objects create one.
                        createUserCustomObject(username, userOrgId, callback);
                    }
                } else {
                    $log.error("can't find resultInfo element in the respone" + "\n" + "oql is " + oql);

                    callback(false, "can't find result and resultInfo element in the respone");
                }

            }, function (error) {
                $log.error("error occured fetching user custom object" + error + "\n" + "oql is " + oql);
                callback(false, error);
            });
        }
    }

    /*
     * Create user using CO.
     */
    function createUserCustomObject(userId, userOrgId, callback) {

        var user = new Object();
        user.type = $swiftConfig.customObjects.USER;
        user.identity = userId;
        user.userId = userId;
        user.userOrgId = userOrgId;
        user.status = 'active';
        user.owner = $swiftConfig.ownerOrg;
        // TODO: Handshake device token with push service provider and update push subscriber id here.
        $platformService.create($swiftConfig.customObjects.USER, user).then(function (data) {

            if (data.create.hasOwnProperty("result")) {

                $log.debug("user created successfully" + data.create.result);
                callback(true, data.create.result);
            }
        }, function (error) {
            $log.error("error creating user object" + "\n" + JSON.stringify(user) + "\n" + error);
            callback(false, error);
        });
    }

    function updateUserWithDeviceToken(user, callback) {
        // TODO: Update user with device token.
    }

    /**
     * user logout usage: $authentication.logout();
     */
    function logout() {
        $localStorageService.clearAll();
    }

    /**
     * check user is logged in
     * 
     * @return boolean usage: var result = $authentication.isLoggedIn();
     */
    function isLoggedIn() {
        var authToken = $localStorageService.get('authorization');
        if (authToken) {
            return true;
        }
        return false;
    }

    return {
        authenticate: getAuthentication,
        logout: logout,
        isLoggedIn: isLoggedIn
    };

}