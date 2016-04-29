angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $ionicPopup, $timeout, $state, $rootScope) {

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

  $scope.novo = function(){
    $state.go('cadastro');
  };

  $scope.createAccount = function(){
    var ref = new Firebase("https://blinding-inferno-9640.firebaseio.com/");

    if(!$scope.loginData.email && !$scope.loginData.password){
      $ionicPopup.alert({
        title: 'Error',
        content: 'Todos os campos precisam ser preenchidos'
      }).then(function(res) {
      });
      return ;
    }

    ref.createUser({
      email: $scope.loginData.email,
      password: $scope.loginData.password
    }, function(error, userData){
      if(error){
          var msg; 
          switch (error.code) {
            case "INVALID_EMAIL":
              msg = "Email inválido";
              break;
            case "INVALID_PASSWORD":
              msg = "A senha inserida é inválida";
              break;
            case "INVALID_USER":
              msg ="Usuário inexistente.";
              break;
            default:
              msg = error;
         }

        $ionicPopup.alert({
          title: 'Error',
          content: msg
        }).then(function(res) {
        });
      }else{
        $ionicPopup.alert({
          title: 'Sucesso',
          content: 'Conta criada com sucesso!'
        }).then(function(res) {
          $state.go("login");
        });
      }
    });
  };

  $scope.login = function() {
    var ref = new Firebase("https://blinding-inferno-9640.firebaseio.com/");

    if(!$scope.loginData.email && !$scope.loginData.password){
      $ionicPopup.alert({
        title: 'Error',
        content: 'Todos os campos precisam ser preenchidos'
      }).then(function(res) {
      });
      return ;
    }

    ref.authWithPassword({
      email: $scope.loginData.email,
      password: $scope.loginData.password
    }, function(error, userData){
      if(error){
          var msg; 
          switch (error.code) {
            case "INVALID_EMAIL":
              msg = "Email inválido";
              break;
            case "INVALID_PASSWORD":
              msg = "A senha inserida é inválida";
              break;
            case "INVALID_USER":
              msg ="Usuário inexistente.";
              break;
            default:
              msg = error;
         }

        $ionicPopup.alert({
          title: 'Error',
          content: msg
        }).then(function(res) {
        });
      }else{
        $rootScope.user = userData;
        $state.go("app.exercises");
      }
    });


  };

  $scope.logout = function(){
    var ref = new Firebase("https://blinding-inferno-9640.firebaseio.com/");
    ref.unauth();
    $state.go("login");
  };

})

.controller('IMCCtrl', function($scope, $ionicPopup, $rootScope){
  
  $scope.valor = 0;
  $scope.imc = {};
  $scope.calcularIMC = function(){
      if($scope.imc.altura && $scope.imc.peso){
        $scope.valor = (parseInt($scope.imc.peso)/((parseInt($scope.imc.altura)/100) * (parseInt($scope.imc.altura)/100))).toFixed(1);
      }else{
        $ionicPopup.alert({
          title: 'Error',
          content: 'Todos os campos precisam ser preenchidos'
        }).then(function(res) {
        });
      }
  };
})

.controller('ExercisesCtrl', function($scope, $ionicPopup, $state, $rootScope) {
  $scope.exercises = [
    { title: 'Exercicio 1', id: 1, isChecked: false },
    { title: 'Exercicio 2', id: 2, isChecked: false },
    { title: 'Exercicio 3', id: 3, isChecked: false },
    { title: 'Exercicio 4', id: 4, isChecked: false },
    { title: 'Exercicio 5', id: 5, isChecked: false },
    { title: 'Exercicio 6', id: 6, isChecked: true }
  ];

  $scope.tab = "todo";
  $scope.exercicio = {};

  $scope.changeTab = function(tab){
    $scope.tab = tab;
  }

  $scope.cadastrarExercicio = function(){
    if(!$scope.exercicio.nome || !$scope.exercicio.tipo){
      $ionicPopup.alert({
        title: 'Error',
        content: 'Todos os campos precisam ser preenchidos'
      }).then(function(res) {
      });
    }else{
      $scope.exercises.push({title: $scope.exercicio.tipo, isChecked: false});
      $state.go("app.exercises");
    }
  };

  $scope.todos = [];
  $scope.addTodo = function(todo){
        $scope.todos.push(todo);
    };
  $scope.removeTodo = function (index) {
      $scope.todos.splice(index, 1);
    };

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