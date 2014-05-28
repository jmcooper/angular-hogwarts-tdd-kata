// test/catalog/catalog-controller-specs.js
"use strict";

describe('CatalogController', function () {
    var scope
    ;

    beforeEach(function () {
        module("hogwartsApp");

        inject(function ($rootScope, $controller) {
            scope = $rootScope.$new();

            $controller("CatalogController", { $scope: scope });
        });
    });

    describe('when the controller first loads', function () {

        it('something happends (delete this test)', function () {
            expect(true).toBeTruthy();
        });

    });

});
