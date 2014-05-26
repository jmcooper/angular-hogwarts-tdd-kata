'use strict';

hogwartsApp
    .controller("SortingHatController", ['$scope', 'WizardRepository', 'HouseRepository', function ($scope, wizardRepository, houseRepository) {
		$scope.wizard = wizardRepository.get();
		$scope.houseOptions = houseRepository.get();
	}]);
