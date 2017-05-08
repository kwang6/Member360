'use strict';
angular.module('notification').controller('NotificationController', [
  '$scope',
  'enrollmentService',
  'notificationService',
  '$window',
  '$filter',
  '$rootScope',
  function ($scope, enrollmentService, notificationService, $window, $filter, $rootScope) {
    var vm = this;
    vm.isVisible = false;
    vm.unreadCount = 0;

    //Sorting all the notifications
    vm.sortNotification = function () {
      var indexNotification = 0;
      var alertTime = {};
      var tempAlertTime;
      for (var p = 0; p < vm.notificationData.alert.length; p++) {
        alertTime[p] = new Date(vm.notificationData.alert[p].timestamp);
      }
      //Put all the Critical at front with tempAlertTime same order change
      for (var k = 0; k < vm.notificationData.alert.length; k++) {
        if (vm.notificationData.alert[k].category === "CRITICAL") {
          tempAlertTime = alertTime[k];
          alertTime[k] = alertTime[indexNotification];
          alertTime[indexNotification] = tempAlertTime;
          
          var temp = vm.notificationData.alert[k];
          vm.notificationData.alert[k] = vm.notificationData.alert[indexNotification];
          vm.notificationData.alert[indexNotification] = temp;
          indexNotification++;
        }
      }
      //Sort all the Critical with tempAlertTime same order change
      vm.notificationData = notificationService.sortNotification(alertTime, vm.notificationData, 0, indexNotification);

      var criticalEndIndex = indexNotification;

      for (var m = indexNotification; m < vm.notificationData.alert.length; m++) {
        if (vm.notificationData.alert[m].category === "CTA") {
          tempAlertTime = alertTime[m];
          alertTime[m] = alertTime[indexNotification];
          alertTime[indexNotification] = tempAlertTime;

          var temps = vm.notificationData.alert[m];
          vm.notificationData.alert[m] = vm.notificationData.alert[indexNotification];
          vm.notificationData.alert[indexNotification] = temps;
          indexNotification++;
        }
      }
      vm.notificationData = notificationService.sortNotification(alertTime, vm.notificationData, criticalEndIndex, indexNotification);
      vm.notificationData = notificationService.sortNotification(alertTime, vm.notificationData, indexNotification, vm.notificationData.alert.length);
    }


    //get notification data function
    vm.getNotificationData = function () {
      vm.currentMemberFirstName = enrollmentService.currentMemberFirstName;
      notificationService.getNotification(enrollmentService.currentMemberID, enrollmentService.currentContractID).then(function (data) {
        vm.notificationData = data;
        vm.unreadCount = 0;
        for (var i = 0; i < vm.notificationData.alert.length; i++) {
          if (vm.notificationData.alert[i].status === "UNREAD") {
            vm.unreadCount++;
          }
        }
        vm.sortNotification();
      })
    }

    vm.preload = function () {
      vm.getNotificationData();
    }
    vm.preload();

    //when click to close notification drawer, reclick to open it.
    vm.toggle = function () {
      $window.onclick = null;
      vm.isVisible = !vm.isVisible;
      if (vm.isVisible) {
        $window.onclick = function () {
          vm.isVisible = false;
          $scope.$apply();
        };
      }
    };
    //when other place been clicked or other drawer bar been opened, close notification drawer
    vm.hideEnrollment = function (event) {
      event.stopPropagation();
      $rootScope.$broadcast('notificationIsOpen');
    }
    $scope.$on('enrollmentMemberRosterIsOpen', function () {
      vm.isVisible = false;
    })
    $scope.$on('searchBarIsOpen', function () {
      vm.isVisible = false;
    })
    $scope.$on('privacyIsOpen', function () {
      vm.isVisible = false;
    })

    //check once the data loaded, fill in all the notification data into notification drawer
    $scope.$on('fillNotificationInfo', function () {
      vm.getNotificationData();
    })
  }
]);
