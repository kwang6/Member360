(function () {
  describe('directive navbar', function () {
    var el;

    beforeEach(module('app'));
    beforeEach(inject(function ($compile, $rootScope, $window) {
      el = angular.element('<member-navbar></member-navbar>');
      $compile(el)($rootScope.$new());
      $rootScope.$digest();
    }));
  });
  describe('NavbarController tests', function () {
    var testController;
    var $scope;
    var items;
    beforeEach(module('app'));
    beforeEach(inject(function ($compile, $rootScope) {
      el = angular.element('<member-breadcrumb></member-breadcrumb>');
      $scope = $rootScope.$new();
      $compile(el)($rootScope.$new());
      $rootScope.$digest();
    }));
    it('should cover the Navbar', inject(function ($controller) {
      testController = $controller('NavbarController', {
        $scope: $scope
      });
      $scope.$broadcast('$viewContentLoaded');
      $scope.$broadcast('$destroy');

      testController.load_materialjs();

      $scope.logoutDialog();

    }))
    it('should cover the modal component', inject(function ($controller) {
      testController = $controller('ModalInstanceLogout', {
        $scope: $scope,
        items: items,
        $uibModalInstance: {
          dismiss: function () {

          }
        }
      });

      $scope.cancel();


    }))
  })
})();
