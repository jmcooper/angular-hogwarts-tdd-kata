'use strict';

hogwartsApp.factory('RandomNumberService', [function() {
    return {
        getInRange: function(minNumber, maxNumber){
			return Math.floor((Math.random() * maxNumber) + minNumber);
		}
    };
}]);

