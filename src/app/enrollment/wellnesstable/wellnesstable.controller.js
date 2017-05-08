'use strict';
angular.module('wellnesstable').controller('WellnesstableController', [
  '$scope',
  'enrollmentService',
  'wellnesstableService',
  function ($scope, enrollmentService, wellnesstableService) {
    var vm = this;
    vm.wellnessTable = {};

    vm.getWellnesstableData = function () {
      vm.currentMemberFirstName = enrollmentService.currentMemberFirstName;
      wellnesstableService.getWellnesstableInfo(enrollmentService.currentMemberID, enrollmentService.currentContractID).then(function (data) {
        vm.wellnesstableData = data;
      });
    };

    //check once the data loaded, fill in all the wellness table info into wellness table
    $scope.$on('getWellnesstableData', function () {
      vm.getWellnesstableData();
    });

  }
]);
