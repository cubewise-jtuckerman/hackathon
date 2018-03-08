app.controller('HomeCtrl', ['$scope', '$rootScope', '$interval', '$timeout', '$state', '$stateParams', '$http',
  function($scope, $rootScope, $interval, $timeout, $state, $stateParams, $http) {

    $state.go('p-and-l-entry');

  }
]);
