/**
 * @desc navbar directive and controller for the member 360 application
 * @var 'use-sctrict' globally enforce js strict mode for this function
 */
(function () {
  'use strict';

  /**
   * @desc $log is for the angular logging service, comment out if not logging
   * for this component
   * @var '$log' global log service
   */
  // var $log = angular.injector(['ng']).get('$log');

  /**
   * @desc register the navbar component with the member 360 components module
   * @param string 'components' the angular module to register to
   * @param string 'memberNavbar' the angular directive name
   */

  /**
   * @desc 'memberNavbar' angular directive used by @ng-inject
   * @param function 'memberNavbar' function to pass directive to @ng-inject
   * @return 'memberNavbar' return the directive to @ng-inject
   */
  angular.module('components').directive('memberNavbar', [function () {
    /**
     * @desc the angular directive variable used by @ng-inject
     * @type object 'directive' used by @ng-inject
     */
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/navbar/navbar.html',
      scope: true
    };
    return directive;
  }
  ])

})();
