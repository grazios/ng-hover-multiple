"use strict"


multipleApp = angular.module('ngHoverMultiple',[
  "template/nghm-message.html"
  ])
multipleApp.controller "NgHoverMultipleController",[
  "$scope"
  "$timeout"
  ($scope,$timeout)->

    #outputの内容をSortするために使う
    $scope.outputObjects = {}
    $scope.isOpen = false
    #consoleのDefault位置
    $scope.console = {
      top: 0
      left: 0
      opacity: 100
    }
    # コンソールを開く.
    # コンソールをClickされた位置に開く
    $scope.openConsole = ($event)->
      $scope.console.left = $event.layerX
      $scope.console.top = $event.layerY
      $scope.isOpen = true

    # コンソールを閉じる.
    # fadeoutのタイミングに合わせてngShowをfalseにする
    $scope.closeConsole = ()->
      $scope.console.opacity = 0
      $timeout(()->
        $scope.isOpen = false
        $scope.console.opacity = 100
      ,200)

    # labelをクリックした時
    $scope.clickLabel = (index)->
      # ClickされたオブジェクトがOutputが存在するか確認する
      if($scope.outputObjects[$scope.input[index].$$hashKey]?)
        delete $scope.outputObjects[$scope.input[index].$$hashKey]
      else
        $scope.outputObjects[$scope.input[index].$$hashKey] = index

      update()



    #対象のオブジェクトが配列から消えた場合に備える
    $scope.$watchCollection(()->
      $scope.input
    ,(newVal)->
      tmpOutputIndex = {}
      angular.copy $scope.outputObjects,tmpOutputIndex

      $scope.outputObjects = {}
      angular.forEach(newVal,(val,index)->
        if(tmpOutputIndex[newVal[index].$$hashKey]?)
          $scope.outputObjects[newVal[index].$$hashKey] = index
      )
      update()
    )

    update = ()->
      #選択結果を配列にし、ソートする
      indexes = []
      angular.forEach $scope.outputObjects,(value)->
        indexes.push(value)
      indexes.sort()

      $scope.output = []
      angular.forEach indexes,(i)->
        $scope.output.push($scope.input[i].value)

]

multipleApp.directive("ngHoverMultiple",()->
  {
    restrict: 'A'
    scope:{
      message: "="
      input: "="
      output: "="

      label: "@?"
      value: "@?"

      target: "@?"
    }
    controller: 'NgHoverMultipleController'
    templateUrl: 'template/nghm-message.html'
    transclude: true
    link: (scope, element, attr, controller)->
      scope.label = scope.label || "label"
      scope.target = scope.target || "object"
      element.addClass("nghm_element")


  }
)


angular.module("template/nghm-message.html", []).run [
  "$templateCache"
  ($templateCache)->
    $templateCache.put("template/nghm-message.html",
    """
      <div class="nghm_transclude" ng-transclude></div>
      <div class="nghm_multiple_wrap">
        <p class="nghm_message_wrap" ng-click="openConsole($event)">
          {{ message }}
        </p>
        <ul style="opacity:{{console.opacity}};top:{{console.top}}px;left:{{console.left}}px;" class="nghm_console_wrap" ng-show="isOpen" ng-mouseleave="closeConsole()">
          <li ng-repeat="opt in input">
            <input type="checkbox" id="nshm_{{$id}}" value="{{opt[value]}}">
            <label for="nshm_{{$id}}" ng-click="clickLabel($index)">{{opt[label]}}</label>
          </li>
        </ul>
      </div>
    """
    )
]
