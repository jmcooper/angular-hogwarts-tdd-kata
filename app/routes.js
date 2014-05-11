'use strict';

hogwartsApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/sorting");

    // Now set up the states
    $stateProvider
        .state('sorting', {
            url: "/sorting",
            templateUrl: "wizard/sorting-hat.html",
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