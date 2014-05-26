'use strict';

hogwartsApp.factory('WizardRepository', function() {
    var wizard = {classes: []};

    return {
        get: function() {
            return wizard;
        },
        save: function(updatedWizard) {
            wizard = updatedWizard;
        }
    };
});