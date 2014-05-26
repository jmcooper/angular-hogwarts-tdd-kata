'use strict';

hogwartsApp.factory('HouseAssignmentService', ['WizardRepository', 'HouseRepository', 'RandomNumberService', function(wizardRepository, houseRepository, randomNumberService) {
    return {
        assignWizard: function(){
			var wizard = wizardRepository.get();
			var houseOptions = houseRepository.get();
			var randomHouseIndex = randomNumberService.getInRange(0, houseOptions.length - 1);
			wizard.house = houseOptions[randomHouseIndex];
			wizardRepository.save(wizard);
		}
    };
}]);

