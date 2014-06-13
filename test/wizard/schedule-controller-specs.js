"use strict";

describe('ScheduleController', function () {
    var scope, mockWizardRepository;
    var wizard = {courses: {'foo': {id: 'foo'}}};

    beforeEach(function () {
        module("hogwartsApp");

        inject(function ($rootScope, $controller, WizardRepository) {
            scope = $rootScope.$new();

            mockWizardRepository = sinon.stub(WizardRepository);
            mockWizardRepository.get.returns(wizard);

            $controller("ScheduleController", {
                $scope: scope,
                WizardRepository: mockWizardRepository
            });
        });
    });

    describe('when the controller first loads', function () {
        it('gets the wizard from the repository', function () {
            sinon.assert.calledOnce(mockWizardRepository.get);
        });

        it('puts wizard on the scope', function() {
            expect(scope.wizard).toEqual(wizard)
        });
    });
});
