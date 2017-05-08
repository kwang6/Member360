'use strict';
var el = angular.element;
angular.module('components').directive('focusMe', [function () {
  return {
    scope: {
      trigger: '=focusMe'
    },
    link: function (scope, element) {
      scope.$watch('trigger', function (value) {
        if (value === true) {
          element[0].focus();
          scope.trigger = false;
        }
      });
    }
  };
}]).directive('memberSearch', [function () {
  var directive = {
    restrict: 'E',
    templateUrl: 'app/components/search/search.html',
    scope: true
  };
  return directive;
}]).controller('SearchController', [
  '$scope',
  '$window',
  '$document',
  '$element',
  'enrollmentService',
  '$injector',
  'formatValidationService',
  '$rootScope',
  '$state',
  '$filter',
  function ($scope, $window, $document, $element, enrollmentService, $injector, formatValidationService, $rootScope, $state, $filter) {
    var vm = this;
    var contract = el($element[0].querySelector('[data-radio="one"]'));
    var member = el($element[0].querySelector('[data-radio="two"]'));
    vm.isVisible = false;
    vm.isSearchSSNVisible = false;
    vm.validationError = false;
    vm.searchContent = '';
    vm.criteria = ['Contract ID', 'Member ID', 'SSN'];
    vm.criterion = vm.criteria[0];
    vm.contractSummary = {};
    vm.multiSSN = false;
    vm.SSNSummary = {};
    vm.searchSSN;

    $scope.$watch('search.searchContent', function (newValue) {
      vm.validationError = false;
      $rootScope.contractNotFound = false;
      $rootScope.defaultApiError = false;
      if (vm.criterion === 'Contract ID' && newValue && newValue.length > 9) {
        vm.searchContent = newValue.substring(0, 9);
      }
    });

    vm.dropdownResult = function (result) {
      vm.criterion = result;
    }

    vm.toggle = function () {
      if (vm.multiSSN) {
        vm.isSearchSSNVisible = true;
        vm.isVisible = false;
      } else {
        vm.isSearchSSNVisible = false;
        vm.isVisible = true;
      }
      if (vm.isVisible == true) {
        $window.onclick = function () {
          vm.isVisible = false;
          //vm.multiSSN = false;
          $scope.$apply();
        };
      }
      if (vm.isSearchSSNVisible == true) {
        $window.onclick = function () {
          vm.isSearchSSNVisible = false;
          //vm.multiSSN = false;
          $scope.$apply();
        };
      }
      el(member).removeClass('is-checked');
      el(contract).addClass('is-checked');
    };

    vm.clearSearch = function () {
      $rootScope.contractNotFound = false;
      vm.toggle();
      vm.isVisible = false;
      $rootScope.defaultApiError = false;
      vm.validationError = false;
      vm.searchContent = '';
    };

    vm.clearSearchForSSNPanel = function () {
      $rootScope.contractNotFound = false;
      $rootScope.defaultApiError = false;
      vm.criterion = vm.criteria[0];
      vm.toggle();
      vm.isSearchSSNVisible = false;
      vm.searchContent = '';
      vm.multiSSN = false;
    }

    vm.keyPressEvent = function ($event) {
      var keyCode = $event.which || $event.keyCode;
      if (keyCode === 13) {
        vm.submitSearch(vm.searchContent);
      }
    };

    vm.getContractByContractId = function (searchContent) {
      enrollmentService.getContract(searchContent).then(function (data) {
        enrollmentService.contractSummary = data.contractSummary;
        enrollmentService.currentContractID = searchContent;
        enrollmentService.currentMemberID = vm.SSNMemberID;
        enrollmentService.currentSearchCriterion = vm.criterion;
        $rootScope.$broadcast('broadcastSearchContent');
        $state.go('enrollment');
      });
    }


    vm.submitSearch = function (searchContent) {
      searchContent = vm.searchContent;
      vm.isVisible = false;
      vm.isSearchSSNVisible = false;
      $rootScope.contractNotFound = false;
      $rootScope.defaultApiError = false;
      if (formatValidationService.formatValidation(searchContent) && vm.criterion == vm.criteria[0] && vm.multiSSN == false) {
        vm.validationError = false;
        vm.toggle();
        vm.getContractByContractId(searchContent);
        vm.isVisible = false;
        vm.multiSSN = false;
      }
      else if (formatValidationService.formatValidation(searchContent) && vm.criterion == vm.criteria[0] && vm.multiSSN == true) {
        vm.validationError = false;
        // vm.toggle();
        vm.isSearchSSNVisible = false;
        vm.getContractByContractId(searchContent);
        vm.multiSSN = false;

      }
      else if (vm.criterion == vm.criteria[1]) {
        vm.multiSSN = false;
        vm.criterion = vm.criteria[0];
      }
//            else if(vm.criterion == vm.criteria[2]){
//              enrollmentService.postContractIdBySSN(searchContent).then(function(data){
//                if(!data.memberEligibilityInfo.contractID){
//                  vm.multiSSN = true;
//                  vm.SSNSummary = data.memberEligibilityInfo;
//                }
//                else {
//                  vm.getContractByContractId(data.memberEligibilityInfo.contractID);
//                  vm.multiSSN = false;
//                };
//              });
//            }

      else if (vm.criterion == vm.criteria[2]) {
        enrollmentService.getContractIdBySSN(searchContent).then(function (data) {
          if (data.memberEligibilityInfo.length > 1) {
            vm.searchSSN = searchContent;
            vm.multiSSN = true;
            vm.isSearchSSNVisible = true;
            vm.toggle();
            vm.SSNSummary = data.memberEligibilityInfo;
            vm.SSNMemberID = data.memberEligibilityInfo[0].memberID;
          }
          else {
            vm.getContractByContractId($filter('formatContractId')(data.memberEligibilityInfo[0].contractID));
            vm.multiSSN = false;
            vm.SSNMemberID = data.memberEligibilityInfo[0].memberID;
          }
          ;
        });
      }
      else if (!formatValidationService.formatValidation(searchContent)) {
        vm.validationError = true;
      }
    };

    vm.getSearchResultBySSNList = function (contractId) {
      vm.isSearchSSNVisible = false;
      vm.getContractByContractId($filter('formatContractId')(contractId));
      //vm.multiSSN = false;
    }


    vm.hideOthers = function (event) {
      event.stopPropagation();
      $rootScope.$broadcast('searchBarIsOpen');
    }
    $scope.$on('notificationIsOpen', function () {
      vm.isVisible = false;
      vm.isSearchSSNVisible = false;
    })
    $scope.$on('broadcastSearchFail', function () {
      vm.multiSSN = false;
    })
    $scope.$on('enrollmentMemberRosterIsOpen', function () {
      vm.isVisible = false;
      vm.isSearchSSNVisible = false;
    })
    $scope.$on('privacyIsOpen', function () {
      vm.isVisible = false;
      vm.isSearchSSNVisible = false;
    })
  }
]);
