'use strict';

hogwartsApp
    .controller("SortingHatController", ['$scope', 'WizardRepository', function ($scope, wizardRepository) {
		$scope.wizard = wizardRepository.get();
	}]);
