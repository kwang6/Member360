(function () {
  'use strict';
  describe('directive breadcrumb', function () {
    var el;
    beforeEach(module('app'));
    beforeEach(inject(function ($compile, $rootScope) {
      el = angular.element('<member-breadcrumb></member-breadcrumb>');
      $compile(el)($rootScope.$new());
      $rootScope.$digest();
    }));

    it('should be compiled', function () {
      expect(el.html()).not.toEqual(null);
    });
  });
  describe('BreadcrumbController tests', function () {
    var testController
    var $scope, location;
    var currentBreadCrumb;
    beforeEach(module('app'));
    beforeEach(inject(function ($compile, $rootScope, $location) {
      el = angular.element('<member-breadcrumb></member-breadcrumb>');
      $scope = $rootScope.$new();
      $compile(el)($rootScope.$new());
      $rootScope.$digest();
      location = $location;
      currentBreadCrumb = '/';
    }));
    it('should changing the isVisible variable to true', inject(function ($controller) {
      testController = $controller('BreadcrumbController', {});
      testController.breadCrumb = currentBreadCrumb;
      testController.isVisible = false;
      testController.toggle();
      expect(testController.isVisible).toEqual(true);
      testController.breadCrumbDisplay();
      expect(currentBreadCrumb.charAt(0)).toEqual('/');
      expect(currentBreadCrumb).toEqual('/');
      expect(testController.breadCrumb).toEqual(currentBreadCrumb);
    }))
  })
})();
