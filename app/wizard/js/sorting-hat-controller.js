'use strict';

hogwartsApp
    .controller("SortingHatController", ['$scope', 'WizardRepository', 'HouseRepository', function ($scope, wizardRepository, houseRepository) {
		$scope.wizard = wizardRepository.get();
		houseRepository.get();
	}]);
