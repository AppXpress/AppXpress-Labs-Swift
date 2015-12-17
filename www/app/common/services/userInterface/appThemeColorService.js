/**
 *  controlAppThemeColor Service
 *  @author: Sumali Jayasinghe
 *  Service to control the application theme 
 */

angular.module('swift.services')
    .factory('$controlAppThemeColor', controlAppThemeColor);


controlAppThemeColor.$inject = ['$rootScope', '$state'];

function controlAppThemeColor($rootScope, $state) {

    $rootScope.header_color; // header color
    $rootScope.menubar_color; // toolbar color
    $rootScope.tabbar_color;

    var stateObj = {
        toState: "",
        toParams: "",
        fromState: "",
        fromParams: ""
    }


    /*
     * control page colors and the floating button 
     * callback(event, toState, toParams, fromState, fromParams);
     */

    var callback = function(event, toState, toParams, fromState, fromParams) {
        console.log(toState);
        changePageHeaderToolbarColor(toState.name);

        //store the state detail - stateObj
        stateObj = {
            toState: toState,
            toParams: toParams,
            fromState: fromState,
            fromParams: fromParams
        }


    }

    /*
     * control the page  
     * 
     */

    // watch the state change
    $rootScope.$on('$stateChangeSuccess', callback);



    /*
     * get current state detail  
     * usage: $controlAppThemeColor.getStateDetail()
     */
    var getStateDetail = function() {
        return stateObj;

    }


    /*
     * Control the page Header Color
     * function - change the header color of pages depends on the previous state and current state
     * changePageHeaderToolbarColor(state)
     */
    function changePageHeaderToolbarColor(state) {
        console.log(state);
        switch (state) {
            case "tab.mypolls":
                $rootScope.header_color = "swift-project-blue-bg";
                $rootScope.menubar_color = "swift-project-blue-bg";
                $rootScope.tabbar_color = "swift-project-blue-bg";
                $rootScope.breadcrumb_color = "swift-project-light-blue-bg";
                $rootScope.breadcrumb_btn_color = "swift-project-amber-bg";


                break;
                // Home page
                // from created polls tab
            case "tab.myresponses":
                $rootScope.header_color = "swift-project-dark-teal-bg";
                $rootScope.menubar_color = "swift-project-dark-teal-bg";
                $rootScope.tabbar_color = "swift-project-dark-teal-bg";
                $rootScope.breadcrumb_color = "swift-project-light-teal-bg";
                $rootScope.breadcrumb_btn_color = "swift-project-amber-bg";

                break;

        }
        console.log($rootScope.breadcrumb_btn_color);

    }

    /*
     * Control the page Toolbar Color
     * function - change the toolbar color of pages depends on the previous state and current state
     * hangePageToolbarColor(state)
     */

    function changePageToolbarColor(state) {
        switch (state) {
            case "home.answered":
                $rootScope.toolbar_color = "green-light-bg";
                break;
                // Home page
                // from created polls tab
            case "home.mypolls":
                $rootScope.toolbar_color = "blue-light-bg";
                break;
                // Home page 
                // from missed polls tab
            case "home.missed":
                $rootScope.toolbar_color = "orange-light-bg";
                break;
                // Home page 
                // from pending polls tab
            case "home.pending":
                $rootScope.toolbar_color = "amber-light-bg";
                break;
            default:
                $rootScope.toolbar_color = "teal-light-bg";
                break;
        }

    }




    return {
        getStateDetail: getStateDetail
    }

}
