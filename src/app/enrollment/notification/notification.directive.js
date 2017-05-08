'use strict';
angular.module('notification').directive('notificationMessages', [function () {
  var directive = {
    restrict: 'E',
    templateUrl: 'app/enrollment/notification/notification.html',
    scope: true
  };
  return directive;
}
]);
