(function () {
  'use strict';
  angular.module('app').config([
    '$stateProvider',
    '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
      $stateProvider.state('dashboard', {
        url: '/dashboard',
        templateUrl: 'app/dashboard/dashboard.html'
        //controller: 'DashboardController',
        //controllerAs: 'dashboard'
      }).state('enrollment', {
        url: '/enrollment',
        templateUrl: 'app/enrollment/enrollment.html'
        //controller: 'EnrollmentController',
        //controllerAs: 'enrollment'
      }).state('error', {
        url: '/error',
        templateUrl: 'app/error/error.html'
      });
      $urlRouterProvider.otherwise('/dashboard');
      //routerConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    }
  ]);
})();
