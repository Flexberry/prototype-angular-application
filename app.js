var app = angular.module('components', ['ngResource', 'ngRoute', 'ui.bootstrap', 'blockUI', 'ngGrid']);

app.config(function(blockUIConfig, $routeProvider) {
    // Disable automatically blocking of the user interface
    blockUIConfig.autoBlock = false;

    $routeProvider
        .when('/list', {
            templateUrl: 'templates/listform.html'
        })
        .when('/edit/:id', {
            templateUrl: 'templates/editform.html',
            controller: 'editformController'
        })
        .when('/lookup', {
            templateUrl: 'templates/lookupExampleForm.html'
        })
        .when('/home', {
            redirectTo: 'list'
        })
        .when('/', {
            redirectTo: 'list'
        })
        .otherwise({
            templateUrl: 'templates/404.html'
        });
});

app.factory('service', function($resource) {
    var odataUrl = 'http://services.odata.org/V4/Northwind/Northwind.svc/Employees';
    return $resource('', {},
        {
            'getAll': { method: 'GET', url: odataUrl },
            'save': { method: 'POST', url: odataUrl },
            'update': { method: 'PUT', params: { key: '@key' }, url: odataUrl + '(:key)' },
            'query': { method: 'GET', params: { key: '@key' }, url: odataUrl + '(:key)' },
            'remove': { method: 'DELETE', params: { key: '@key' }, url: odataUrl + '(:key)' }
        });
});

app.controller('lookupController', function($scope, $modal, $log, service, blockUI) {

    $scope.value = '';
    $scope.valueString = '';

    $scope.open = function(size) {
        var modalInstance = $modal.open({
            templateUrl: 'templates/lookupModal.html',
            controller: 'lookupModalController',
            size: size,
            resolve: {
                getItems: function () {
                    return (new service()).$getAll;
                },
                selectedItem: function() {
                    return $scope.value
                }
            }
        });

        modalInstance.result.then(function(selectedItem) {
            $scope.value = selectedItem;
            $scope.valueString = selectedItem.FirstName + ' ' + selectedItem.LastName;
        }, function() {
            // Modal dismissed
        });
    };
});

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.
app.controller('lookupModalController', function($scope, $modalInstance, getItems, selectedItem, blockUI) {

    $scope.items = [];

    var block = blockUI.instances.get('block');
    block.start();
    getItems().then(function(data) {
        $scope.items = data.value;
        block.stop();
    });

    $scope.selected = {
        item: selectedItem
    };

    $scope.ok = function() {
        $modalInstance.close($scope.selected.item);
    };

    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };
});

app.directive('lookup', function() {
    return {
        restrict: 'E',
        link: function(scope, element, attrs) {
            scope.attrs = attrs;
        },
        templateUrl: 'templates/lookup.html',
        controller: 'lookupController'
    }
});

app.controller('wolvController', function($scope, $modal, $log, service, blockUI, $location) {
    $scope.gridOptions = {
        data: 'gridData',
        multiSelect: false,
        afterSelectionChange: function (rowItem, event) {
            $location.path('/edit/' + rowItem.entity.EmployeeID);
        }
    };
    (new service()).$getAll().then(function(data) {
        $scope.gridData = data.value;
    });

});

app.directive('wolv', function() {
    return {
        restrict: 'E',
        templateUrl: 'templates/wolv.html',
        controller: 'wolvController'
    }
});

app.controller('editformController', function($scope, $modal, $log, service, blockUI, $routeParams) {

    blockUI.start();
    (new service()).$query({ key: $routeParams.id }).then(function(data) {
        $scope.obj = data;
        blockUI.stop();
    });

});

angular.module('ExampleApp', ['components']);
