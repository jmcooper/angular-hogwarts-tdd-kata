"use strict";

describe('RegistrationService', function () {
    var registrationService, mockCatalogRepository;

    beforeEach(function () {
        module("hogwartsApp");

        inject(function (RegistrationService, CatalogRepository) {
            registrationService = RegistrationService;
            mockCatalogRepository = sinon.stub(CatalogRepository);
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
        beforeEach(function() {
            var courseName = 'foo';
            var courseCatalog = [{id: courseName}];
            mockCatalogRepository.getCatalog.returns(courseCatalog);

            response = registrationService.register(courseName);
        });
        it('should return a success response', function () {
            expect(response.success).toBeTruthy();
        });
        it('should an empty message', function() {
            expect(response.message).toEqual('');
        });
    });
});