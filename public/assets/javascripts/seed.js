(function() {
  "use strict";
  var app;

  app = angular.module('seedApp', ['ngHoverMultiple']);

  app.controller("SeedController", [
    "$scope", function($scope) {
      $scope.body = "Hello World";
      $scope.message = "Click to Edit";
      $scope.select = [
        {
          name: "ほげほげ",
          value: 0
        }, {
          name: "ふがふが",
          value: 1
        }, {
          name: "ぴよぴよ",
          value: 2
        }
      ];
      $scope.output = [];
      $scope.destroy = function(index) {
        return $scope.select.splice(index, 1);
      };
      return $scope.hoge = function() {
        return $scope.select = [
          {
            name: "fizz",
            value: 0
          }, {
            name: "buzz",
            value: 1
          }
        ];
      };
    }
  ]);

}).call(this);
