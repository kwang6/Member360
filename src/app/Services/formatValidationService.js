/**
 * Dashboard Service
 * Author: Lu Zhang
 */
'use strict';
angular.module('services', []);
angular.module('services').factory('formatValidationService', [function () {
  var vm = this;
  var searchContent = /^[Rr0-9][0-9]{8}$/i;
  vm.formatValidation = function (value) {
    return searchContent.test(value);
  };
  return {formatValidation: vm.formatValidation}
}
]);
