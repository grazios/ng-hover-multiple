(function() {
  "use strict";
  var multipleApp;

  multipleApp = angular.module('ngHoverMultiple', ["template/nghm-message.html"]);

  multipleApp.controller("NgHoverMultipleController", [
    "$scope", "$timeout", function($scope, $timeout) {
      var update;
      $scope.outputObjects = {};
      $scope.isOpen = false;
      $scope.console = {
        top: 0,
        left: 0,
        opacity: 100
      };
      $scope.openConsole = function($event) {
        $scope.console.left = $event.layerX;
        $scope.console.top = $event.layerY;
        return $scope.isOpen = true;
      };
      $scope.closeConsole = function() {
        $scope.console.opacity = 0;
        return $timeout(function() {
          $scope.isOpen = false;
          return $scope.console.opacity = 100;
        }, 200);
      };
      $scope.clickLabel = function(index) {
        if (($scope.outputObjects[$scope.input[index].$$hashKey] != null)) {
          delete $scope.outputObjects[$scope.input[index].$$hashKey];
        } else {
          $scope.outputObjects[$scope.input[index].$$hashKey] = index;
        }
        return update();
      };
      $scope.$watchCollection(function() {
        return $scope.input;
      }, function(newVal) {
        var tmpOutputIndex;
        tmpOutputIndex = {};
        angular.copy($scope.outputObjects, tmpOutputIndex);
        $scope.outputObjects = {};
        angular.forEach(newVal, function(val, index) {
          if ((tmpOutputIndex[newVal[index].$$hashKey] != null)) {
            return $scope.outputObjects[newVal[index].$$hashKey] = index;
          }
        });
        return update();
      });
      return update = function() {
        var indexes;
        indexes = [];
        angular.forEach($scope.outputObjects, function(value) {
          return indexes.push(value);
        });
        indexes.sort();
        $scope.output = [];
        return angular.forEach(indexes, function(i) {
          return $scope.output.push($scope.input[i].value);
        });
      };
    }
  ]);

  multipleApp.directive("ngHoverMultiple", function() {
    return {
      restrict: 'A',
      scope: {
        message: "=",
        input: "=",
        output: "=",
        label: "@?",
        value: "@?",
        target: "@?"
      },
      controller: 'NgHoverMultipleController',
      templateUrl: 'template/nghm-message.html',
      transclude: true,
      link: function(scope, element, attr, controller) {
        scope.label = scope.label || "label";
        scope.target = scope.target || "object";
        return element.addClass("nghm_element");
      }
    };
  });

  angular.module("template/nghm-message.html", []).run([
    "$templateCache", function($templateCache) {
      return $templateCache.put("template/nghm-message.html", "<div class=\"nghm_transclude\" ng-transclude></div>\n<div class=\"nghm_multiple_wrap\">\n  <p class=\"nghm_message_wrap\" ng-click=\"openConsole($event)\">\n    {{ message }}\n  </p>\n  <ul style=\"opacity:{{console.opacity}};top:{{console.top}}px;left:{{console.left}}px;\" class=\"nghm_console_wrap\" ng-show=\"isOpen\" ng-mouseleave=\"closeConsole()\">\n    <li ng-repeat=\"opt in input\">\n      <input type=\"checkbox\" id=\"nshm_{{$id}}\" value=\"{{opt[value]}}\">\n      <label for=\"nshm_{{$id}}\" ng-click=\"clickLabel($index)\">{{opt[label]}}</label>\n    </li>\n  </ul>\n</div>");
    }
  ]);

}).call(this);
