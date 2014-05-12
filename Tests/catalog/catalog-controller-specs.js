"use strict";

describe('CatalogController', function () {
    var scope, mockCatalogRepository;
    var catalog = {foo: 'bar'};

    beforeEach(function () {
        module("hogwartsApp");

        inject(function ($rootScope, $controller, CatalogRepository) {
            scope = $rootScope.$new();

            mockCatalogRepository = sinon.stub(CatalogRepository);
            mockCatalogRepository.getCatalog.returns(catalog);

            $controller("CatalogController", { $scope: scope, CatalogRepository: mockCatalogRepository  });
        });
    });

    describe('when the controller first loads', function () {
        it('should retrieve the course catalog', function () {
            expect(mockCatalogRepository.getCatalog.called).toBeTruthy();
        });
        it('should put the catalog on the scope', function() {
            expect(scope.catalog).toEqual(catalog)
        });
    });
});
