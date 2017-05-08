/**
 * Enrollment Filter
 * Author: Lu Zhang
 */
(function () {
  'use strict';
  // var $log = angular.injector(['ng']).get('$log');
  angular.module('enrollment').filter('camelCase', [function () {
    return function (input) {
      input = input || '';
      return input.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
    };
  }
  ]).filter('tel', [function () {
    return function (tel) {
      if (!tel) {
        return '';
      }
      var value = tel.toString().trim().replace(/^\+/, '');
      if (value.match(/[^0-9]/)) {
        return tel;
      }
      var country,
        city,
        number;
      switch (value.length) {
        case 10: // +1PPP####### -> C (PPP) ###-####
          country = 1;
          city = value.slice(0, 3);
          number = value.slice(3);
          break;
        case 11: // +CPPP####### -> CCC (PP) ###-####
          country = value[0];
          city = value.slice(1, 4);
          number = value.slice(4);
          break;
        case 12: // +CCCPP####### -> CCC (PP) ###-####
          country = value.slice(0, 3);
          city = value.slice(3, 5);
          number = value.slice(5);
          break;
        default:
          return tel;
      }
      if (country == 1) {
        country = "";
      }
      number = number.slice(0, 3) + '-' + number.slice(3);
      return (country + " (" + city + ") " + number).trim();
    };
  }
  ]).filter("ssn", [function () {
    return function (value) {
      value = value.toString();
      if (value) {
        if (value.length >= 9) {
          return value.substr(0, 3) + "-" + value.substr(3, 2) + "-" + value.substr(5);
        } else if (value.length >= 5) {
          return value.substr(0, 3) + "-" + value.substr(3, 2) + "-" + value.substr(5);
        } else if (value.length > 3) {
          return value.substr(0, 3) + "-" + value.substr(3);
        }
      }
      return value;
    };
  }
  ]).filter("zipcode", [function () {
    return function (zipcode) {
      zipcode = zipcode || '';
      zipcode = zipcode + "";
      if (zipcode.length >= 9) {
        return zipcode.substr(0, 5) + "-" + zipcode.substr(5);
      } else if (zipcode == undefined) {
        return null;
      } else {
        return zipcode;
      }
    };
  }
  ]).filter("prependZeroFixedLen", [function () { //Filter to prepend zeros for the length provided
    return function (value, length) {
      var numValue = parseInt(value, 10);
      length = parseInt(length, 10);
      if (isNaN(numValue) || isNaN(length)) {
        return value;
      }
      numValue = '' + numValue;
      while (numValue.length < length) {
        numValue = '0' + numValue;
      }
      return numValue;
    }
  }
  ]).filter("formatContractId", function ($filter) { //Filter to prepend zeros for the length provided
    return function (value) {
      if (angular.isDefined(value)) {
        return 'R' + $filter('prependZeroFixedLen')(value, 8);
      }
      return value;
    }
  }).filter("bracketUppercase", [function () {
    return function (str) {
      if (angular.isDefined(str)) {
        if (str.indexOf("(") != -1) {
          var n = str.indexOf('(') + 1;
          var m = str.indexOf(')');
          var temp = str.substring(n, m);
          return str.replace(temp, temp.toUpperCase());
        }
      }
      return str;
    }
  }
  ]).filter("alternateMonthYear", function ($filter) { // Filter to show the Month and Year for alternate begin and end dates
    return function (value) {
      if (angular.isDefined(value)) {
        var month, year;
        switch (value.length) {
          case 6 :
            month = value.slice(0, 2);
            year = value.slice(2);
            value = $filter('date')(new Date(year, parseInt(month) - 1), 'MMMM yyyy');
            break;
          case 2 :
            value = $filter('date')(new Date(new Date().getFullYear(), parseInt(value) - 1), 'MMMM');
            break;
        }
      }
      return value;
    }
  }).filter("memberTypeDescription", [function () { // Filter to show the description for Member Type
    return function (value) {
      if (angular.isDefined(value)) {
        switch (value) {
          case "C" :
            return "Contract Holder"
            break;
          case "D" :
            return "Dependent"
            break;
        }
      }
      return value;
    }
  }]).filter("planPhoneTypeDescription", [function () { // Filter to show the description for Member Type
    return function (value) {
      if (angular.isDefined(value)) {
        switch (value) {
          case "CL" :
            return "Customer Service (Local)"
            break;
          case "CT" :
            return "Customer Service (Toll Free)"
            break;
        }
      }
      return value;
    }
  }])
    .filter("relationshipDescription", [function () { // Filter to show the description for Relationship
      return function (value) {
        if (angular.isDefined(value)) {
          switch (value) {
            case "O" :
              return "Original Contract Holder"
              break;
            case "S" :
              return "Spouse"
              break;
            case "C" :
              return "Child"
              break;
          }
        }
        return value;
      }
    }]);
})();
