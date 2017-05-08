/**
 * @desc breadcrumb directive and controller for the member 360 application
 * @var 'use-sctrict' globally enforce js strict mode for this function
 */
(function () {
  'use strict';
  /**
   * @desc $log is for the angular logging service, comment out if not logging
   * for this component
   * @var '$log' global log service
   */
  var $log = angular.injector(['ng']).get('$log');
  /**
   * @desc 'memberBreadcrumb' angular directive used by @ng-inject
   * @param function 'memberBreadcrumb' function to pass directive to @ng-inject
   * @return 'memberBreadcrumb' return the directive to @ng-inject
   */
  angular.module('components').directive('memberBreadcrumb', [function () {
    /**
     * @desc the angular directive variable used by @ng-inject
     * @type object 'directive' used by @ng-inject
     */
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/breadcrumb/breadcrumb.html',
      transclude: true,
      scope: true
    };
    return directive;
  }])
})();
