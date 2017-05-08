'use strict';
describe('controllers', function () {
  var vm;
  beforeEach(module('app'));
  // it('should have contract summary', function() {
  // 	expect(vm.contractHolderSummary).toEqual(jasmine.any(Number));
  // });
  //Unit Test to verify the FSA Service
  describe("Services", function () {
    describe("privacy Service:", function () {
      beforeEach(function () {
        angular.module('app');
      });
    });
  });
  describe('EnrollmentController tests', function () {
    var vm;
    var $scope, items, event;
    beforeEach(module('app'));
    beforeEach(inject(function ($compile, $rootScope) {
      $scope = $rootScope.$new();
      $rootScope.$digest();
    }));
    it('should cover the Idle', inject(function ($controller) {
      vm = $controller('EnrollmentController', {
        $scope: $scope
      });
      vm.contractSummary = {
        "contractID": "99990006",
        "payrollOfficeInfo": {"payrollOfficeId": 12400001},
        "enrollmentInfo": {
          "effectiveDate": "2012-01-01T00:00:00.000-0500",
          "enrollmentCode": "112",
          "enrollmentStatus": "CURRENT",
          "employmentStatus": "1",
          "lastProcDate": "2012-04-24T00:00:00.000-0400",
          "prevGainCarrier": "   ",
          "eventCode": "99",
          "transactionCode": "11"
        },
        "planInfo": [
          {
            "planCode": "080",
            "planName": "Blue Cross & Blue Shield of Western New York",
            "planPhoneInfo": [
              {
                "planContactType": "CL",
                "planContactNbr": "2024841650"
              },
              {
                "planContactType": "CT",
                "planContactNbr": "8008489766"
              },
              {
                "planContactType": "MT",
                "planContactNbr": "8003596671"
              },
              {
                "planContactType": "PT",
                "planContactNbr": "8667732884"
              }
            ]
          }
        ],
        "contacts": [
          {
            "contactType": "W",
            "detail": "3453453456"
          },
          {
            "contactType": "A",
            "detail": "2223334445"
          },
          {
            "contactType": "H",
            "detail": "2342342345"
          }
        ],
        "addresses": [
          {
            "addressType": "A",
            "alternateBeginMonthYear": "062016",
            "alternateEndMonthYear": "072016",
            "street1": "111 MAIN ST",
            "street2": "APT 101",
            "city": "FAIRFAX",
            "state": "VA",
            "zipCode": "22030",
            "countryName": "UNITED STATES",
            "badAddressIndicator": "N"
          },
          {
            "addressType": "C",
            "street1": "1245 TURKEY ROAD",
            "street2": "SUITE 101",
            "city": "WASHINGTON",
            "state": "DC",
            "zipCode": "20020",
            "countryName": "UNITED STATES",
            "badAddressIndicator": "N"
          }
        ],
        "members": [
          {
            "memberID": 800100004,
            "firstName": "ROGER",
            "middleName": "A",
            "lastName": "DENNY",
            "dateOfBirth": "1972-01-01T00:00:00.000-0500",
            "gender": "M",
            "relationship": "O",
            "memberType": "C",
            "effectiveCode": "NEW",
            "memberEnrollmentEffectiveDate": "2012-01-01T00:00:00.000-0500",
            "ssn": "227145627",
            "hasPrivacy": false,
            "contacts": [
              {
                "contactType": "E",
                "detail": "contractholder.test@test.orgkkkk  kkkkkkkkkkkkk"
              },
              {
                "contactType": "M",
                "detail": "4445556666"
              },
              {
                "contactType": "N",
                "detail": "5556667777"
              },
              {
                "contactType": "W",
                "detail": "3453453456"
              }
            ],
            "addresses": [{
              "addressType": "M",
              "street1": "123 MAIN ST",
              "city": "FAIRFAX",
              "state": "VA",
              "zipCode": "22030",
              "countryName": "UNITED STATES",
              "badAddressIndicator": "N"
            }],
            "myBlueRegistrationInfo": {
              "isAccountConfirmed": true,
              "registrationEmailAddress": "nagarajan.natarajan@fepoc.com"
            }
          },

          {
            "memberID": 800101234,
            "firstName": "ROGER",
            "middleName": "A",
            "lastName": "DENNY",
            "dateOfBirth": "1972-01-01T00:00:00.000-0500",
            "gender": "M",
            "relationship": "",
            "memberType": "",
            "effectiveCode": "NEW",
            "memberEnrollmentEffectiveDate": "2012-01-01T00:00:00.000-0500",
            "ssn": "227145627",
            "hasPrivacy": false,
            "contacts": [
              {
                "contactType": "E",
                "detail": "contractholder.test@test.orgkkkk  kkkkkkkkkkkkk"
              },
              {
                "contactType": "M",
                "detail": "4445556666"
              },
              {
                "contactType": "N",
                "detail": "5556667777"
              },
              {
                "contactType": "W",
                "detail": "3453453456"
              }
            ],
            "myBlueRegistrationInfo": {
              "isAccountConfirmed": true,
              "registrationEmailAddress": "nagarajan.natarajan@fepoc.com"
            }
          },
          {
            "memberID": 800100001,
            "firstName": "SPOUSEOF",
            "middleName": "B",
            "lastName": "DENNY",
            "dateOfBirth": "1973-01-01T00:00:00.000-0500",
            "gender": "F",
            "relationship": "S",
            "memberType": "D",
            "effectiveCode": "NEW",
            "memberEnrollmentEffectiveDate": "2012-01-01T00:00:00.000-0500",
            "hasPrivacy": false,
            "contacts": [
              {
                "contactType": "E",
                "detail": "spouse.test@test.org"
              },
              {
                "contactType": "H",
                "detail": "7777777777"
              },
              {
                "contactType": "M",
                "detail": "9999999999"
              },
              {
                "contactType": "N",
                "detail": "9999999999"
              },
              {
                "contactType": "W",
                "detail": "8888888888"
              }
            ],
            "addresses": [{
              "addressType": "M",
              "street1": "123 MAIN ST",
              "city": "FAIRFAX",
              "state": "VA",
              "zipCode": "22030",
              "countryName": "UNITED STATES",
              "badAddressIndicator": "N"
            }],
            "myBlueRegistrationInfo": {
              "isAccountConfirmed": true,
              "registrationEmailAddress": "nagarajan.natarajan@fepoc.com"
            }
          },
          {
            "memberID": 800100003,
            "firstName": "CHILDMA",
            "middleName": "C",
            "lastName": "DENNY",
            "dateOfBirth": "1994-01-01T00:00:00.000-0500",
            "gender": "F",
            "relationship": "C",
            "memberType": "D",
            "effectiveCode": "NEW",
            "memberEnrollmentEffectiveDate": "2012-01-01T00:00:00.000-0500",
            "memberEnrollmentTerminationDate": "2020-01-01T00:00:00.000-0500",
            "terminationCode": "O26",
            "hasPrivacy": false
          },
          {
            "memberID": 800091942,
            "firstName": "MINCHILDMA",
            "middleName": "D",
            "lastName": "DENNY",
            "dateOfBirth": "2000-01-01T00:00:00.000-0500",
            "gender": "Fm",
            "relationship": "C",
            "memberType": "D",
            "effectiveCode": "NEW",
            "memberEnrollmentEffectiveDate": "2012-01-01T00:00:00.000-0500",
            "memberEnrollmentTerminationDate": "2026-01-01T00:00:00.000-0500",
            "terminationCode": "O26",
            "hasPrivacy": false,
            "contacts": [
              {
                "contactType": "E",
                "detail": "minchildma.denny@abc.com"
              },
              {
                "contactType": "H",
                "detail": "6786786789"
              },
              {
                "contactType": "M",
                "detail": "5555555555"
              },
              {
                "contactType": "N",
                "detail": "6786786789"
              },
              {
                "contactType": "W",
                "detail": "4444444444"
              }
            ],
            "addresses": [{
              "addressType": "M",
              "street1": "123 MAIN ST",
              "street2": "APT 102",
              "city": "FAIRFAX",
              "state": "VA",
              "zipCode": "22030",
              "countryName": "UNITED STATES",
              "badAddressIndicator": "N"
            }]
          }
        ],
        "isAlternateAddressActive": true
      };


      vm.setStateGo();
      $scope.showFSA();
      vm.handleRosterClick();
      $scope.$broadcast('hideWellnessCard');
      $scope.$broadcast('notificationIsOpen');
      $scope.$broadcast('searchBarIsOpen');
      $scope.$broadcast('privacyIsOpen');
      $scope.$broadcast('broadcastSearchContent');
      vm.getContractNumber('E');
      vm.getContractHomeNumber();
      vm.getAddressType("A");
      vm.getWellnessData();
      vm.getMemberContactNumber('E');
      vm.getMember();
      vm.getcontract();

      event = jasmine.createSpyObj('event', ['preventDefault', 'stopPropagation']);
      vm.hideNotification(event);

      vm.currentSearchCriterion = 'SSN';
      vm.setMemberIDforSSN();

      vm.rosterPanelShowed = true;
      vm.handleRosterClick();
      vm.hideNotification(event);

      vm.contractSummary.isAlternateAddressActive = false;
      vm.getContractHomeNumber();

      vm.selectedMember.myBlueRegistrationInfo = false;
      vm.getMemberMyBlueRegister();

      vm.selectedMember.relationship = 'S';
      vm.selectedMember.addresses[0].addressType = 'M';
      vm.getMemberAddress('M');

      vm.addresses = vm.contractSummary.addresses;
      vm.addresses[0].addressType = 'A';
      vm.getAddressType('A');

      vm.selectedMember.relationship = '';
      vm.setSelectedMember(vm.selectedMember);

    }))
    it('should cover the modal component', inject(function ($controller) {
      var testController = $controller('ModalInstanceCtrl', {
        $scope: $scope,
        items: items,
        FSAService: {FSAHistory: [{firstline: true}]},
        $uibModalInstance: {
          dismiss: function () {
          }
        },

      });
      $scope.FSAHistory = {};
      $scope.FSAHistory[0] = {};
      $scope.cancel();


    }))
  })
});
