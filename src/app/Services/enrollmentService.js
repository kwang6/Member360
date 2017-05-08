/**
 * Enrollment Service
 * Author: Lu Zhang
 */
'use strict';

angular.module('enrollment', []);
angular.module('enrollment').factory('enrollmentService', [
  '$http',
  '$q',
  '$rootScope',
  '$state',
  'errorHandleService',
  '$filter',
  function ($http, $q, $rootScope, $state, errorHandleService, $filter) {
    var vm = this;
    vm.contractSummary;
    vm.hasEnrollmentInfo;
    vm.currentMemberFirstName;
    vm.currentContractID;
    vm.currentMemberID;
    vm.currentSearchCriterion;

    vm.getContract = function (id) {
      // If isDevMode is set to false, invoke the request to server
      if (!isDevMode) {
        return vm.postContract(id);
      }
      var deferred = $q.defer();
      $http.get('app/enrollment/' + id + '.json').success(function (data) {
        deferred.resolve(data);
      }).error(function (err) {
        errorHandleService.notFoundErrorHandler(err);
        if (!vm.hasEnrollmentInfo) {
          $rootScope.$broadcast('broadcastSearchFail');
        }
        deferred.reject(err);
      });
      return deferred.promise;
    };

    vm.postContract = function (id) {
      var formData = "contractId=" + id;
      var deferred = $q.defer();
      $http.post('api/contract/summary', formData).success(function (data) {
        deferred.resolve(data);
      }).error(function (err) {
        errorHandleService.notFoundErrorHandler(err);
        if (!vm.hasEnrollmentInfo) {
          $rootScope.$broadcast('broadcastSearchFail');
        }
        deferred.reject(err);
      });
      return deferred.promise;
    };

    vm.getContractIdBySSN = function (ssn) {
      // If isDevMode is set to false, invoke the request to server
      if (!isDevMode) {
        return vm.postContractIdBySSN(ssn);
      }
      ssn = vm.formatSSN(ssn);
      var deferred = $q.defer();
      $http.get('app/components/search/ssnResult.json').success(function (data) {
        deferred.resolve(data);
      }).error(function (err) {
        errorHandleService.notFoundErrorHandler(err);
        if (!vm.hasEnrollmentInfo) {
          $rootScope.$broadcast('broadcastSearchFail');
        }
        deferred.reject(err);
      });
      return deferred.promise;
    };

    vm.formatSSN = function (ssn) {
      ssn = ssn.toString().replace(/-/g, "");
      return ssn;
    }

    vm.postContractIdBySSN = function (ssn) {
      ssn = vm.formatSSN(ssn);
      var formData = "memberSSN=" + ssn;
      var deferred = $q.defer();
      $http.post('api/contract/member/memberEligibility', formData).success(function (data) {
        deferred.resolve(data);
      }).error(function (err) {
        errorHandleService.notFoundErrorHandler(err);
        if (!vm.hasEnrollmentInfo) {
          $rootScope.$broadcast('broadcastSearchFail');
        }
        deferred.reject(err);
      });
      return deferred.promise;
    };

    //Function to get the Contract Events
    vm.getContractEvents = function (contractId) {
      // If isDevMode is set to false, invoke the request to server
      if (!isDevMode) {
        return vm.postContractEvents(contractId);
      }

      var deferred = $q.defer();
      $http.get('app/enrollment/ContractEvents.json').success(function (data) {
        deferred.resolve(data);
      }).error(function (err) {
        deferred.reject(err);
      });
      return deferred.promise;
    };

    //Function to get the Contract Events
    vm.postContractEvents = function (contractId) {
      contractId = $filter('formatContractId')(contractId);
      var formData = "contractID=" + contractId;
      var deferred = $q.defer();
      $http.post('api/contract/enrollmentevents', formData).success(function (data) {
        deferred.resolve(data);
      }).error(function (err) {
        deferred.reject(err);
      });
      return deferred.promise;
    };

    return {
      hasEnrollmentInfo: vm.hasEnrollmentInfo,
      getContract: vm.getContract,
      postContract: vm.postContract,
      contractSummary: vm.contractSummary,
      currentMemberFirstName: vm.currentMemberFirstName,
      currentContractID: vm.currentContractID,
      currentMemberID: vm.currentMemberID,
      currentSearchCriterion: vm.currentSearchCriterion,
      getContractIdBySSN: vm.getContractIdBySSN,
      postContractIdBySSN: vm.postContractIdBySSN,
      getContractEvents: vm.getContractEvents,
      postContractEvents: vm.postContractEvents
    }
  }
]);
