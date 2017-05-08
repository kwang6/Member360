/**
 * Wellness Table Service
 * Author: Lu Zhang
 */
'use strict';

angular.module('wellnesstable', []);
angular.module('wellnesstable').factory('wellnesstableService', [
  '$http',
  '$q',
  function ($http, $q) {
    var vm = this;
    vm.currentWellnesstableInfo;

    vm.getWellnesstableInfo = function (memberId, contractId) {
      // If isDevMode is set to false, invoke the request to server
      if (!isDevMode) {
        return vm.postWellnesstableInfo(memberId, contractId);
      }

      var deferred = $q.defer();
      $http.get('app/enrollment/wellnesstable/wellnessTable.json').success(function (data) {
        deferred.resolve(data);
      }).error(function (err) {
        deferred.reject(err);
      });
      return deferred.promise;
    };

    vm.postWellnesstableInfo = function (memberId, contractId) {
      var formData = "memberId=" + memberId;
      var deferred = $q.defer();
      $http.post('api/wellnessprograms/member', formData).success(function (data) {
        deferred.resolve(data);
      }).error(function (err) {
        deferred.reject(err);
      });
      return deferred.promise;
    };

    return {
      getWellnesstableInfo: vm.getWellnesstableInfo,
      postWellnesstableInfo: vm.postWellnesstableInfo,
      currentWellnesstableInfo: vm.currentWellnesstableInfo
    }
  }
]);
