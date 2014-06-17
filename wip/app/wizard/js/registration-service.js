'use strict';

hogwartsApp
    .factory('registrationService', function(catalogRepository, wizardRepository) {
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
        wizard.courses[course.id] = course;
        wizardRepository.save(wizard);
    }

    function wizardIsRegisteredForAConflictingCourse(wizard, course) {
        var courses = _.values(wizard.courses);
        return _.some(courses, function(existingCourse) {
          return course.startTime.getTime() === existingCourse.startTime.getTime();
        });
    }
});

