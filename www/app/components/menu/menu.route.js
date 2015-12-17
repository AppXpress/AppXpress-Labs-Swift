  angular.module('swift.menu')
      .config(menuConfigurations);
  menuConfigurations.$inject = ['$stateProvider'];

  function menuConfigurations($stateProvider) {
      // state home tab view
      // setup an abstract state for the tabs directive
      $stateProvider
      .state('settings', {
              url: "/settings",
              templateUrl: "app/components/menu/settings.html"
          })
          .state('disclaimer', {
              url: "/disclaimer",
              templateUrl: "app/components/menu/disclaimer.html"
          })
          .state('help', {
              url: "/help",
              templateUrl: "app/components/menu/help.html"
          })
          .state('feedback', {
              url: "/feedback",
              templateUrl: "app/components/menu/feedback.html"
          })
          .state('thankyou', {
              url: "/thankyou",
              templateUrl: "app/components/menu/thankyou.html"
          })

  }
