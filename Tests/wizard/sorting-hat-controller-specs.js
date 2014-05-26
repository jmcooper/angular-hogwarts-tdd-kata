"use strict";

describe('SortingHatController', function () {
    var scope, mockWizardRepository, mockHouseRepository;
    var wizard = {classes: [{id: 'foo'}]};
	var houseOptions = ['one', 'two', 'three', 'four'];

    beforeEach(function () {
        module("hogwartsApp");

        inject(function ($rootScope, $controller, WizardRepository, HouseRepository) {
            scope = $rootScope.$new();

            mockWizardRepository = sinon.stub(WizardRepository);
            mockWizardRepository.get.returns(wizard);
			
			mockHouseRepository = sinon.stub(HouseRepository);
			mockHouseRepository.get.returns(houseOptions);

            $controller("SortingHatController", { $scope: scope, WizardRepository: mockWizardRepository, HouseRepository: mockHouseRepository });
        });
    });

    describe('when the controller first loads', function () {
        it('should get the wizard from the repository', function () {
            expect(mockWizardRepository.get.called).toBeTruthy();
        });
        it('should put wizard on the scope', function() {
            expect(scope.wizard).toEqual(wizard)
        });
		it('should get the house options from the repository', function() {
            expect(mockHouseRepository.get.called).toBeTruthy();
        });
		it('should put houses on the scope', function() {
            expect(scope.houseOptions).toEqual(houseOptions);
        });
    });
});
