/**
 * Dashboard Service
 * Author: Lu Zhang
 */
'use strict';
angular.module('services').factory('errorHandleService', ['$rootScope', function ($rootScope) {
  var vm = this;
  vm.status;
  vm.notFoundErrorHandler = function (error) {
    //Contract Not Found or Member Not Found
    if (error.status === 404010 || error.status === 404005) {
      vm.status = false;
      $rootScope.contractNotFound = true;
    } else {
      $rootScope.defaultApiError = true;
    }
  };
  vm.otherErrorHandler = function () {
    $rootScope.defaultApiError = true;
  };
  return {notFoundErrorHandler: vm.notFoundErrorHandler, otherErrorHandler: vm.otherErrorHandler}
}
]);
