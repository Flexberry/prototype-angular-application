;(function() {
    angular.module('main').factory('service', function($resource) {
        var odataUrl = 'http://services.odata.org/V4/Northwind/Northwind.svc/Employees';
        return $resource('', {},
            {
                'getAll': {method: 'GET', url: odataUrl},
                'save': {method: 'POST', url: odataUrl},
                'update': {method: 'PUT', params: {key: '@key'}, url: odataUrl + '(:key)'},
                'query': {method: 'GET', params: {key: '@key'}, url: odataUrl + '(:key)'},
                'remove': {method: 'DELETE', params: {key: '@key'}, url: odataUrl + '(:key)'}
            });
    });
})();