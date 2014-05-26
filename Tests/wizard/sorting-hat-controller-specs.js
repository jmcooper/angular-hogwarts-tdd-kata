"use strict";

describe('SortingHatController', function () {
    var scope;

    beforeEach(function () {
        module("hogwartsApp");

        inject(function ($rootScope, $controller) {
            scope = $rootScope.$new();         

            $controller("SortingHatController", { $scope: scope });
        });
    });
});
