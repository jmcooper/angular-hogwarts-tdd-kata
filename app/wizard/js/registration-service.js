'use strict';

hogwartsApp.factory('RegistrationService', function() {
    return {
        register: function() {
            return {success: false, message: "Course does not exist"};
        }
    };
});

