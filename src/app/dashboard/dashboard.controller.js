/**
 * DashboardController
 * Author: Lu Zhang
 */
(function () {
  'use strict';
  angular.module('dashboard').controller('DashboardController', [
    'dashboardService',
    function (dashboardService) {
      var vm = this;
      vm.user = {};
      dashboardService.getName().then(function (names) {
        vm.user = names;
      });
    }
  ]);
})();
