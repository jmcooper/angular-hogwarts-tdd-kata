'use strict';

hogwartsApp
    .controller("CatalogController", ['$scope', 'CatalogRepository', function ($scope, catalogRepository) {
        $scope.catalog = catalogRepository.getCatalog();
    }]);
