/**
 * @desc 'NavbarController' angular controller used by @ng-inject
 * @param function 'NavbarController' declare the controller
 * @param service '$rootScope' angular rootScope service
 * @param service '$window ' angular window service
 * @return 'NavbarController' to be used by @ng-inject
 */


'use strict';
angular.module('components').controller('NavbarController', [
  '$rootScope',
  '$window',
  '$scope',
  '$uibModal',
  function ($rootScope, $window, $scope, $uibModal) {
	  var vm = this;
    vm.load_materialjs = function () {
      var updateCallback = $rootScope.$on('$viewContentLoaded', function () {
        var componentHandler = $window.componentHandler;
        componentHandler.upgradeAllRegistered();
      });
      $rootScope.$on('$destroy', updateCallback)
    }
    vm.load_materialjs();


    $scope.logoutDialog = function (size) {
      var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'myModalLogout.html',
        controller: 'ModalInstanceLogout',
        windowClass: 'center-modal',
        size: size,
        resolve: {
          items: function () {
            return $scope.items;
          }
        }
      });

      modalInstance.result.then(function () {

      }, function () {
      });
    };
  }
]);

angular.module('components').controller('ModalInstanceLogout', function ($scope, $uibModalInstance, items) {
  $scope.items = items;

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
