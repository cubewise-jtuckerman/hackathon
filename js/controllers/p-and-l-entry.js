app.controller('pandlentryCtrl', ['$scope', '$rootScope', '$log', '$tm1Ui', '$location', function($scope, $rootScope, $log, $tm1Ui, $location) {
   /*
    *     defaults.* are variables that are declared once and are changed in the page, otherwise known as constants in programming languages
    *     lists.* should be used to store any lists that are used with ng-repeat, i.e. tm1-ui-element-list
    *     selections.* should be used for all selections that are made by a user in the page
    *     values.* should store the result of any dbr, dbra or other values from server that you want to store to use elsewhere, i.e. in a calculation
    * 
    *     For more information: https://github.com/cubewise-code/canvas-best-practice
    */
    
    $scope.defaults = {};
    $scope.selections = {
        version: $scope.defaults.Version,
        year: $scope.defaults.Year,
        dept: $scope.defaults.Department,
        region: $scope.defaults.Region

    };
    $scope.lists = {};
    $scope.values = {};

    $scope.init = function() {
    
        $tm1Ui.applicationUser('dev').then(function(data) {
            $scope.currentUser = data['FriendlyName'];        

        //set default for other selection from User settings
        _.forEach(['Version', 'Year', 'Region', 'Department'], function(dim) {
            if ( $location.search()[dim] ) {
                $scope.defaults[dim] = $location.search()[dim];
            } else {
                $tm1Ui.cellGet('dev', 'System User Settings', $scope.currentUser, dim, 'String').then(function(data){ 
                    if ( data ) { $scope.defaults[dim] = data.Value;}
                });
            };
        });

        });
    }

    $scope.setUrl = function(dim, elem) {
        $location.search(dim, elem);
        $tm1Ui.cellPut ( elem, 'dev', 'System User Settings', $scope.currentUser, dim, 'string');
    }
    
    $scope.init();

}]);
