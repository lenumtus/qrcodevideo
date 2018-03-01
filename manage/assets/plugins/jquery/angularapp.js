var scotchApp = angular.module('godurzApp', ['ngRoute', 'ng-fusioncharts']);

    // configure our routes
    scotchApp.config(function($routeProvider) {
        $routeProvider

            // route for the home page
            .when('/', {
                templateUrl : 'pages/dashboard.html',
                controller  : 'Dashboard'
            })

            // route for the about page
            .when('/Report_supplier', {
                templateUrl : 'pages/report_suppliers.html',
                controller  : 'LoadReport'
            })
			// supplier profile
			