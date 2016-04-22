angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};
  $scope.nome = "Dayvson";
  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('ExercisesCtrl', function($scope) {
  $scope.exercises = [
    { title: 'Exercicio 1', id: 1, isChecked: false },
    { title: 'Exercicio 2', id: 2, isChecked: false },
    { title: 'Exercicio 3', id: 3, isChecked: false },
    { title: 'Exercicio 4', id: 4, isChecked: false },
    { title: 'Exercicio 5', id: 5, isChecked: false },
    { title: 'Exercicio 6', id: 6, isChecked: true }
  ];

  $scope.tab = "todo";

  $scope.changeTab = function(tab){
    $scope.tab = tab;
  }


  $scope.move = function(index){
    console.log($scope.exercises[index]);
  }
})

.filter('sortWithTab', function(){
  return function(list, tab) {

    var filtered;
    var i;

    if (tab == 'all') {

      return list;

    } else if (tab == 'todo') {

      filtered = [];
      for (i = 0; i < list.length; i++) {
        if (!list[i].isChecked)
          filtered.push(list[i]);
      }
      return filtered;

    } else if (tab == 'done') {

      filtered = [];
      for (i = 0; i < list.length; i++) {
        if (list[i].isChecked)
          filtered.push(list[i]);
      }
      return filtered;

    } else {

      return list;

    }
  }
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});