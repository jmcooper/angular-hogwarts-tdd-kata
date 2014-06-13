"use strict";

describe('RegistrationService', function () {

    var registrationService,
        mockCatalogRepository,
        mockWizardRepository;

    beforeEach(function () {
        module("hogwartsApp");

        inject(function (RegistrationService, CatalogRepository, WizardRepository) {
            registrationService = RegistrationService;
            mockCatalogRepository = sinon.stub(CatalogRepository);
            mockWizardRepository = sinon.stub(WizardRepository);
        });
    });

    describe('when registering for a course', function () {
        var course = {id: 'Potions'};

        beforeEach(function() {
            mockCatalogRepository.getCourse.returns(course);
            mockWizardRepository.get.returns({courses: {}});
        });

        it ('saves the course to the WizardRepository', function() {
            registrationService.register(course.id);
            sinon.assert.calledWith(mockWizardRepository.save, {courses: {'Potions' : course}});
        });

        it('should return a success response', function () {
            var response = registrationService.register(course.id);
            expect(response.success).toBeTruthy();
        });


    });
});
