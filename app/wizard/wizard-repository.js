'use strict';

hogwartsApp.factory('WizardRepository', function() {
    var wizard = {courses: {}, house: ""};

    return {
        get: function() {
            return wizard;
        },
        save: function(updatedWizard) {
            wizard = updatedWizard;
        }
    };
});
