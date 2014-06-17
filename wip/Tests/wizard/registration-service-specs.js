"use strict";

describe('registrationService', function () {
    var registrationService, mockCatalogRepository, mockWizardRepository;

    beforeEach(function () {
        module("hogwartsApp");

        inject(function (RegistrationService, CatalogRepository, WizardRepository) {
            registrationService = RegistrationService;
            mockCatalogRepository = sinon.stub(CatalogRepository);
            mockWizardRepository = sinon.stub(WizardRepository);
        });
    });

    describe('when successfully registering for a course', function () {
        var response;
        var course = {id: 'foo'};
        beforeEach(function() {
            mockCatalogRepository.getCourse.returns(course);
            mockWizardRepository.get.returns({courses: []});

            response = registrationService.register(course.id);
        });
        it('should return a success response', function () {
            expect(response.success).toBeTruthy();
        });
        it('should return an empty message', function() {
            expect(response.message).toEqual('');
        });
        it ('should register the wizard for the course', function() {
            var expectedCourseList = [];
            expectedCourseList[course.id] = course;
            expect(mockWizardRepository.save.calledWith({courses: expectedCourseList})).toBeTruthy();
        });
    });

    describe('when registering a wizard for a course that conflicts with a course the wizard is already registered for', function() {
        var response;
        var courseAlreadyRegisteredFor = {id: 'foo', startTime: new Date(0,0,0,9)};
        var courseToRegisterFor = {id: 'bar', startTime: new Date(0,0,0,9)};

        beforeEach(function() {
            var currentlyRegisteredCourses = [];
            currentlyRegisteredCourses[courseAlreadyRegisteredFor.id] = courseAlreadyRegisteredFor;

            mockCatalogRepository.getCourse.returns(courseToRegisterFor);
            mockWizardRepository.get.returns({courses: currentlyRegisteredCourses});

            response = registrationService.register(courseToRegisterFor.id);
        });

        it('should return a failure response', function () {
            expect(response.success).toBeFalsy();
        });
        it('should return an error message', function() {
            expect(response.message).toEqual('You are already registered for a course that starts at that time');
        });
        it ('should NOT register the wizard for the courses', function() {
            expect(mockWizardRepository.save.called).toBeFalsy();
        });
    });
});
