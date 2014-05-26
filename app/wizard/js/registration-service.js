'use strict';

hogwartsApp.factory('RegistrationService', ['CatalogRepository', 'WizardRepository', function(catalogRepository, wizardRepository) {
    return {
        register: function(courseId) {
            var course = getCourse(courseId);
            if (!course)
                return {success: false, message: "Course does not exist"};

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
}]);

