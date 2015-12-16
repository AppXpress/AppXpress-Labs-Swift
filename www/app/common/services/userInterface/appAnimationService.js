angular.module('swift.services')
    .factory('$controlAppAnimation', controlAppAnimation);


controlAppAnimation.$inject = ['$rootScope', '$state', '$controlAppThemeColor'];

function controlAppAnimation($rootScope, $state, $controlAppThemeColor) {

    // animate the page toolbar once page is active
    $rootScope.$on('$ionicView.afterEnter', function(viewInfo) {

        var statedetail = $controlAppThemeColor.getStateDetail();

        addToolbaAnimation(statedetail.toState.name);

        // removeToolbaAnimation(statedetail.fromState.name);


    });


    /*
     * Control the page Toolbar Animation
     * function - add the toolbar animation of pages depends on the current state
     * addToolbaAnimation(state)
     */
    var addToolbaAnimation = function(state) {
        var isAndroid = ionic.Platform.isAndroid();
        switch (state) {

            // create poll page
            case "newpolls":
                if (!isAndroid) {
                    $rootScope.slide_class_newpolls = 'slide-toolbar';

                } else {
                    $rootScope.slide_class_newpolls = 'slide-toolbar-android';

                }

                $rootScope.slide_class_content_newpolls = 'slide-page-content';

                // animateToolbar('.header-toolbar-newpolls', '.newpolls-content');
                //animateToolbar('header-toolbar-statistics', 'statistics-content');
                break;

                // shared poll page
            case "sharedpolls":
                if (!isAndroid) {
                    $rootScope.slide_class_sharedpolls = 'slide-toolbar';

                } else {
                    $rootScope.slide_class_sharedpolls = 'slide-toolbar-android';

                }
                $rootScope.slide_class_content_sharedpolls = 'slide-page-content-sharedpoll';
                // animateToolbar('.header-toolbar-sharedpolls', '.sharedpolls-content');
                break;

                // My poll statistic page 
            case "statistics":
                if (!isAndroid) {
                    $rootScope.slide_class_statistics = 'slide-toolbar';

                } else {
                    $rootScope.slide_class_statistics = 'slide-toolbar-android';

                }
                $rootScope.slide_class_content_statistics = 'slide-page-content';
                // animateToolbar('.header-toolbar-statistics', '.statistics-content');

                break;


                // user list for each answer
            case "userdetail":
            if (!isAndroid) {
                    $rootScope.slide_class_userdetail = 'slide-toolbar';

                } else {
                    $rootScope.slide_class_userdetail = 'slide-toolbar-android';

                }
                $rootScope.slide_class_content_userdetail = 'slide-page-content';
                // animateToolbar('.header-toolbar-userdetail', '.userdetail-content');

                break;

                // settings
            case "settings":
                if (!isAndroid) {
                    $rootScope.slide_class_settings = 'slide-toolbar';

                } else {
                    $rootScope.slide_class_settings = 'slide-toolbar-android';

                }
                $rootScope.slide_class_content_settings = 'slide-page-content-sharedpoll';
                // animateToolbar('.header-toolbar-settings', '.settings-content');

                break;

        }
    }

    /*
     * Control the page Toolbar Animation
     * function - remove the toolbar animation of pages depends on the previous state
     * removeToolbaAnimation(state)
     */

    var removeToolbaAnimation = function(state) {
        switch (state) {

            // create poll page
            case "newpolls":
                // removeAnimation('.header-toolbar-newpolls', '.newpolls-content');
                $rootScope.slide_class_newpolls = 'remove-animation';
                $rootScope.slide_class_content_newpolls = 'remove-animation';

                break;

                // shared poll page
            case "sharedpolls":
                // removeAnimation('.header-toolbar-sharedpolls', '.sharedpolls-content');
                $rootScope.slide_class_sharedpolls = 'remove-animation';
                $rootScope.slide_class_content_sharedpolls = 'remove-animation';
                break;

                // My poll statistic page 
            case "statistics":
                $rootScope.slide_class_statistics = 'slide-toolbar';
                $rootScope.slide_class_content_statistics = 'remove-animation';

                break;

                // user list for each answer
            case "userdetail":
                $rootScope.slide_class_userdetail = 'remove-animation';
                $rootScope.slide_class_content_userdetail = 'remove-animation';

                break;

                // settings
            case "settings":
                $rootScope.slide_class_settings = 'remove-animation';
                $rootScope.slide_class_content_settings = 'remove-animation';
                // removeAnimation('.header-toolbar-settings', '.settings-content');

                break;

        }
    }


    /*
     * add Toolbar Animation
     * function - add the toolbar animation 
     * animateToolbar(toolbarId, contentId)
     */

    // var animateToolbar = function(toolbarId, contentId) {
    //     var toolbar = document.getElementById(toolbarId);
    //     console.log(toolbar);

    //     var toolbar_height = toolbar.offsetHeight;

    //     var pagecontent = document.getElementById(contentId);
    //     var headerbar_height = angular.element('ion-header-bar').height();

    //     move(toolbar).delay('0.3s').ease('in').y(headerbar_height).end();

    //     move(pagecontent).delay('0.3s').ease('in').y(toolbar_height).end();
    // }

    /*
     * remove Toolbar Animation
     * function - remove the toolbar animation 
     * removeAnimation(toolbarId, contentId)
     */
    // var removeAnimation = function(toolbarId, contentId) {
    //     var toolbar = document.getElementById(toolbarId),
    //         toolbar_height = toolbar.offsetHeight,
    //         pagecontent = document.getElementById(contentId);

    //     move(toolbar).delay('0.3s').ease('in').y('0').end();

    //     move(pagecontent).delay('0.3s').ease('in').y('0').end();
    // }

    /*
     * add Toolbar Animation
     * function - add the toolbar animation 
     * animateToolbar(toolbarId, contentId)
     */

    var animateToolbar = function(toolbarId, contentId) {

        // var toolbar = angular.element(toolbarId),
        //     toolbar_height = 100,
        //     pagecontent = angular.element(contentId),
        //     headerbar_height = angular.element('ion-header-bar').height();

        // toolbar.css("transform", "translateY(" + headerbar_height + "px)");
        // pagecontent.css("transform", "translateY(" + toolbar_height + "px)");

        // move(toolbar).delay('0.3s').ease('in').y(headerbar_height).end();

        // move(pagecontent).delay('0.3s').ease('in').y(toolbar_height).end();
    }

    /*
     * remove Toolbar Animation
     * function - remove the toolbar animation 
     * removeAnimation(toolbarId, contentId)
     */
    var removeAnimation = function(toolbarId, contentId) {
        var toolbar = angular.element(toolbarId),
            pagecontent = angular.element(contentId);

        // toolbar.css("transform", "translateY(0)");
        // pagecontent.css("transform", "translateY(0)");
    }



    return {

    }

}
