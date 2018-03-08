app.controller('pandlentryCtrl', ['$scope', '$rootScope', '$log', '$tm1Ui', '$tm1UiTable', '$location', function($scope, $rootScope, $log, $tm1Ui, $tm1UiTable, $location) {
  /*
   *     defaults.* are variables that are declared once and are changed in the page, otherwise known as constants in programming languages
   *     lists.* should be used to store any lists that are used with ng-repeat, i.e. tm1-ui-element-list
   *     selections.* should be used for all selections that are made by a user in the page
   *     values.* should store the result of any dbr, dbra or other values from server that you want to store to use elsewhere, i.e. in a calculation
   *
   *     For more information: https://github.com/cubewise-code/canvas-best-practice
   */

  $scope.defaults = {
    version: '',
    year: '',
    dept: '',
    region: ''
  };

  $scope.selections = {
    version: $scope.defaults.Version,
    year: $scope.defaults.Year,
    dept: $scope.defaults.Department,
    region: $scope.defaults.Region
  };

  $scope.lists = {
    account: []
  }

  $scope.values = {
    netincome: 0,
    generalledger: 0
  };

  $scope.init = function() {

    $scope.pageInit = false;

    $tm1Ui.applicationUser('dev').then(function(data) {
      $scope.currentUser = data['FriendlyName'];

      //set default for other selection from User settings
      _.forEach(['Version', 'Year', 'Region', 'Department'], function(dim) {
        if ($location.search()[dim]) {
          $scope.defaults[dim] = $location.search()[dim];
        } else {
          $tm1Ui.cellGet('dev', 'System User Settings', $scope.currentUser, dim, 'String').then(function(data) {
            if (data) {
              $scope.defaults[dim] = data.Value;
            }
          });
        };
      });
      $scope.pageInit = true;
    });
    $tm1Ui.dataRefresh();
  }

  $scope.setUrl = function(dim, elem) {
    $location.search(dim, elem);
    $tm1Ui.cellPut(elem, 'dev', 'System User Settings', $scope.currentUser, dim, 'string');
    $tm1Ui.dataRefresh();
  }

  $scope.init();

  $scope.period = [{
      'name': 'Year',
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
      'name': 'Year',
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
      'name': 'Qtr 4',
    }
  ];

  if (!$rootScope.uiPrefs.periodView) {
    $rootScope.uiPrefs.periodView = 'month';
  }

  if (!$rootScope.uiPrefs.summaryView) {
    $rootScope.uiPrefs.summaryView = 'ms';
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
    pageSize: 50,
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

  $scope.clearFilter = function() {
    $rootScope.uiPrefs.accountfilter = '';
    $scope.table.refresh();
  }

  $scope.getNetIncome = function(value, round) {
    if (value) {
      if (round == 'ks') {
        var netIncome = value / 1000;
      } else {
        var netIncome = value / 1000000;
      }
      return netIncome;
    } else {
      return 0;
    }
  }

}]);
