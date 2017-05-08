(function () {
  'use strict';

  angular
    .module('app').run(['$rootScope', 'Idle', 'Keepalive', '$log', '$interval', '$window', '$uibModal', '$http', function ($rootScope, Idle, Keepalive, $log, $interval, $window, $uibModal, $http) {
    Idle.watch();

    // Interrupt events to enable the keep alive
    var timeoutInterruptEvents = 'keydown DOMMouseScroll mousewheel mousedown';
    $rootScope.idleTime = Idle._options().idle;

    $rootScope.closeModals = function () {
      if ($rootScope.warning) {
        $rootScope.warning.close();
        $rootScope.warning = null;
      }
    };

    // Function to handle Idle Start, set the keep alive to false, not to ping the server any more
    $rootScope.$on('IdleStart', function () {
      $log.debug('Idle Start');
      Idle._options().keepalive = false;
      $rootScope.closeModals();

      $rootScope.warning = $uibModal.open({
        templateUrl: 'app/common/idle-dialog.html',
        windowClass: 'center-modal'
      });
    });

    // Function to handle Idle End, set the keep alive to true, to ping the server
    $rootScope.$on('IdleEnd', function () {
      $log.debug('Idle End');
      Idle._options().keepalive = true;
      $rootScope.$broadcast('Keepalive');
    });

    // Function to handle Idle timeout, the user did not take any action, hence will redirect the user to the
    // FEPDirect Menu of services page. If the user is not active in any of the fepdirect applications, they
    // will be logged out of FEPDirect.
    $rootScope.$on('IdleTimeout', function () {
      // the user has timed out (meaning idleDuration + timeout has passed without any activity)
      // logging out the user by invoking the logout for the mSite application
      $log.debug("Idle timeout");
      var timeoutUrl = "/fepdirect/MenuOfServices.jsp";
      if (navigator.userAgent.toLowerCase().indexOf('android') > -1) {
        window.location = timeoutUrl;
      } else {
        location.replace(timeoutUrl);
      }
    });

    // Function that gets called when any of the interrupt events gets fired, to set the
    // keep alive to true
    $rootScope.idleInterrupt = function () {
      Idle._options().keepalive = true;
      $rootScope.startInterval();
    };

    $rootScope.$on('Keepalive', function () {
      $log.debug('Keep alive broadcast called');
      // If the keepalive option is set to true, call the server keepalive api request
      if (Idle._options().keepalive === true) {
        $http.get('api/keepalive');
      }
    });

    // Function that gets called for every interval to set the keep alive flag to false
    $rootScope.setKeepAlive = function () {
      $log.debug("Set Keep Alive called :: " + Idle._options().keepalive);
      if (Idle._options().keepalive === true) {
        Idle._options().keepalive = false;
      }
    }

    // store the interval promise in this variable
    var promise;

    // starts the interval
    $rootScope.startInterval = function () {
      // stops any running interval to avoid two intervals running at the same time
      $rootScope.stopInterval();

      // Set the interval function to check whether to keep alive for every 5 mins and
      // store the interval promise
      promise = $interval(function () {
        $rootScope.setKeepAlive();
      }, 5 * 60 * 1000); // 5 mins
    };

    // Function to stop the interval
    $rootScope.stopInterval = function () {
      $interval.cancel(promise);
    };

    // Start the interval by default
    $rootScope.startInterval();

    // Stops the interval when the route scope is destroyed,
    $rootScope.$on('$destroy', function () {
      $rootScope.stopInterval();
    });


    // Function to handle the interrupt events
    var eventList = timeoutInterruptEvents.split(' ');
    var fn = function () {
      $rootScope.idleInterrupt();
    };

    // Attach the interrupt events to the window object
    for (var i = 0; i < eventList.length; i++) {
      if ($window.addEventListener) {
        $window.addEventListener(eventList[i], fn, false);
      } else {
        $window.attachEvent(eventList[i], fn)
      }
    }
  }]);
})();
