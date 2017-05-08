(function () {
  describe('privacyController tests', function () {
    var $scope, vm, event;
    beforeEach(module('app'));
    beforeEach(inject(function ($compile, $rootScope) {
      $scope = $rootScope.$new();
      $rootScope.$digest();
    }));
    it('should cover the privacy', inject(function ($controller) {
      vm = $controller('privacyController', {
        $scope: $scope
      });
      event = jasmine.createSpyObj('event', ['preventDefault', 'stopPropagation']);
      vm.hideEnrollment(event);
      vm.isVisible = true;
      vm.toggle();
      vm.isVisible = false;
      vm.toggle();
      $scope.$broadcast('enrollmentMemberRosterIsOpen');
      $scope.$broadcast('notificationIsOpen');
      $scope.$broadcast('searchBarIsOpen');
      $scope.$broadcast('fillPrivacyInfo');

    }))
  })
})();
