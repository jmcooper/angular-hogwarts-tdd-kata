'use strict';

hogwartsApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/sorting");

    $stateProvider
        .state('sorting', {
            url: "/sorting",
            templateUrl: "sorting/sorting-hat.html",
            controller: 'SortingHatController'
        })
        .state('catalog', {
            url: "/catalog",
            templateUrl: "catalog/catalog.html",
            controller: 'CatalogController'
        })
        .state('schedule', {
            url: "/schedule",
            templateUrl: "wizard/schedule.html",
            controller: 'ScheduleController'
       })
}]);
