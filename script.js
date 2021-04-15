getNewRandomColor();

function getNewRandomColor() {
  var myArray = ['#8EA771', '#B1CB92', '#65794D', '#84A078', '#9BB98D', '#B6D7A7'];
  var rand = myArray[Math.floor(Math.random() * myArray.length)];
  document.body.style.backgroundColor = rand;
}


var Airtable = require("airtable");
// use the airtable library to get a variable that represents one of our bases
// We needed to put in the right apiKey and
// base ID here!

var base = new Airtable({
  apiKey: "keyZ0WSzwvXJQghO6"
}).base(
  "appuMf5Lo3n0SYdRH");

var songs = ["songs/GreenEyesbyArloParks.mp3", "songs/GreenbyCavetown.mp3", "songs/GreenRiverbyCreedenceClearwaterRevival.mp3", "songs/GreenbyKodyWest.mp3", "songs/GreenbyKodyWest.mp3", "songs/GreenMilebySZA.mp3", "songs/GreenLightbyLorde.mp3",
  "songs/GreenbyMontyKay.mp3", "songs/GreenbyMun$.mp3", "songs/GreenGangbyTheBoys.mp3"
];
var player = document.getElementById("player");
getNewRandomSong();

function getNewRandomSong() {
  var rand = songs[Math.floor(Math.random() * songs.length)];
  player.src = rand;
  player.load();
};

// Get the "people" table from the base, select ALL the records, and specify the callback functions that will receive each page of data
base("collection").select({}).eachPage(gotPageOfPeople, gotAllPeople);
// an empty array to hold our people data
const people = [];

function gotPageOfPeople(records, fetchNextPage) {
    console.log("gotPageOfPeople()");
  console.log("There are " + records.length + " items in records");
  // This takes the list of records and add them to the people array
  people.push(...records);
  // request more pages
  fetchNextPage();
}

function gotAllPeople(err) {
  console.log("gotAllPeople()");

    // report an error, you'd want to do something better than this in production
  if (err) {
    console.log("error loading people");
    console.error(err);
    return;
  }


  // call function to show the people
  displayNinePeople();
}

function displayNinePeople() {
  var randomizedPeople = people
    .filter((i) => i.fields.type === 'image')
    .sort(() => {
      var rand1 = Math.random();
      var rand2 = Math.random();
      if (rand1 < rand2) {
        return -1;
      }
      return 0;
    });

  for (let i = 0; i < 9; i++) {
    var box = document.getElementById(`box${i}`);
    box.style.background = `center / contain no-repeat url("${randomizedPeople[i].fields.Attachments[0].url}")`;
    box.addEventListener('click', createModal, false);
  }
}


function clickButton() {
  displayNinePeople();
  getNewRandomSong();
  getNewRandomColor();
};

function createModal(event) {
  const modal = document.createElement('div');
  modal.classList.add('modal');

  modal.addEventListener('click', () => {
    modal.remove();
  }, false);

  const image = event.target.cloneNode(true);
  image.classList.add('modal-image');

    modal.appendChild(image);
  document.body.appendChild(modal);
};

