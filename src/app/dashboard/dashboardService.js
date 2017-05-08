/**
 * Dashboard Service
 * Author: Lu Zhang
 */
'use strict';
var $log = angular.injector(['ng']).get('$log');
angular.module('dashboard', []);
angular.module('dashboard').factory('dashboardService', [
  '$http',
  '$q',
  function ($http, $q) {
    function getName() {
      var deferred = $q.defer();
      // If isDevMode is set to false, invoke the request to server
      if (isDevMode) {
        $http.get('app/dashboard/test.json').success(function (result) {
          deferred.resolve(result);
        }).error(function (err) {
          $log.log('error retrieving markets');
          deferred.reject(err);
        });
      } else {
        $http.get('api/userprofile').success(function (result) {
          deferred.resolve(result);
        }).error(function (err) {
          $log.log('error retrieving markets');
          deferred.reject(err);
        });
      }
      return deferred.promise;
    }

    return {getName: getName}
  }
]);
