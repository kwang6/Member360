/**
 * @desc dock directive and controller for member 360
 * @var 'use-sctrict' globally enforce js strict mode for this function
 */
(function () {
  'use strict';
  angular.module('components').directive('memberDock', [function () {

    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/dock/dock.html',
      scope: true
    };
    return directive;
  }])
})();
