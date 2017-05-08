/**
 * Created by Kai Wang on 2016/9/14.
 */
(function() {
  describe('IdleController tests',function(){
    var testController;
    var $scope;
    beforeEach(module('app'));
    beforeEach(inject(function($compile, $rootScope) {
      $scope = $rootScope.$new();
      $rootScope.$digest();
    }));
    it('should cover the Idle', inject(function($controller){
      testController = $controller('IdleController',{
        $scope:$scope
      });
      $scope.extendSession();
    }))
  })
})();
