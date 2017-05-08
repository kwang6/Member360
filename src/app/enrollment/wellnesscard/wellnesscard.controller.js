'use strict';
angular.module('wellnesscard').controller('WellnesscardController', [
  '$scope',
  'enrollmentService',
  'wellnesscardService',
  '$rootScope',
  function ($scope, enrollmentService, wellnesscardService, $rootScope) {
    var vm = this;
    vm.noWellnessAccount = false;
    vm.WellnessCard = {};

    vm.getWellnessCardData = function () {
      vm.currentMemberFirstName = enrollmentService.currentMemberFirstName;
      wellnesscardService.getWellnessCard(enrollmentService.currentMemberID, enrollmentService.currentContractID).then(function (data) {
        if (angular.isDefined(data.incentiveBalance)) {
          vm.WellnessCardData = data;
          vm.noWellnessAccount = false;
        }
        else {
          vm.noWellnessAccount = true;
        }
      })
    }

    vm.toggle = function () {
      $rootScope.$broadcast('hideWellnessCard');
    };

    //check once the data loaded, fill in all the wellness card info into wellness card
    $scope.$on('getWellnessCardData', function () {
      vm.getWellnessCardData();
    })
  }
]);
