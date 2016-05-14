(function() {

  angular.module('meanApp', ['ngRoute']);

  // Configure routes
  function config($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'home/home.view.html',
        controller: 'homeCtrl',
        controllerAs: 'vm',
      })
      .when('/register', {
        templateUrl: '/auth/register/register.view.html',
        controller: 'registerCtrl',
        controllerAs: 'vm',
      })
      .when('/login', {
        templateUrl: '/auth/login/login.view.html',
        controller: 'loginCtrl',
        controllerAs: 'vm',
      })
      .when('/admin', {
        templateUrl: '/profile/profile.view.html',
        controller: 'profileCtrl',
        controllerAs: 'vm',
      })
      .otherwise({redirectTo: '/'});

    // use the HTML5 History API
    $locationProvider.html5Mode(true);
  }


  // Run application
  function run($rootScope, $location, authentication) {
    $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {

      // Check if "admin" is at the beginning of the URL
      var this_path = $location.path().substring(1,6);

      // Show / Hide admin navbar
      if(this_path=="admin") {
        $rootScope.headTag = '/admin/admin.head.html';
        $rootScope.isAdmin = true;
      } else {
        $rootScope.headTag = '/layout/head.html';
        $rootScope.isAdmin = false;
      }

      console.lo

      // If route is admin and user is not logged in, redirect to homepage
      if (this_path=="admin" && !authentication.isLoggedIn()) {
        $location.path('/');
      }
    });
  }
  
  // Load app
  angular
    .module('meanApp')
    .config(['$routeProvider', '$locationProvider', config])
    .run(['$rootScope', '$location', 'authentication', run]);

})();