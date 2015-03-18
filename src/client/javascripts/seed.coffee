"use strict"

app = angular.module('seedApp',[
  'ngHoverMultiple'
  ])

app.controller("SeedController",[
  "$scope"
  ($scope)->
    $scope.body = "Hello World"
    $scope.message = "Click to Edit"

    $scope.select = [
      {
        name: "ほげほげ"
        value: 0
      }
      {
        name: "ふがふが"
        value: 1
      }
      {
        name: "ぴよぴよ"
        value: 2
      }
    ]
    $scope.output = []

    $scope.destroy = (index)->
      $scope.select.splice(index,1)

    $scope.hoge = ()->
      $scope.select = [
        {
          name: "fizz"
          value: 0
        }
        {
          name: "buzz"
          value: 1
        }
      ]
  ])
