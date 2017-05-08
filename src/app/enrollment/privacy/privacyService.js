/**
 * Privacy Service
 * Author: Lu Zhang
 */
'use strict';

angular.module('privacy', ['ngAnimate', 'ngTouch', 'ui.bootstrap']);
angular.module('privacy').factory('privacyService', [
  '$http',
  '$q',
  '$rootScope',
  'enrollmentService',
  '$filter',
  function ($http, $q, $rootScope, enrollmentService, $filter) {
    var vm = this;
    vm.privacyFlag = true;

    vm.getPrivacy = function (contractId, memberId) {
      // If isDevMode is set to false, invoke the request to server
      if (!isDevMode) {
        return vm.postPrivacy(contractId, memberId);
      }
      var deferred = $q.defer();
      $http.get('app/enrollment/privacy/privacytest.json').success(function (data) {
        deferred.resolve(data);
      }).error(function (err) {
        deferred.reject(err);
      });
      return deferred.promise;
    }

    vm.postPrivacy = function (contractId, memberId) {
      var contractId = $filter('formatContractId')(contractId);
      var memberIDs = [];
      memberIDs.push(memberId);
      var formData = "contractID=" + contractId + "&memberIDs=" + memberIDs;
      var deferred = $q.defer();
      $http.post('api/contract/member/privacy', formData).success(function (data) {
        if (status == 404) {
          vm.privacyFlag = false;
          console.log(vm.privacyFlag);
        }
        deferred.resolve(data);
      }).error(function (err) {

        deferred.reject(err);
      });
      return deferred.promise;
    };

    return {
      getPrivacy: vm.getPrivacy,
      postPrivacy: vm.postPrivacy
    }
  }
]);
