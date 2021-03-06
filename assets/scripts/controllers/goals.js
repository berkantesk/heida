'use strict';
/**
 * @ngdoc function
 * @name heidaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the heidaApp
 */
angular.module('heidaApp')
  .controller('GoalCtrl', function($scope, $http, Restangular) {
    Restangular.all('/api/goal').getList().then(function(goals) {
      $scope.goals = goals;
    });

  }).controller('GoalEditCtrl', function($scope, $http, Restangular, $state, $stateParams) {

    Restangular.all('/api/goal').getList().then(function(goals) {
      $scope.goals = goals;
    });

    Restangular.one('/api/goal', $stateParams.id).get().then(function(goal) {
      $scope.goal = goal;
    });
    $scope.update = function() {
      $scope.goal.save();
      $state.go('dashboard.goals', $stateParams, {
        reload: true,
        inherit: true
      });
    }
  }).controller('GoalNewCtrl', function($scope, $http, Restangular, $state, $stateParams) {
    Restangular.all('/api/goal').getList().then(function(goals) {
      $scope.goals = goals;
    });
    $scope.save = function(goal) {
      goal.relevancy="Not Relevant";
      $scope.goals.post(goal);
      $state.go('dashboard.goals', $stateParams, {
        reload: true,
        inherit: true
      });
    }
  });
