(function () {
  describe('DashboardController tests', function () {
    var testController;
    var $scope;
    beforeEach(module('app'));
    beforeEach(inject(function ($compile, $rootScope) {
      $scope = $rootScope.$new();
      $rootScope.$digest();
    }));
    it('should cover the Dashboard', inject(function ($controller) {
      testController = $controller('DashboardController', {
        $scope: $scope
      });


    }))
  })
})();
