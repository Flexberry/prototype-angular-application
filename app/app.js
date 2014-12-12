;(function() {
    var app = angular.module('main', ['ngResource', 'ngRoute', 'ui.bootstrap', 'blockUI', 'ngGrid']);
    angular.module('ExampleApp', ['main']);

    app.config(function(blockUIConfig, $routeProvider) {
        // Disable automatically blocking of the user interface
        blockUIConfig.autoBlock = false;

        $routeProvider
            .when('/list', {
                templateUrl: 'app/views/listform.html'
            })
            .when('/edit/:id', {
                templateUrl: 'app/views/editform.html',
                controller: 'editformController'
            })
            .when('/lookup', {
                templateUrl: 'app/views/lookupExampleForm.html'
            })
            .when('/home', {
                redirectTo: 'list'
            })
            .when('/', {
                redirectTo: 'list'
            })
            .otherwise({
                templateUrl: 'app/views/404.html'
            });
    });
})();