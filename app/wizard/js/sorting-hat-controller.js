'use strict';

hogwartsApp
    .controller("SortingHatController", ['$scope', 'HouseAssignmentService', function ($scope, houseAssignmentService) {
		$scope.sort = function(){
			houseAssignmentService.assignWizard();
		};		
	}]);
