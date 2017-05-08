// uncomment below for logging
describe('directive search', function () {
  var el;
  beforeEach(module('app'));
  beforeEach(inject(function ($compile, $rootScope) {
    el = angular.element('<member-search></member-search>');
    $compile(el)($rootScope.$new());
    $rootScope.$digest();
  }));

});
//unit test for clear search controller
describe('my_listing_products_list controller', function () {
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ctrl = $controller("my_listing_products_list", {$scope: scope});
  }));

})
describe('search controller', function () {
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ctrl = $controller("SearchController", {$scope: scope});
  }));
});
