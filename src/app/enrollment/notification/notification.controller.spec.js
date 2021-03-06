(function () {
  describe('NotificationController tests', function () {
    var $scope, $window, vm;
    beforeEach(module('app'));
    beforeEach(function () {
      // define fake instance for $window
      module(function ($provide) {
        $window = {
          onclick: function () {
            vm.isVisible = false
          }, attachEvent: function (onstorage, wrap) {
          }
        };
        $provide.value('$window', $window)
      });
    });
    beforeEach(inject(function ($compile, $rootScope) {
      $scope = $rootScope.$new();
      $rootScope.$digest();
    }));

    it('should cover the Notification', inject(function ($controller) {
      vm = $controller('NotificationController', {
        $scope: $scope,

      });
      vm.notificationData = {
        "memberKey": {
          "contractID": "R99990006",
          "memberID": 800100004
        },
        "totalAlertCount": 6,
        "alert": [{
          "alertType": "ALTERNATE_ADDRESS_UPDATED",
          "headline": "Please verify your updated alternate address",
          "description": "Address Information has been updated.",
          "message": "Our records show that you recently updated your alternate address. Please verify that this change is correct",
          "category": "CTA",
          "url": "http://custserv10.fepblue.org/fepesvc/addressChange.do?addressType=Alternate",
          "urlLinkText": "Verify Address",
          "status": "READ",
          "timestamp": "2016-07-05T09:40:09.727-04:00",
          "id": "16664b6e-299f-4e00-a580-c13223acc341"
        }, {
          "alertType": "CONTRACT_ADDRESS_UPDATED",
          "headline": "Please verify your updated address",
          "description": "Address Information has been updated.",
          "message": "Our records show that you recently updated your contract address. Please verify that this change is correct.",
          "category": "CRITICAL",
          "url": "http://custserv10.fepblue.org/fepesvc/addressChange.do",
          "urlLinkText": "Verify Address",
          "status": "UNREAD",
          "timestamp": "2016-05-31T12:40:12.334-04:00",
          "id": "77acfe38-8346-449c-8315-e69668a108e7"
        }, {
          "alertType": "LETTER_REQUEST_ENROLLMENT_INFO",
          "headline": "Please verify your enrollment information",
          "description": "Enrollment Information Verification request letter has been generated.",
          "message": "Please confirm that we have your most up-to-date enrollment information to ensure accurate payment of your benefits.",
          "category": "CTA",
          "url": "http://custserv10.fepblue.org/fepesvc/profile.do",
          "urlLinkText": "Verify Enrollment Information",
          "status": "UNREAD",
          "timestamp": "2015-02-24T10:11:56.437-05:00",
          "eventTypeCode": "ENRCON",
          "id": "a8925529-a309-4b72-b68b-576c4104a5ce"
        }, {
          "alertType": "LETTER_REQUEST_ENROLLMENT_INFO",
          "headline": "Please verify your enrollment information",
          "description": "Enrollment Information Verification request letter has been generated.",
          "message": "Please confirm that we have your most up-to-date enrollment information to ensure accurate payment of your benefits.",
          "category": "FYI",
          "url": "http://custserv10.fepblue.org/fepesvc/profile.do",
          "urlLinkText": "Verify Enrollment Information",
          "status": "UNREAD",
          "timestamp": "2015-02-20T09:45:53.758-05:00",
          "eventTypeCode": "ENRCON",
          "id": "ff337d9a-822f-4833-a405-533afeffcc4d"
        }, {
          "alertType": "IDCARD_NEW_ENROLLMENT",
          "headline": "Your new member ID card is on its way",
          "description": "New Enrollment ID Card request processed.",
          "message": "Your card has been created and will arrive in the mail in approximately 7 - 10 days.",
          "category": "FYI",
          "url": "N/A",
          "urlLinkText": "N/A",
          "status": "UNREAD",
          "timestamp": "2015-02-24T10:11:56.442-05:00",
          "eventTypeCode": "ID NEW",
          "id": "af0499ac-25fb-48db-a21b-78cf88a6155b"
        }, {
          "alertType": "IDCARD_NEW_ENROLLMENT",
          "headline": "Your new member ID card is on its way",
          "description": "New Enrollment ID Card request processed.",
          "message": "Your card has been created and will arrive in the mail in approximately 7 - 10 days.",
          "category": "CRITICAL",
          "url": "N/A",
          "urlLinkText": "N/A",
          "status": "UNREAD",
          "timestamp": "2015-02-20T09:45:53.759-05:00",
          "eventTypeCode": "ID NEW",
          "id": "545c364c-213f-4d81-8481-9b9f08f6f4e5"
        }]
      }
      vm.getNotificationData();
      vm.sortNotification();
      vm.toggle();

      event = jasmine.createSpyObj('event', ['preventDefault', 'stopPropagation']);
      vm.hideEnrollment(event);

      $scope.$broadcast('enrollmentMemberRosterIsOpen');
      $scope.$broadcast('searchBarIsOpen');
      $scope.$broadcast('fillNotificationInfo');
      $scope.$broadcast('privacyIsOpen');


    }))
  })
})();
