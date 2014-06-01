'use strict';

hogwartsApp.factory('RandomNumberService', [function() {
    return {
        getInRange: function(min, max){
            return 3;
            //return Math.floor(Math.random() * (max - min + 1)) + min;
        }
    };
}]);

