app.controller('pandlentryCtrl', ['$scope', '$rootScope', '$log', '$tm1Ui', '$tm1UiTable', function($scope, $rootScope, $log, $tm1Ui, $tm1UiTable) {
  /*
   *     defaults.* are variables that are declared once and are changed in the page, otherwise known as constants in programming languages
   *     lists.* should be used to store any lists that are used with ng-repeat, i.e. tm1-ui-element-list
   *     selections.* should be used for all selections that are made by a user in the page
   *     values.* should store the result of any dbr, dbra or other values from server that you want to store to use elsewhere, i.e. in a calculation
   *
   *     For more information: https://github.com/cubewise-code/canvas-best-practice
   */

  $scope.defaults = {};

  $scope.selections = {};

  $scope.lists = {
    account: []
  };

  $scope.values = {};

  $scope.period = [{
      'name': 'TOTAL',
    },
    {
      'name': 'Jan',
    },
    {
      'name': 'Feb',
    },
    {
      'name': 'Mar',
    },
    {
      'name': 'Apr',
    },
    {
      'name': 'May',
    },
    {
      'name': 'Jun',
    },
    {
      'name': 'Jul',
    },
    {
      'name': 'Aug',
    },
    {
      'name': 'Sep',
    },
    {
      'name': 'Oct',
    },
    {
      'name': 'Nov',
    },
    {
      'name': 'Dec',
    }
  ];

  $scope.quarter = [{
      'name': 'TOTAL',
    },
    {
      'name': 'Qtr 1',
    },
    {
      'name': 'Qtr 2',
    },
    {
      'name': 'Qtr 3',
    },
    {
      'name': 'Qrt 4',
    }
  ];

  if(!$rootScope.uiPrefs.periodView) {
    $rootScope.uiPrefs.periodView = 'month';
  }

  $scope.filter = function(value) {

    if (!_.isEmpty($rootScope.uiPrefs.accountfilter)) {
      if (!value.itemLowerCase) {
        value.itemLowerCase = value["Description"].toLowerCase();
      }
      var filterlower = $rootScope.uiPrefs.accountfilter.toLowerCase();
      if (value.itemLowerCase.indexOf(filterlower) == -1) {
        return false;
      }
    }

    return true;
  };

  $scope.table = $tm1UiTable.create($scope, $scope.lists.account, {
    pageSize: 10,
    preload: false,
    filter: $scope.filter
  });

  $scope.firstPage = function() {
    $scope.table.refresh();
  };

  $scope.lastPage = function() {
    var totalRecords = $scope.table._pages;
    var recordsPerPage = $scope.table._pageSize;
    var newIndex = Math.floor(totalRecords - recordsPerPage);
    $scope.table = $tm1UiTable.create($scope, $scope.lists.account, {
      index: newIndex,
      pageSize: recordsPerPage,
      preload: false,
      filter: $scope.filter
    });
  };


}]);
