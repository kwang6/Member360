'use strict';

angular.module('privacy').controller('privacyController', [
  '$scope',
  'enrollmentService',
  '$rootScope',
  '$window',
  'privacyService',
  function ($scope, enrollmentService, $rootScope, $window, privacyService) {
    var vm = this;
    vm.isVisible = false;
    vm.noPrivacyInfo = true;
    vm.arrowIcon = "keyboard_arrow_down";

    //call privacy service get privacy data.
    vm.getPrivacyData = function () {
      privacyService.getPrivacy(enrollmentService.currentContractID, enrollmentService.currentMemberID).then(function (data) {
        vm.privacyData = data;
        vm.noPrivacyInfo = false;
      }, function (errorResponse) {
        if (errorResponse.status === 404011) {
          vm.noPrivacyInfo = true;
        }

      });
    }

    vm.preload = function () {
      vm.getPrivacyData();
    }
    vm.preload();


    //when click to close privacy drawer, reclick to open it.
    vm.toggle = function () {
      $window.onclick = null;
      vm.isVisible = !vm.isVisible;
      if (vm.isVisible) {
        vm.arrowIcon = "keyboard_arrow_up";
        $window.onclick = function () {
          vm.isVisible = false;
          vm.arrowIcon = "keyboard_arrow_down";
          $scope.$apply();
        };
      } else {
        vm.arrowIcon = "keyboard_arrow_down";
      }
    };

    //when other place been clicked or other drawer bar been opened, close notification drawer
    vm.hideEnrollment = function (event) {
      event.stopPropagation();
      $rootScope.$broadcast('privacyIsOpen');
    }
    $scope.$on('enrollmentMemberRosterIsOpen', function () {
      vm.isVisible = false;
    })
    $scope.$on('searchBarIsOpen', function () {
      vm.isVisible = false;
    })
    $scope.$on('notificationIsOpen', function () {
      vm.isVisible = false;
    })

    //check once the data loaded, fill in all the wellness card info into wellness card
    $scope.$on('fillPrivacyInfo', function () {
      vm.getPrivacyData();
    })

  }]);
