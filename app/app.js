;(function() {
    var app = angular.module('main', ['ngResource', 'ngRoute', 'ui.bootstrap', 'blockUI', 'ngGrid']);
    angular.module('ExampleApp', ['main']);

    app.config(function(blockUIConfig, $routeProvider) {
        // Disable automatically blocking of the user interface
        blockUIConfig.autoBlock = false;

        $routeProvider
            .when('/Employees', {
                templateUrl: 'app/forms/Employees/EmployeesL.html',
                controller: 'employeesControllerL'
            })
            .when('/Employees/:id', {
                templateUrl: 'app/forms/Employees/EmployeesE.html',
                controller: 'employeesControllerE'
            })
            .when('/lookup', {
                templateUrl: 'app/views/lookupExampleForm.html'
            })
            .when('/home', {
                templateUrl: 'app/views/home.html'
            })
            .when('/', {
                redirectTo: 'home'
            })
            .otherwise({
                templateUrl: 'app/views/404.html'
            });
    });
})();