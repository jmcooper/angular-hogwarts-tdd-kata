hogwartsApp.factory('CatalogRepository', function() {

var catalogData =
[
{
  "class": "Astronomy",
  "teacher": "Aurora Sinistra",
  "description": "During the first year of studies at Hogwarts, students must study the night skies through their telescopes every Wednesday at midnight and learn the different names of the stars and the movements of the planets.",
  "equipment": ["telescopes", "hourglass"],
},

{
  "class": "Charms",
  "teacher": "Filius Flitwick",
  "description": "Spells you will learn: Levitation Charm, Wand-Lighting Charm, Lumos Solem, Fire-Making Spell, Softening Charm, Severing Charm, Unlocking Charm, Locking Spell, Mending Charm",
  "books": ["The Standard Book of Spells", "Quintessence: A Quest"],
},

{
  "class": "Defence Against the Dark Arts",
  "instructor": "",
  "description": "Students learn how to magically defend themselves against Dark Creatures, Dark Arts and against the other Charms.",
  "books": [
    "The Dark Forces: A Guide to Self-Protection", "Break with a Banshee", "Gadding with Ghouls", "Holidays with Hags", "Travels with Trolls", "Voyages with Vampires", "Wanderings with Werewolves", "Year with a Yeti", "Defensive Magical Theory", "Dark Arts Defence: Basics for Beginners", "Confronting the Faceless", "The Standard Book of Spells" ],
    "equipment": [ "Wand", "Books", "Parchment", "Quill" ]
},

{
  "class": "Broom Flight",
  "instructor": "Madam Hooch",
  "description": "students learn how to fly broomsticks",
  "books": ["Quidditch Through the Ages"],
  "equipment": [ "Broomstick", "Wand" ],
},

{
  "class": "Herbology",
  "instructor": "Pomona Sprout",
  "description": "Students learn to care for and utilize plants, and learn about their magical properties, and what they are used for. Many plants provide ingredients for potions and medicine, while others have magical effects of their own right.",
  "books": [ "One Thousand Magical Herbs and Fungi", "Flesh-Eating Trees of the World" ],
  "equipment": [ "Dragon-hide gloves", "Earmuffs", "Dragon dung compost", "Mooncalf dung", "Wand" ],

},

{
  "class": "History of Magic",
  "instructor": "Cuthbert Binns",
  "description": "The class is a study of magical history.",
  "books": [ "A History of Magic" ],
  "equipment": [],
},

{
  "class": "Potions",
  "instructor": "Severus Snape ",
  "description": "Students learn the correct way to brew potions, following specific recipes and using various magical ingredients to create the potions, starting with simple ones first and moving to more advanced ones as they progress in knowledge.",
  "books": ["Magical Drafts and Potions", "Advanced Potion Making"],
  "equipment": ["Cauldron", "Brass scales", "Phials", "Various ingredients"],
},

{
  "class": "Transfiguration",
  "instructor": "Minerva McGonagall",
  "description": "Students are taught the art of changing of the form and appearance of an object. There are limits to Transfiguration, which are governed by Gamp's Law of Elemental Transfiguration.",
  "books": [ "A Beginner's Guide to Transfiguration by Emeric Switch", "Intermediate Transfiguration", "A Guide to Advanced Transfiguration" ],
  "equipment": ["Wand"],
},


  // electives after 3rd year
  { "class": "Study of Ancient Runes"},
  { "class": "Arithmancy"},
  { "class": "Muggle Studies"},
  { "class": "Care of Magical Creatures"},
  { "class": "Divination"},
  // 6th year
  { "class": "Apparition"},
  { "class": "Alchemy"},
  // Extra-curricular subjects
  { "class": "Ancient Studies"},
  { "class": "Art"},
  { "class": "Earth Magic"},
  { "class": "Muggle Art"},
  { "class": "Music"},
  { "class": "Muggle Music"},
  { "class": "Ghoul Studies"},
  { "class": "Magical Theory"},
  { "class": "Xylomancy"},
  { "class": "Frog Choir"},
  { "class": "Hogwarts orchestra"},
];


   return {
       getCatalog: function() {
           return [
               {id: "RUN105", name: "Ancient Runes", startTime: new Date(0,0,0,13), professor: "Bathsheba Babbling", credits: 3 },
               {id: "AR205", name: "Arithmancy", startTime:  new Date(0,0,0,9), professor: "Septima Vector", credits: 3 },
               {id: "AST101", name: "Astronomy", startTime: new Date(0,0,0, 11), professor: "Aurora Sinistra", credits: 3 },
               {id: "MC101", name: "Care of Magical Creatures", startTime: new Date(0,0,0,14), professor: "Rubeus Hagrid", credits: 2 },
               {id: "CH105", name: "Charms", startTime: new Date(0,0,0,11), professor: "Filius Flitwick", credits: 3 },
               {id: "DDA302-10", name: "Defence Against the Dark Arts", startTime: new Date(0,0,0,10), professor: "Severus Snape", credits: 4 },
               {id: "DDA302-13", name: "Defence Against the Dark Arts", startTime: new Date(0,0,0,13), professor: " Quirinus Quirrell", credits: 4 },
               {id: "DIV201-13", name: "Divination", startTime: new Date(0,0,0,13), professor: " Sibyll Trelawney", credits: 3 },
               {id: "DIV201-10", name: "Divination", startTime: new Date(0,0,0,10), professor: "Firenze (Centaur)", credits: 3 },
               {id: "FLY101", name: "Flying", startTime: new Date(0,0,0,9), professor: "Madam Hooch", credits: 2 },
               {id: "HERB201", name: "Herbology", startTime: new Date(0,0,0,14), professor: "Pomona Sprout", credits: 4 },
               {id: "HM101", name: "History of Magic", startTime: new Date(0,0,0,11), professor: "Cuthbert Binns", credits: 3 },
               {id: "MUG101", name: "Muggle Studies", startTime: new Date(0,0,0,9), professor: "Alecto Carrow", credits: 2 },
               {id: "POT108", name: "Potions", startTime: new Date(0,0,0,15), professor: "Severus Snape", credits: 4 },
               {id: "TRN205", name: "Transfiguration", startTime: new Date(0,0,0,13), professor: "Minerva McGonagall", credits: 4 }
               ];
       }
   };
});
