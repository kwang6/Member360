'use strict';
angular.module('wellnesstable').directive('wellnesstableInfo', [function () {
  var directive = {
    restrict: 'E',
    templateUrl: 'app/enrollment/wellnesstable/wellnesstable.html',
    scope: true
  };
  return directive;
}
]);
