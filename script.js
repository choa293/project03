

getNewRandomColor();

function getNewRandomColor()
{
    var myArray = ['#8EA771', '#B1CB92', '#65794D','#84A078', '#9BB98D', '#B6D7A7'];   
    var rand = myArray[Math.floor(Math.random() * myArray.length)];
    document.body.style.backgroundColor = rand;
}

var Airtable = require("airtable");

getNewRandomSong();

function getNewRandomSong()
{

  var songs = [ {name: 'Green Eyes by Arlo Parks', url: 'GreenEyesbyArloParks.mp3' } , {name: 'Green by Cavetown', url: 'GreenbyCavetown.mp3'} , {name: 'Green River by Creedence Clearwater Revival', url: 'GreenRiverbyCreedenceClearwaterRevival.mp3'} , 
  {name: 'Green by Kody West', url: 'GreenbyKodyWest.mp3'} , {name: 'Green Mile by SZA', url: 'GreenMilebySZA.mp3'} , {name: 'Green Light by Lorde', url: 'GreenLightbyLorde.mp3'} , {name: 'Green Light by Lorde', url: 'GreenLightbyLorde.mp3'} , 
  {name: 'Green by Monty Kay', url: 'GreenbyMontyKay.mp3'} , {name: 'Green by Mun$', url: 'GreenbyMun$.mp3'} , {name: 'Green Gang by The Boys', url: 'GreenGangbyTheBoys.mp3'}];
  var rand = songs[Math.floor(Math.random() * songs.length)];
  
  console.log(rand);
  
}


// use the airtable library to get a variable that represents one of our bases
// We needed to put in the right apiKey and
// base ID here!
var base = new Airtable({ apiKey: "keyZ0WSzwvXJQghO6" }).base(
  "appuMf5Lo3n0SYdRH");

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

  var i;
  
  for (i = 0; i < 9; i++) {
  console.log(i);
  var rand = people[Math.floor(Math.random()* people.length)];
  console.log(rand);
  document.querySelector("'box' + i");

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