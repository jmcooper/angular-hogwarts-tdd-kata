'use strict';

hogwartsApp.factory('HouseRepository', function() {
    var houses = ["Gryffindor", "Slytherin", "Ravenclaw", "Hufflepuff"];

    return {
        get: function() {
            return houses;
        }       
    };
});