'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute'
]).
controller('MainController', function($scope, $http, $timeout, $interval) {
    var scope = $scope;
    var vm = this;
    $scope.endpoint = {};
    scope.currentChart = '';
    scope.chartval = 45;
    scope.butVal = 0;
    scope.buttonArr = [];
    scope.comboList = [];
    scope.chartIndex = 1;
    var newVal = 0;
    var keyy = 'keyy';
    var ind = 'ind';
    var label = 'label';
    var targeting = 'targeting';
    $scope.txt1 = 'with One set of controls';
    $scope.selectedvalues = 'Empty';
    scope.limit = 0;
    $scope.selitem = {};

    $scope.setCharts = function() {
        var arrChrt = $scope.endpoint.bars;
        $scope.limit = $scope.endpoint.limit;
        scope.comboList = [];
        scope.chartIndex = 1;
        scope.currentChart = 'chart_0';
        var comboTxt = '#progress';

        for (var j = 0; j < arrChrt.length; j++) {
            var objC = {};
            objC[ind] = j;
            objC[targeting] = 'chart_' + j;
            objC[keyy] = arrChrt[j];
            objC[label] = comboTxt + scope.chartIndex;
            scope.comboList.push(objC);
            scope.chartIndex += 1;
        }

        $scope.selitem = scope.comboList[0];

    };

    $scope.setButtons = function() {
        var arrBut = $scope.endpoint.buttons;
        scope.buttonArr = [];
        for (var i = 0; i < arrBut.length; i++) {
            var obj = {};
            obj[keyy] = arrBut[i];
            scope.buttonArr.push(obj);
        }

    };

    $scope.getData = function() {
        var urll = './dataa/endpoint.json';
        $http.get(urll)
            .success(function(response) {
                $scope.endpoint = response;
                $scope.setButtons();
                $scope.setCharts();

                var commb = scope.comboList;
                for (var j = 0; j < commb.length; j++) {
                    var targ = commb[j].targeting;
                    var widtth = commb[j].keyy;
                    var widtthPerc = commb[j].keyy + '%';

                    var elemBar = angular.element(document.querySelector('#' + targ));
                    elemBar.css('width', widtthPerc);
                }

                var eleSel = angular.element(document.querySelector('#selectComboList'));
                eleSel.selectedIndex = 0;

            });
    };

    $scope.isClicked = function(evt, ind) {
        scope.butVal = scope.buttonArr[ind].keyy;

        var index = ind;
        var targ = scope.currentChart;
        var limit = scope.limit;

        for (var i = 0; i < scope.comboList.length; i++) {
            if (scope.comboList[i].targeting === targ) {

                newVal = scope.comboList[i].keyy + scope.butVal;

                var elemBar = angular.element(document.querySelector('#' + targ));
                var widtth;
                var widtthPerc = widtth + '%';
                if ((newVal >= 1) && (newVal <= 99)) {
                    scope.comboList[i].keyy += scope.butVal;
                    widtth = scope.comboList[i].keyy;
                    widtthPerc = widtth + '%';
                    elemBar.css('width', widtthPerc);
                    elemBar.css('background-color', '#4CAF50');
                } else if ((newVal >= 100) && (newVal <= limit)) {
                    scope.comboList[i].keyy += scope.butVal;
                    elemBar.css('width', '100%');
                    elemBar.css('background-color', 'red');
                } else if (newVal <= 0) {
                    elemBar.css('background-color', '#4CAF50');
                }

                //console.log('Charts comboList Array ' + angular.toJson(scope.comboList));
                //console.log('scope.limit: ' + scope.limit);

            }

        }



    };

    $scope.changedValue = function() {
        scope.currentChart = $scope.selitem.targeting;
        scope.chartval = $scope.selitem.keyy;
    };

    $timeout($scope.getData, 500);

    // this.interval = $interval(function () {
    //   var urll = './dataa/endpoint.json';
    //   $http.get(urll)
    //     .success(function (response) {
    //       $scope.endpoint = response;
    //       $scope.setButtons();

    //     });
    // }, 1000);

}).
directive('progDirective', function($compile) {
    return {
        restrict: 'AE',
        transclude: 'true',
        scope: {
            chartval: '@',
            ind: '@',
            data: '=',
            val: '='
        },
        controller: 'MainController',
        controllerAs: 'm1Ctr',
        templateUrl: './templates/progbar.html',
        link: function(scope, element, attrs) {

        }
    };
}).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {

}]);