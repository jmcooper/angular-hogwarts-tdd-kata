'use strict';

hogwartsApp.factory('houseAssignmentService', function(wizardRepository, houseRepository, randomNumberService) {
    return {
        assignWizard: function() {
            var wizard = wizardRepository.get();
            var houseOptions = houseRepository.get();
            var randomHouseIndex = randomNumberService.getInRange(0, houseOptions.length - 1);
            var selectedHouse = houseOptions[randomHouseIndex];
            wizard.house = selectedHouse;
            wizardRepository.save(wizard);
            return selectedHouse;
        }
    };
});

