(function () {
  describe('WellnesscardController tests', function () {
    var $scope, vm;
    var $q;
    var deferred;

    beforeEach(module('app'));
    beforeEach(inject(function ($compile, _$rootScope_, _$q_, wellnesscardService, $controller) {
      $q = _$q_;
      $scope = _$rootScope_.$new();
      deferred = _$q_.defer();

      spyOn(wellnesscardService, 'getWellnessCard').and.returnValue(deferred.promise);

      vm = $controller('WellnesscardController', {
        $scope: $scope,
        wellnesscardService: wellnesscardService,
        enrollmentService: {currentMemberID: 'R44444444', currentContractID: 'R44444444'}
      });
    }));
    it('should cover the Wellnesscard', function () {
      vm.getWellnessCardData();
      vm.toggle();
      $scope.$broadcast('getWellnessCardData');
    })

    it('should resolve promise', function () {
      // Setup the data we wish to return for the .then function in the controller
      deferred.resolve({"memberID": 4926176, "contractID": "R50922070", "incentiveBalance": 0.0000});

      // We have to call apply for this to work
      $scope.$apply();
    });

  })
})();
