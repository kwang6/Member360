/**
 * Enrollment Service
 * Author: Lu Zhang
 */
'use strict';

angular.module('notification', []);
angular.module('notification').factory('notificationService', [
  '$http',
  '$q',
  '$rootScope',
  'enrollmentService',
  '$filter',
  function ($http, $q, $rootScope, enrollmentService, $filter) {
    var vm = this;

    vm.getNotification = function (memberId, contractId) {
      // If isDevMode is set to false, invoke the request to server
      if (!isDevMode) {
        return vm.postNotification(memberId, contractId);
      }
      var deferred = $q.defer();
      $http.get('app/enrollment/notification/notification.json').success(function (data) {
        deferred.resolve(data);
      }).error(function (err) {
        deferred.reject(err);
      });
      return deferred.promise;
    }

    vm.postNotification = function (memberId, contractId) {
      contractId = $filter('formatContractId')(contractId);
      var formData = "contractID=" + contractId + "&memberID=" + memberId;
      var deferred = $q.defer();
      $http.post('api/notifications', formData).success(function (data) {
        deferred.resolve(data);
      }).error(function (err) {
        deferred.reject(err);
      });
      return deferred.promise;
    };

    vm.sortNotification = function (timestamp, sortData, startIndex, endIndex) {
      var tempAlertTime;
      var temp = {};
      for (var m = startIndex; m < endIndex - 1; m++) {
        for (var n = m + 1; n < endIndex; n++) {

          if (timestamp[m].getTime() < timestamp[n].getTime()) {
            tempAlertTime = timestamp[m];
            timestamp[m] = timestamp[n];
            timestamp[n] = tempAlertTime;

            temp = sortData.alert[m];
            sortData.alert[m] = sortData.alert[n];
            sortData.alert[n] = temp;
          }
        }
      }
      return sortData;
    };

    return {
      getNotification: vm.getNotification,
      postNotification: vm.postNotification,
      sortNotification: vm.sortNotification
    }
  }
]);
