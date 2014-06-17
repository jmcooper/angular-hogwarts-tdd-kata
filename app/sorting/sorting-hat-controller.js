'use strict';

hogwartsApp
.controller("SortingHatController", function ($scope, houseAssignmentService) {
    $scope.sort = function(){
        $scope.assignedHouse = houseAssignmentService.assignWizard();
    };

    $scope.getClassForHouse = function(houseToCheck){
        if(houseToCheck == $scope.assignedHouse)
            return 'selectedHouse';
        return '';
    };
});
