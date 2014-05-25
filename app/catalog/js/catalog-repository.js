hogwartsApp.factory('CatalogRepository', function() {
   return {
       getCatalog: function() {
           return [
               {id: "RUN105", name: "Ancient Runes", startTime: 1, professor: "Bathsheba Babbling", credits: 3 },
               {id: "AR205", name: "Arithmancy", startTime: 9, professor: "Septima Vector", credits: 3 },
               {id: "AST101", name: "Astronomy", startTime: 11, professor: "Aurora Sinistra", credits: 3 },
               {id: "MC101", name: "Care of Magical Creatures", startTime: 2, professor: "Rubeus Hagrid", credits: 2 },
               {id: "CH105", name: "Charms", startTime: 11, professor: "Filius Flitwick", credits: 3 },
               {id: "DDA302", name: "Defence Against the Dark Arts", startTime: 10, professor: "Severus Snape", credits: 4 },
               {id: "DDA302", name: "Defence Against the Dark Arts", startTime: 1, professor: " Quirinus Quirrell", credits: 4 },
               {id: "DIV201", name: "Divination", startTime: 1, professor: " Sibyll Trelawney", credits: 3 },
               {id: "DIV201", name: "Divination", startTime: 10, professor: "Firenze (Centaur)", credits: 3 },
               {id: "FLY101", name: "Flying", startTime: 9, professor: "Madam Hooch", credits: 2 },
               {id: "HERB201", name: "Herbology", startTime: 2, professor: "Pomona Sprout", credits: 4 },
               {id: "HM101", name: "History of Magic", startTime: 11, professor: "Cuthbert Binns", credits: 3 },
               {id: "MUG101", name: "Muggle Studies", startTime: 9, professor: "Alecto Carrow", credits: 2 },
               {id: "POT108", name: "Potions", startTime: 3, professor: "Severus Snape", credits: 4 },
               {id: "TRN205", name: "Transfiguration", startTime: 1, professor: "Minerva McGonagall", credits: 4 }
               ];
       }
   };
});