'use strict';
/**
 * @ngdoc function
 * @name heidaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the heidaApp
 */

angular.module('heidaApp')
  .controller('GroupCtrl', function($scope, $http, Restangular) {
    Restangular.all('/api/group').getList().then(function(groups) {
      $scope.groups = groups;
    });

  }).controller('GroupEditCtrl', function($scope, $http, Restangular, $state, $stateParams) {

    Restangular.all('/api/group').getList().then(function(groups) {
      $scope.groups = groups;
    });

    Restangular.one('/api/group', $stateParams.id).get().then(function(group) {
      $scope.group = group;
    });
    $scope.update = function() {
      $scope.group.save();
      $state.go('dashboard.groups', $stateParams, {
        reload: true,
        inherit: true
      });
    }
  }).controller('GroupNewCtrl', function($scope, $http, Restangular, $state, $stateParams) {

    Restangular.all('/api/group').getList().then(function(groups) {
      $scope.groups = groups;
    });
    $scope.save = function(group) {

      $scope.groups.post(group);
      $state.go('dashboard.groups', $stateParams, {
        reload: true,
        inherit: true
      });
    }
  });
