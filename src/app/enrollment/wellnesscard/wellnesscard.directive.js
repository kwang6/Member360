'use strict';
angular.module('wellnesscard').directive('wellnesscardInfo', [function () {
  var directive = {
    restrict: 'E',
    templateUrl: 'app/enrollment/wellnesscard/wellnesscard.html',
    scope: true
  };
  return directive;
}
]);
