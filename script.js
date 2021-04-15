

getNewRandomColor();

function getNewRandomColor()
{
    var myArray = ['#8EA771', '#B1CB92', '#65794D','#84A078', '#9BB98D', '#B6D7A7'];   
    var rand = myArray[Math.floor(Math.random() * myArray.length)];
    document.body.style.backgroundColor = rand;
}

var Airtable = require("airtable");
// use the airtable library to get a variable that represents one of our bases
// We needed to put in the right apiKey and
// base ID here!

var base = new Airtable({ apiKey: "keyZ0WSzwvXJQghO6" }).base(
  "appuMf5Lo3n0SYdRH");


var songs = ["songs/GreenEyesbyArloParks.mp3","songs/GreenbyCavetown.mp3", "songs/GreenRiverbyCreedenceClearwaterRevival.mp3", "songs/GreenbyKodyWest.mp3", "songs/GreenbyKodyWest.mp3", "songs/GreenMilebySZA.mp3","songs/GreenLightbyLorde.mp3",
"songs/GreenbyMontyKay.mp3", "songs/GreenbyMun$.mp3", "songs/GreenGangbyTheBoys.mp3"];
var player = document.getElementById("player");
getNewRandomSong();
function getNewRandomSong(){
  var rand = songs[Math.floor(Math.random() * songs.length)];
  player.src = rand;
  player.load();
};

// Get the "people" table from the base, select ALL the records, and specify the callback functions that will receive each page of data
base("collection").select({}).eachPage(gotPageOfPeople, gotAllPeople);

// an empty array to hold our people data
const people = [];

// callback function that receives each page of data (considered here as records) and adds them to our list of people
function gotPageOfPeople(records, fetchNextPage) {
  console.log("gotPageOfPeople()");
  console.log("There are "+records.length+" items in records");
  // This takes the list of records and add them to the people array
  people.push(...records);
  // request more pages
  fetchNextPage();
}

// call back function that is called when ALL pages are loaded
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

function displayNinePeople()
{

  var i=0;
  
  while (i<9) {

  console.log(i);
  var rand = people[Math.floor(Math.random()* people.length)];
  console.log(rand);
  document.querySelector("#box" + i);
  var box = document.querySelector("#box" + i);

  if (rand.fields.type == "image") {
  i = i + 1;
  var url = rand.fields.Attachments[0].url;
  box.style.backgroundImage = "url(" + url + ")";
}

}
}

// show all the characters
function showPeople() {


  console.log("showPeople()");

  // find the shelf element
  const peopleContainer = document.querySelector("#container");

  // loop through all the people listed in the Airtable data. Inside is the code we are applying for EACH person in the list of people.
  people.forEach((person) => {

    // Print out what a single person's data looks like
    console.log("SHOWING THE PERSON");
    // console.log(person.fields);
const personContainer = document.createElement("div");
  personContainer.classList.add("personcontainer");


    /*******************
    ADD THE PERSON'S IMAGE
    *******************/

    // Create the image for this person as a new img element // ERROR HERE
    const personAttachments = document.createElement("img");
    // Set the src property of this image to the url of the image on Airtable (which is given by the fields of the person)
    personAttachments.src = person.fields.Attachments[0].url;
    // Add this newly created img element to the inside of our container div
    peopleContainer.appendChild(personAttachments);

});
  
}

function clickButton(){

  displayNinePeople();
  getNewRandomSong();
  getNewRandomColor();

};




// function createModal(event) {
//     const modal = document.createElement('div');
//     modal.classList.add('modal');
//     modal.addEventListener('click', () => {
//         modal.remove();    
//     }, false);
//     const image = document.createElement('img');
//     image.classList.add('modal-image');
//     image.src = event.target.src;
//     modal.appendChild(image);
//     document.body.appendChild(image);
// };

