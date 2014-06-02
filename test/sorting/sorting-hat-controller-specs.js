"use strict";

describe('SortingHatController', function () {
    var scope, mockHouseAssignmentService;

    beforeEach(function () {
        module("hogwartsApp");

        inject(function ($rootScope, $controller, HouseAssignmentService) {
            scope = $rootScope.$new();
            mockHouseAssignmentService = sinon.stub(HouseAssignmentService);

            $controller("SortingHatController", { $scope: scope, HouseAssignmentService: mockHouseAssignmentService });
        });
    });

    describe('when using the sorting hat', function(){
        beforeEach(function(){
            mockHouseAssignmentService.assignWizard.returns('houseOne');
            scope.sort();
        });

        it('sorts the wizard', function(){
            sinon.assert.called(mockHouseAssignmentService.assignWizard);
        });

        it('sets the assigned house on scope', function(){
            expect(scope.assignedHouse).toEqual('houseOne');
        });

    });

    describe('when getting the class for a house', function(){
        beforeEach(function(){
            scope.assignedHouse = 'houseOne';
        });

        describe('when the house is the assigned house', function(){
            it('returns selectedHouse', function(){
                var result = scope.getClassForHouse('houseOne');
                expect(result).toEqual('selectedHouse');
            });
        });

        describe('when the house is NOT the assigned house', function(){
            it('returns selectedHouse', function(){
                var result = scope.getClassForHouse('houseTwo');
                expect(result).toEqual('');
            });
        });

    });
});
