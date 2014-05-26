'use strict';

hogwartsApp.factory('HouseAssignmentService', ['WizardRepository', 'HouseRepository', function(wizardRepository, houseRepository) {
    return {
        assignWizard: function(){
			var wizard = wizardRepository.get();
			var houseOptions = houseRepository.get();
		}
    };
}]);

