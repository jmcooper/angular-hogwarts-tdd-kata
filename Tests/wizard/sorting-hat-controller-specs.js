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
		it('should sort the wizard', function(){			
			expect(mockHouseAssignmentService.assignWizard.called).toBeTruthy();
		});
		it('should set the assigned house on scope', function(){
			expect(scope.assignedHouse).toEqual('houseOne');
		});
	});
});
