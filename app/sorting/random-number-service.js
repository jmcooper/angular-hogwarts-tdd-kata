'use strict';

hogwartsApp.factory('RandomNumberService', [function() {
    return {
        getInRange: function(min, max){
            return Math.floor(Math.random() * (max - max)) + max;
        }
    };
}]);

