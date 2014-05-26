"use strict";

describe('RegistrationService', function () {
    var registrationService, mockCatalogRepository, mockWizardRepository;

    beforeEach(function () {
        module("hogwartsApp");

        inject(function (RegistrationService, CatalogRepository, WizardRepository) {
            registrationService = RegistrationService;
            mockCatalogRepository = sinon.stub(CatalogRepository);
            mockWizardRepository = sinon.stub(WizardRepository);
        });
    });

    describe('when trying to register a non-existant course', function () {
        var response;
        beforeEach(function() {
            var courseCatalog = [{id: 'foo'}];
            mockCatalogRepository.getCatalog.returns(courseCatalog);

            response = registrationService.register('bar');
        });
        it('should return a failure response', function () {
            expect(response.success).toBeFalsy();
        });
        it('should return a failure message indicating the course does not exist', function() {
            expect(response.message).toEqual('Course does not exist');
        });
    });

    describe('when successfully registering for a course', function () {
        var response;
        var course = {id: 'foo'};
        beforeEach(function() {
            var courseCatalog = [course];
            mockCatalogRepository.getCatalog.returns(courseCatalog);
            mockWizardRepository.get.returns({classes: []});

            response = registrationService.register(course.id);
        });
        it('should return a success response', function () {
            expect(response.success).toBeTruthy();
        });
        it('should return an empty message', function() {
            expect(response.message).toEqual('');
        });
        it ('should register the wizard for the class', function() {
            expect(mockWizardRepository.save.calledWith({classes: [course]})).toBeTruthy();
        });
    });

    describe('when registering a wizard for a course that the wizard is already registered for', function() {
        var response;
        var course = {id: 'foo'};

        beforeEach(function() {
            var courseCatalog = [course];
            mockCatalogRepository.getCatalog.returns(courseCatalog);
            mockWizardRepository.get.returns({classes: [course]});

            response = registrationService.register(course.id);
        });
        it('should return a failure response', function () {
            expect(response.success).toBeFalsy();
        });
        it('should an failure message indicating the wizard is already registered for the course', function() {
            expect(response.message).toEqual('You are already registered for that course');
        });
        it ('should NOT register the wizard for the class', function() {
            expect(mockWizardRepository.save.called).toBeFalsy();
        });
    });

    describe('when registering a wizard for a course that conflicts with a course the wizard is already registered for', function() {
        var response;
        var courseAlreadyRegisteredFor = {id: 'foo', startTime: 9};
        var courseToRegisterFor = {id: 'bar', startTime: 9};

        beforeEach(function() {
            var courseCatalog = [courseAlreadyRegisteredFor, courseToRegisterFor];
            mockCatalogRepository.getCatalog.returns(courseCatalog);
            mockWizardRepository.get.returns({classes: [courseAlreadyRegisteredFor]});

            response = registrationService.register(courseToRegisterFor.id);
        });

        it('should return a failure response', function () {
            expect(response.success).toBeFalsy();
        });
        it('should an empty message', function() {
            expect(response.message).toEqual('You are already registered for a course that starts at that time');
        });
        it ('should NOT register the wizard for the class', function() {
            expect(mockWizardRepository.save.called).toBeFalsy();
        });
    });
});
