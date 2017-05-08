/**
 * Created by Kai Wang on 2016/8/18.
 */
'use strict';

angular.module('enrollment').factory('FSAService', [
  '$http',
  '$q',
  '$rootScope',
  'enrollmentService',
  '$filter',
  function ($http, $q, $rootScope, enrollmentService, $filter) {
    var vm = this;
    vm.FSACurrent;
    vm.FSAHistory;

    vm.getFSACurrent = function (contractId) {
      // If isDevMode is set to false, invoke the request to server
      if (!isDevMode) {
        return vm.postFSACurrent(contractId);
      }
      var deferred = $q.defer();
      $http.get('app/enrollment/FSAsingle.json').success(function (data) {
        deferred.resolve(data);
      }).error(function (err) {
        deferred.reject(err);
      });
      return deferred.promise;
    };

    vm.getFSAHistory = function (contractId) {
      // If isDevMode is set to false, invoke the request to server
      if (!isDevMode) {
        return vm.postFSAHistory(contractId);
      }

      var deferred = $q.defer();
      $http.get('app/enrollment/FSAlist.json').success(function (data) {
        deferred.resolve(data);
      }).error(function (err) {
        deferred.reject(err);
      });
      return deferred.promise;
    };

    vm.postFSACurrent = function (contractId) {
      contractId = $filter('formatContractId')(contractId);
      var formData = "contractID=" + contractId;
      var deferred = $q.defer();
      $http.post('api/contract/fsas', formData).success(function (data) {
        deferred.resolve(data);
      }).error(function (err) {
        deferred.reject(err);
      });
      return deferred.promise;
    };

    vm.postFSAHistory = function (contractId) {
      contractId = $filter('formatContractId')(contractId);
      var formData = "contractID=" + contractId;
      var deferred = $q.defer();
      $http.post('api/contract/fsas/history', formData).success(function (data) {
        deferred.resolve(data);
      }).error(function (err) {
        deferred.reject(err);
      });
      return deferred.promise;
    };

    return {
      getFSACurrent: vm.getFSACurrent,
      postFSACurrent: vm.postFSACurrent,
      getFSAHistory: vm.getFSAHistory,
      postFSAHistory: vm.postFSAHistory,
      FSACurrent: vm.FSACurrent,
      FSAHistory: vm.FSAHistory
    }
  }
]);
