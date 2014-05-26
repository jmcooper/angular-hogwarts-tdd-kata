'use strict';

hogwartsApp.factory('RegistrationService', ['CatalogRepository', 'WizardRepository', function(catalogRepository, wizardRepository) {
    return {
        register: function(courseId) {
            var course = getCourse(courseId);
            var wizard = wizardRepository.get();

            if (!course)
                return {success: false, message: "Course does not exist"};

            if (wizardIsAlreadyRegisteredForCourse(wizard, courseId))
                return {success: false, message: 'You are already registered for that course'};

            if (wizardIsRegisteredForAConflictingCourse(wizard, course))
                return {success: false, message: 'You are already registered for a course that starts at that time'};

            registerWizardForCourse(wizard, course);

            return {success: true, message: ''};
        }
    };

    function getCourse(courseId) {
        var catalog = catalogRepository.getCatalog();
        for (var i = 0; i<catalog.length; i++) {
            if (catalog[i].id === courseId) return catalog[i];
        }
    }

    function registerWizardForCourse(wizard, course) {
        wizard.classes.push(course);
        wizardRepository.save(wizard);
    }

    function wizardIsAlreadyRegisteredForCourse(wizard, courseId) {
        for (var i = 0; i < wizard.classes.length; i++) {
            if (wizard.classes[i].id === courseId) return true;
        }
        return false;
    }

    function wizardIsRegisteredForAConflictingCourse(wizard, course) {
        for (var i = 0; i < wizard.classes.length; i++) {
            if (wizard.classes[i].startTime === course.startTime) return true;
        }
        return false;
    }
}]);

