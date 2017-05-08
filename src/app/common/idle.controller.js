'use strict';
angular.module('idlecntrlr', []);
angular.module('idlecntrlr').controller('IdleController', [
  '$scope',
  '$rootScope',
  '$log',
  function ($scope, $rootScope, $log) {
    $scope.extendSession = function () {
      $log.debug('extendSession called');
      $rootScope.closeModals();
      $rootScope.$broadcast('IdleEnd');
    };

    $scope.endSession = function () {
      $log.debug('endSession called');
      $rootScope.$broadcast('IdleTimeout');
    };
  }]);
