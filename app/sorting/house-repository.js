'use strict';

hogwartsApp.factory('houseRepository', function() {
    var houses = ["Gryffindor", "Slytherin", "Ravenclaw", "Hufflepuff"];

    return {
        get: function() {
            return houses;
        }
    };
});
