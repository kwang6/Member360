'use strict';
angular.module('privacy').directive('privacyFlag', [function () {
  var directive = {
    restrict: 'E',
    templateUrl: 'app/enrollment/privacy/privacy.html',
    scope: true
  };
  return directive;
}
]);
