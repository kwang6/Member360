'use strict';
angular.module('app').factory('responseInterceptor', [
  '$q',
  '$rootScope',
  '$injector',
  '$document',
  'errorHandleService',
  function ($q, $rootScope, $injector, $document) {
    return {
      responseError: function (response) {
        if (response.status === 403) {
          $rootScope.accessDenied = true;
          $injector.get('$state').transitionTo("error");
        } else {
          $rootScope.accessDenied = false;
        }
        return $q.reject(response);
      },
      response: function (response) {
        if (response.status === 200) {
          $rootScope.accessDenied = false;
          $rootScope.contractNotFound = false;
          //if response contains div to indicate sessiontimeout, redirect to index.html
          // which will redirect to fepdirect login page
          if (redirectOnSessionTimeout(response.data, $document)) {
            return $q.reject(response);
          } else {
            return response || $q.when(response);
          }
        }
      }
    };
  }
]).config([
  '$httpProvider',
  function ($httpProvider) {
    // Initialize the common header if it is not present
    if (!$httpProvider.defaults.headers.common) {
      $httpProvider.defaults.headers.common = {};
    }
    // Set the default Accept and Content-Type to the header
    $httpProvider.defaults.headers.common['Accept'] = 'application/json';
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    // Initialize the common get header if it is not present
    if (!$httpProvider.defaults.headers.get) {
      $httpProvider.defaults.headers.get = {};
    }
    // Set the header to disable IE request caching
    $httpProvider.defaults.headers.get['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';
    $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
    $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';
    // Add the responseInterceptor to the httpProvider interceptors
    $httpProvider.interceptors.push('responseInterceptor');
  }
]).config(['IdleProvider', 'KeepaliveProvider', function (IdleProvider, KeepaliveProvider) {
  var timeoutInterruptEvents = 'keydown DOMMouseScroll mousewheel mousedown';
  IdleProvider.idle(1800); // 30mins
  IdleProvider.timeout(120); // 2 mins
  IdleProvider.interrupt(timeoutInterruptEvents);
  KeepaliveProvider.interval(300); // keep alive request to server every 5 min
  //KeepaliveProvider.http('api/keepalive'); // Server URL that makes sure session is kept alive
}]);

// Function to redirect the request to the login page, if the server session has timed out
function redirectOnSessionTimeout(resp, $document) {

  angular.element($document[0].querySelector("#emptyTarget")).html(resp);

  var timeoutContainer = angular.element($document[0].querySelector('#redirectForSessionTimeoutFromAjaxCall_System'));

  //emptying out the target, so that data is not loaded on the page to avoid duplication issue
  angular.element($document[0].querySelector("#emptyTarget")).empty();

  if (timeoutContainer != undefined && timeoutContainer.length > 0) {
    //should always go to index.html as the target URL
    var indexUrl = window.location.protocol + "//" + window.location.hostname + "/pkmslogout";

    if (navigator.userAgent.toLowerCase().indexOf('android') > -1) {
      window.location = indexUrl;
    } else {
      location.replace(indexUrl);
    }
    return true;
  } else {
    return false;
  }
}
