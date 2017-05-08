'use strict';
angular.module('components').controller('DockController', ['$state', 'enrollmentService', '$scope', function ($state, enrollmentService, $scope) {
  var vm = this;
  vm.dashboardLinkActive = true;
  vm.enrollmentLinkActive = false;

  vm.dashboardLink = function () {
    if (!vm.dashboardLinkActive) {
      vm.dashboardLinkActive = true;
      vm.enrollmentLinkActive = false;
    }
    $state.go('dashboard');
  }

  vm.enrollmentLink = function () {
    if (!vm.enrollmentLinkActive && enrollmentService.hasEnrollmentInfo) {
      vm.dashboardLinkActive = false;
      vm.enrollmentLinkActive = true;
      $state.go('enrollment');
    }
  }

  $scope.$on('broadcastSearchContent', function () {
    vm.dashboardLinkActive = false;
    vm.enrollmentLinkActive = true;
  });
  $scope.$on('broadcastSearchFail', function () {
    vm.dashboardLinkActive = true;
    vm.enrollmentLinkActive = false;
  });
}]);
