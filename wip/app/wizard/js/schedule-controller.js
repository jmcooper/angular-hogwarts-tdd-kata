'use strict';

hogwartsApp
    .controller("ScheduleController", function ($scope, wizardRepository) {
        $scope.wizard = wizardRepository.get();
    });
