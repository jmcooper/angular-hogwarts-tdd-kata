"use strict";

describe('SortingHatController', function () {
    var scope, mockWizardRepository;
    var wizard = {classes: [{id: 'foo'}]};

    beforeEach(function () {
        module("hogwartsApp");

        inject(function ($rootScope, $controller, WizardRepository) {
            scope = $rootScope.$new();

            mockWizardRepository = sinon.stub(WizardRepository);
            mockWizardRepository.get.returns(wizard);

            $controller("SortingHatController", { $scope: scope, WizardRepository: mockWizardRepository });
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
    });
});
