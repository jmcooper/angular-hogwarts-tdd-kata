'use strict';

hogwartsApp.factory('HouseAssignmentService', ['WizardRepository', function(wizardRepository) {
    return {
        assignWizard: function(){
			var wizard = wizardRepository.get();
		}
    };
}]);

