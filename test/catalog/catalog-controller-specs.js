"use strict";

describe('CatalogController', function () {

    var mockCatalogRepository,
        mockRegistrationService,
        scope,
        catalog = ["catalog"];

    beforeEach(function () {
        module("hogwartsApp");

        inject(function ($rootScope, $controller, CatalogRepository, RegistrationService) {
            scope = $rootScope.$new();

            mockRegistrationService = sinon.stub(RegistrationService);
            mockCatalogRepository = sinon.stub(CatalogRepository);
            mockCatalogRepository.getCatalog.returns(catalog);

            $controller("CatalogController", {
                  $scope: scope,
                  CatalogRepository: mockCatalogRepository,
                  RegistrationService: mockRegistrationService});
        });
    });

    describe('when the controller first loads', function () {

        it('the course catalog is retrieved', function () {
            sinon.assert.calledOnce(mockCatalogRepository.getCatalog);
        });

        it('should put the catalog on the scope', function() {
            expect(scope.catalog).toEqual(catalog)
        });
    });

    describe('when registering for a course', function() {
        var courseId = 'courseId';
        var response = {success: true, message: ''};

        beforeEach(function() {
            mockRegistrationService.register.returns(response);
            scope.register(courseId);
        });

        it('adds the course to the wizard\'s schedule', function() {
            sinon.assert.calledWith(mockRegistrationService.register, courseId);
        });

        it('adds the registration response to the scope', function() {
            expect(scope.response).toEqual(response);
        });

    });

});

