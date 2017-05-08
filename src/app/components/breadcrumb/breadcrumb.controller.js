/**
 * @desc 'BreadcrumbController' angular controller used by @ng-inject
 * @param function 'BreadcrumbController' declare the controller
 * @param '$location' this is the current location of the application
 * @return 'BreadcrumbController' to be used by @ng-inject
 */
'use strict';
angular.module('components').controller('BreadcrumbController', [
  '$location',
  function ($location) {
    var vm = this;
    var currentBreadCrumb = $location.path();
    vm.isVisible = false;
    vm.breadCrumb = currentBreadCrumb;
    /**
     * TODO - finish up for location path trim off
     * the forward slash for current breadcrumb display
     */
    vm.breadCrumbDisplay = function () {
      if (currentBreadCrumb.charAt(0) === '/') {
        currentBreadCrumb = currentBreadCrumb.slice(1);
        vm.breadCrumb = currentBreadCrumb;
      }
    }
    vm.breadCrumbDisplay();

    vm.toggle = function () {
      vm.isVisible = !vm.isVisible;
    }
  }
]);
