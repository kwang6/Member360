// 'use strict';
//
// angular.module('breadcrumb', []);
//
// angular.module('breadcrumb')
// 	.factory('breadcrumbService', function($http) {
// 		return {
// 			getName: function() {
// 				return $http.get('app/components/breadcrumb/test.json')
// 					.then(function(result) {
// 						return result.data;
// 					});
// 			}
// 		}
// 	});

'use strict';

angular.module('breadcrumb', []);

angular.module('breadcrumb')
  .factory('breadcrumbService', ['$http', function ($http) {
    return {
      getName: function () {
        return $http.get('app/components/breadcrumb/test.json')
          .then(function (result) {
            return result.data;
          });
      }
    }
  }]);
