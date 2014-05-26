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
});
