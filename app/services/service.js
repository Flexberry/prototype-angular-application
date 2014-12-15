;(function() {
    angular.module('main').factory('service', function($resource) {
        var odataUrl = 'http://services.odata.org/V4/Northwind/Northwind.svc/:res',
            params = {
                res: undefined
            },
            actions = {
                'getAll': {method: 'GET'},
                'save': {method: 'POST'},
                'update': {method: 'PUT', params: {key: '@key'}, url: odataUrl + '(:key)'},
                'query': {method: 'GET', params: {key: '@key'}, url: odataUrl + '(:key)'},
                'remove': {method: 'DELETE', params: {key: '@key'}, url: odataUrl + '(:key)'}
            };

        return $resource(odataUrl, params, actions);
    });
})();