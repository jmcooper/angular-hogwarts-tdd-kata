'use strict';

hogwartsApp.factory('RegistrationService', ['CatalogRepository', 'WizardRepository', function(catalogRepository, wizardRepository) {
    return {
        register: function(courseId) {
            var course = getCourse(courseId);
            if (!course)
                return {success: false, message: "Course does not exist"};

            if (isWizardAlreadyRegisteredForCourse(courseId))
                return {success: false, message: 'You are already registered for that course'};

            registerWizardForCourse(course);

            return {success: true, message: ''};
        }
    };

    function getCourse(courseId) {
        var catalog = catalogRepository.getCatalog();
        for (var i = 0; i<catalog.length; i++) {
            if (catalog[i].id === courseId) return catalog[i];
        }
    }

    function registerWizardForCourse(course) {
        var wizard = wizardRepository.get();
        wizard.classes.push(course);
        wizardRepository.save(wizard);
    }

    function isWizardAlreadyRegisteredForCourse(courseId) {
        var wizard = wizardRepository.get();
        for (var i = 0; i < wizard.classes.length; i++) {
            if (wizard.classes[i].id === courseId) return true;
        }
        return false;
    }
}]);

