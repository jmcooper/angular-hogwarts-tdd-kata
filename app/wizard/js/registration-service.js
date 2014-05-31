'use strict';

hogwartsApp.factory('RegistrationService', ['CatalogRepository', 'WizardRepository', function(catalogRepository, wizardRepository) {
    return {
        register: function(courseId) {
            var course = catalogRepository.getCourse(courseId);
            var wizard = wizardRepository.get();

            if (wizardIsRegisteredForAConflictingCourse(wizard, course))
                return {success: false, message: 'You are already registered for a course that starts at that time'};

            registerWizardForCourse(wizard, course);

            return {success: true, message: ''};
        }
    };

    function registerWizardForCourse(wizard, course) {
        wizard.classes[course.id] = course;
        wizardRepository.save(wizard);
    }

    function wizardIsRegisteredForAConflictingCourse(wizard, course) {
        return _.some(wizard.classes, function(course) { return course.id === course.id});
    }
}]);

