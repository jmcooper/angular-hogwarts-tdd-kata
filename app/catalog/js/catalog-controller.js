'use strict';

hogwartsApp
    .controller("CatalogController", ['$scope', 'CatalogRepository', function ($scope, catalogRepository) {
        catalogRepository.getCatalog();
    }]);
