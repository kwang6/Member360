/**
 * Enrollment Service
 * Author: Lu Zhang
 */
'use strict';

angular.module('wellnesscard', []);
angular.module('wellnesscard').factory('wellnesscardService', [
  '$http',
  '$q',
  '$rootScope',
  'enrollmentService',
  '$filter',
  function ($http, $q, $rootScope, enrollmentService, $filter) {
    var vm = this;
    vm.currentWellnessCardBalance;

    vm.getWellnessCard = function (memberId, contractId) {
      // If isDevMode is set to false, invoke the request to server
      if (!isDevMode) {
        return vm.postWellnessCard(memberId, contractId);
      }
      var deferred = $q.defer();
      $http.get('app/enrollment/wellnesscard/wellnesscard.json').success(function (data) {
        deferred.resolve(data);
      }).error(function (err) {
        deferred.reject(err);
      });
      return deferred.promise;
    };

    vm.postWellnessCard = function (memberId, contractId) {
      contractId = $filter('formatContractId')(contractId);
      var formData = "contractID=" + contractId + "&memberID=" + memberId;
      var deferred = $q.defer();
      $http.post('api/incentive/balance', formData).success(function (data) {
        deferred.resolve(data);
      }).error(function (err) {
        deferred.reject(err);
      });
      return deferred.promise;
    };

    return {
      getWellnessCard: vm.getWellnessCard,
      postWellnessCard: vm.postWellnessCard,
      currentWellnessCardBalance: vm.currentWellnessCardBalance
    }
  }
]);
