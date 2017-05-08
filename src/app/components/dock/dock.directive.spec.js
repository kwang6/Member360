(function () {
  'use strict';
  describe('directive dock', function () {
    var el;

    beforeEach(module('app'));
    beforeEach(inject(function ($compile, $rootScope) {
      el = angular.element('<member-dock></member-dock>');
      $compile(el)($rootScope.$new());
      $rootScope.$digest();
    }));

    it('should be compiled', function () {
      expect(el.html()).not.toEqual(null);
    });
  });
  describe('DockController tests', function () {
    var vm
    var $scope, state, mockedFactory;

    beforeEach(module('app'), function ($provide) {
      mockedFactory = {
        hasEnrollmentInfo: true
      }
      $provide.value('enrollmentService', mockedFactory);
    });
    beforeEach(inject(function ($compile, $rootScope) {
      el = angular.element('<member-dock></member-dock>');
      $scope = $rootScope.$new();
      $compile(el)($rootScope.$new());
      $rootScope.$digest();
    }));
    it('should changing the dashboardLinkActive variable to true', inject(function ($controller) {
      vm = $controller('DockController', {
        $scope: $scope,
        enrollmentService: {hasEnrollmentInfo: true}
      });
      var enrollmentService = {};
      enrollmentService.hasEnrollmentInfo = true;
      vm.dashboardLinkActive = false;
      vm.enrollmentLinkActive = true;
      vm.dashboardLink();
      expect(vm.dashboardLinkActive).toEqual(true);
      expect(vm.enrollmentLinkActive).toEqual(false);

      vm.enrollmentLinkActive = false;

      vm.enrollmentLink();
      expect(vm.dashboardLinkActive).toEqual(false);
      expect(vm.enrollmentLinkActive).toEqual(true);
      $scope.$broadcast('broadcastSearchContent');
      $scope.$broadcast('broadcastSearchFail');
    }))
  })
})();
