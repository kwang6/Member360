/**
 * Created by Kai Wang on 2016/8/2.
 */
(function () {
  describe('WellnesstableController tests', function () {
    var testController;
    var $scope, vm;
    beforeEach(module('app'));
    beforeEach(inject(function ($compile, $rootScope) {
      $scope = $rootScope.$new();
      $rootScope.$digest();
    }));
    it('should cover the Wellnesstable', inject(function ($controller) {
      vm = $controller('WellnesstableController', {
        $scope: $scope
      });
      vm.getWellnesstableData();
      $scope.$broadcast('getWellnesstableData');
    }))
  })
})();
