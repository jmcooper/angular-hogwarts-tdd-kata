'use strict';

hogwartsApp.factory('RegistrationService', ['CatalogRepository', function(catalogRepository) {
    return {
        register: function(courseId) {
            if (!doesCourseExist(courseId))
                return {success: false, message: "Course does not exist"};
            return {success: true, message: ''};
        }
    };

    function doesCourseExist(courseId) {
        var catalog = catalogRepository.getCatalog();
        for (var i = 0; i<catalog.length; i++) {
            if (catalog[i].id === courseId) return true;
        }
        return false;
    }
}]);

