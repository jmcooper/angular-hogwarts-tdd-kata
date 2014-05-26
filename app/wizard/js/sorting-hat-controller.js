'use strict';

hogwartsApp
    .controller("SortingHatController", ['$scope', 'HouseAssignmentService', function ($scope, houseAssignmentService) {
		$scope.sort = function(){
			$scope.assignedHouse = houseAssignmentService.assignWizard();			
		};		
	}]);
