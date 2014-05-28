'use strict';

hogwartsApp
    .controller("ScheduleController", ['$scope', 'WizardRepository', function ($scope, wizardRepository) {
        $scope.wizard = wizardRepository.get();
    }]);
