'use strict';

hogwartsApp
.factory('RegistrationService', [ 'CatalogRepository',
                                  'WizardRepository',
                                  function(catalogRepository, wizardRepository) {
    return {
        register: function(courseId) {
            var course = catalogRepository.getCourse(courseId),
                wizard = wizardRepository.get();

            return registerWizardForCourse(wizard, course);
        }
    };


    function registerWizardForCourse(wizard, course) {
        wizard.courses[course.id] = course;
        wizardRepository.save(wizard);
        return {success: true};
    }

}]);

