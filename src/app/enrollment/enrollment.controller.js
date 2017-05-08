/**
 * Enrollment Controller
 * Author: Lu Zhang
 */
'use strict';
angular.module('enrollment').controller('EnrollmentController', [
  '$scope',
  'enrollmentService',
  'notificationService',
  'FSAService',
  'privacyService',
  '$rootScope',
  '$window',
  '$document',
  '$uibModal',
  '$state',
  function ($scope, enrollmentService, notificationService, FSAService, privacyService, $rootScope, $window, $document, $uibModal, $state) {

    var vm = this;
    vm.contractInfo;
    vm.payrollOfficeInfo;
    vm.enrollmentInfo;
    vm.alternateAddress;
    vm.primaryAddress;
    vm.memberAddress;
    vm.contacts;
    vm.contractHolderSummary;
    vm.planInfo;
    vm.currentFsaEligibility;
    vm.hasFsaEligibilityHistory;
    vm.contractEvents = {};
    vm.members = {};
    vm.selectedMember;
    vm.members.memberTypeExtend = {};
    vm.members.relationshipExtend = {};
    vm.hideWellnessCard = false;
    vm.rosterPanelShowed = false;
    vm.arrowIcon = "keyboard_arrow_down";
    vm.checkIcon = "check_box";
    vm.currentSearchCriterion = enrollmentService.currentSearchCriterion;

    vm.dashboardFlag = true;
    vm.setStateGo = function () {
      if (vm.dashboardFlag) {
        $state.go('dashboard');
      }
    }
    vm.changeTabToDefault = function () {
        if (angular.element($document[0].querySelector("#wellness")).hasClass('is-active')) {
          angular.element($document[0].querySelector("#events")).addClass('is-active');
          angular.element($document[0].querySelector("#wellness")).removeClass('is-active');
          angular.element($document[0].querySelector("#eventsTab")).addClass('is-active');
          angular.element($document[0].querySelector("#wellnessTab")).removeClass('is-active');
        }
      };
    //define Extend of "O" "S" "C" "C" "D" with their meanings to show on the enrollment dashboard
    vm.getExtendValue = function () {
      for (var i = 0; i < vm.members.length; i++) {
        if (vm.members[i].relationship === "O") {
          vm.members[i].relationshipExtend = "Original Contract Holder"
        } else if (vm.members[i].relationship === "S") {
          vm.members[i].relationshipExtend = "Spouse"
        } else if (vm.members[i].relationship === "C") {
          vm.members[i].relationshipExtend = "Child"
        } else {
          vm.members[i].relationshipExtend = "- -"
        }
        if (vm.members[i].memberType === "C") {
          vm.members[i].memberTypeExtend = "Contract Holder"
        } else if (vm.members[i].memberType === "D") {
          vm.members[i].memberTypeExtend = "Dependent"
        } else {
          vm.members[i].memberTypeExtend = "- -"
        }
      }
    };


    //get current contract info
    vm.getContractNumber = function (contactType) {
        vm.contacts = vm.contacts || [];
        for (var i = 0; i < vm.contacts.length; i++) {
          if (vm.contacts[i].contactType === contactType) { // you iterate over items, not names, which it an Json property inside item
            return vm.contacts[i];
          }
        }
      };
      vm.getContractHomeNumber = function () { // Function to get the Active contract home phone number
        if (vm.contractSummary.isAlternateAddressActive) {
          return vm.getContractNumber('A');
        } else {
          return vm.getContractNumber('H');
        }
      };
      vm.getAddressType = function (addressType) {
        vm.addresses = vm.addresses || [];
        for (var i = 0; i < vm.addresses.length; i++) {
          if (vm.addresses[i].addressType === addressType) { // you iterate over items, not names, which it an Json property inside item
            return vm.addresses[i];
          }
        }
      };
      
    vm.populateContractAddress = function () { // Function to populate the Alternate and Primary address
      var addresses = vm.contractSummary.addresses || [];
      vm.alternateAddress = '';
      vm.primaryAddress = '';
      for (var i = 0; i < addresses.length; i++) {
        if (addresses[i].addressType === 'C') { // If the address type is C, set to primary address
          vm.primaryAddress = addresses[i];
        } else if (addresses[i].addressType === 'A') { // If the address type is A, set to alternate address
          vm.alternateAddress = addresses[i];
        }
      }
    };

    vm.getContractHolder = function () {
      vm.members = vm.members || [];
      var Oindex = -1;
      var Cindex = -1;
      for (var i = 0; i < vm.members.length; i++) {
        if (vm.members[i].relationship === 'O') {
        	Oindex = i;
        }
        else if(vm.members[i].memberType === 'C'){
        	Cindex = i;
        }
      }
      if(Oindex !== -1){
    	  return vm.members[Oindex];
      }
      else{
    	  return vm.members[Cindex];
      }
    };
    
    
  //get Member Info
    vm.getMemberContactNumber = function (contactType) {
      vm.selectedMember.contacts = vm.selectedMember.contacts || [];
      for (var i = 0; i < vm.selectedMember.contacts.length; i++) {
        if (vm.selectedMember.contacts[i].contactType === contactType) {
          return vm.selectedMember.contacts[i];
        }
      }
    };
    vm.getMemberAddress = function (addressType) {
      vm.selectedMember.addresses = vm.selectedMember.addresses || [];
      for (var i = 0; i < vm.selectedMember.addresses.length; i++) {
        if (vm.selectedMember.addresses[i].addressType === addressType) {
          return vm.selectedMember.addresses[i];
        }
      }
    };

    vm.getMemberMyBlueRegister = function () {
      if (vm.selectedMember.myBlueRegistrationInfo && vm.selectedMember.myBlueRegistrationInfo.isAccountConfirmed) {
        vm.isMyBlueRegisteredUser = 'Registered';
        vm.checkIcon = "check_box";
      } else {
        vm.isMyBlueRegisteredUser = 'Not Registered';
        vm.checkIcon = "highlight_off";
      }
      return vm.isMyBlueRegisteredUser;
    }

    vm.getMember = function () {
      vm.members = vm.members || [];
      for (var i = 0; i < vm.members.length; i++) {
        if (vm.members[i].memberID === enrollmentService.currentMemberID) {
          return vm.members[i];
        }
      }
    }

    vm.setMemberIDforSSN = function () {
      if (vm.currentSearchCriterion === 'SSN') {
        vm.s = vm.getMember();
        vm.setSelectedMember(vm.s);
      } else {
        vm.selectedMember = vm.getContractHolder();
      }
    }
    
    
    
    

    //Function to get the current FSA record on file, if there are multiple entries, get the first record
    vm.getFSAcurrent = function () {
      FSAService.getFSACurrent(enrollmentService.currentContractID).then(function (data) {
        vm.hasFsaEligibilityHistory = data.fsaEligibilityHistory;
        if (angular.isDefined(data.fsaEligibility)) {
          vm.currentFsaEligibility = data.fsaEligibility[0];
        }
      })
    }

    //Function to get the current FSA record on file, if there are multiple entries, get the first record
    vm.getContractEvents = function () {
      enrollmentService.getContractEvents(enrollmentService.currentContractID).then(function (data) {
        if (angular.isDefined(data.enrollmentOptions)) {
          vm.contractEvents = data.enrollmentOptions;
        }
      })
    }

    //send notifications to notification & wellnesstable & wellnesscard controller that this is the time to fill in all the data for notification drawer a& wellness tab

    vm.getNotificationData = function () {
      enrollmentService.currentMemberID = vm.selectedMember.memberID;
      enrollmentService.currentContractID = vm.contractSummary.contractID;
      enrollmentService.currentMemberFirstName = vm.selectedMember.firstName;
      $rootScope.$broadcast('fillNotificationInfo');
    }
    vm.getWellnessData = function () {
      vm.hideWellnessCard = false;
      $rootScope.$broadcast('getWellnessCardData');
      $rootScope.$broadcast('getWellnesstableData');
    }

    vm.getPrivacyData = function () {
      enrollmentService.currentMemberID = vm.selectedMember.memberID;
      enrollmentService.currentContractID = vm.contractSummary.contractID;
      $rootScope.$broadcast('fillPrivacyInfo');
    }

    vm.setSelectedMember = function (member) {
      vm.selectedMember = member;
      vm.getNotificationData();
      vm.getPrivacyData();
      vm.getMemberMyBlueRegister();
      vm.memberAddress = vm.getMemberAddress('M');
      if (vm.selectedMember.relationship === 'O') {
        vm.role = 'CONTRACT HOLDER';
      } else {
        vm.role = 'MEMBER';
      }
      vm.changeTabToDefault();
    };

    


    vm.getcontract = function () {
      vm.contractSummary = enrollmentService.contractSummary;
      vm.payrollOfficeInfo = vm.contractSummary.payrollOfficeInfo;
      vm.enrollmentInfo = vm.contractSummary.enrollmentInfo;
      vm.planInfo = vm.contractSummary.planInfo;
      vm.members = vm.contractSummary.members;
      vm.contacts = vm.contractSummary.contacts;
      enrollmentService.hasEnrollmentInfo = true;
      vm.role = 'CONTRACT HOLDER';
      vm.isMyBlueRegisteredUser = '';
      vm.dashboardFlag = false;

      //execute all the function needed
      vm.getExtendValue();
      vm.selectedMember = vm.getContractHolder();
      vm.setMemberIDforSSN();
      vm.getMemberMyBlueRegister();
      vm.getNotificationData();
      vm.getPrivacyData();
      vm.getFSAcurrent();
      vm.getContractEvents();
      vm.populateContractAddress();
      vm.memberAddress = vm.getMemberAddress('M');
    };

    $scope.showFSA = function (size) {
      vm.getFSAHistory = function () {
        FSAService.getFSAHistory(enrollmentService.currentContractID).then(function (data) {
          if (angular.isDefined(data.fsaEligibility)) {
            FSAService.FSAHistory = data.fsaEligibility;
          }

          var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'myModalContent.html',
            controller: 'ModalInstanceCtrl',
            windowClass: 'center-modal',
            size: size,
            resolve: {
              items: function () {
                return $scope.items;
              }
            }
          });

          modalInstance.result.then(function () {

          }, function () {
          });
        })
      }
      vm.getFSAHistory();
    };


    vm.preload = function () {
      if (enrollmentService.currentContractID) {
        vm.getcontract();
      } else {
        vm.setStateGo();
      }
    };
    vm.preload();


    //all below are watching other components
    
    vm.wellnesscardtoggle = function () {
      vm.hideWellnessCard = !vm.hideWellnessCard;
    }
    $scope.$on('hideWellnessCard', function () {
      vm.wellnesscardtoggle();
    })
    $scope.$on('broadcastSearchContent', function () {
      vm.currentSearchCriterion = enrollmentService.currentSearchCriterion;
      vm.getcontract();
      vm.changeTabToDefault();
    });
    vm.handleRosterClick = function () {
      vm.rosterPanelShowed = !vm.rosterPanelShowed;
      if (vm.rosterPanelShowed === true) {
        vm.arrowIcon = "keyboard_arrow_up";
      } else {
        vm.arrowIcon = "keyboard_arrow_down";
      }
      if (vm.rosterPanelShowed === true) {
        $window.onclick = function () {
          vm.rosterPanelShowed = false;
          vm.arrowIcon = "keyboard_arrow_down";
          $scope.$apply();
        };
      }
      $scope.$on('notificationIsOpen', function () {
        vm.rosterPanelShowed = false;
        vm.arrowIcon = "keyboard_arrow_down";
      })
      $scope.$on('searchBarIsOpen', function () {
        vm.rosterPanelShowed = false;
        vm.arrowIcon = "keyboard_arrow_down";
      })
      $scope.$on('privacyIsOpen', function () {
        vm.rosterPanelShowed = false;
        vm.arrowIcon = "keyboard_arrow_down";
      })
      vm.hideNotification = function (event) {
        $rootScope.$broadcast('enrollmentMemberRosterIsOpen');
        event.stopPropagation();
      }
      if (vm.rosterPanelShowed === true) {
        vm.arrowIcon = "keyboard_arrow_up";
      } else {
        vm.arrowIcon = "keyboard_arrow_down";
      }
    };
  }
]);

angular.module('enrollment').controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, items, FSAService) {
  $scope.items = items;
  $scope.FSAHistory = FSAService.FSAHistory;
  $scope.FSAHistory[0].firstline = true;

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
