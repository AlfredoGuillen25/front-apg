var apgRoutes = angular.module('JSRoutes',['ngRoute']);
apgRoutes.config(function($routeProvider){
    $routeProvider.when('/',{
        templateUrl: 'pages/home.html',
        controller: 'apgController'
    })
    .when('/404',{
        templateUrl: 'pages/404.html'
    })
    .otherwise({redirectTo:'/404'});
});