// elements
const calendar = document.getElementById('calendar');
const startbtn = document.getElementById('startbtn');

const startmenu = document.getElementById('startmenu');
const shutdownbtn = document.getElementById('shutdownbtn');

// msg box buttons
var closebtn_exitmsg = document.getElementById('closebtn');
var exitbtn_exitmsg = document.getElementById('exitbtn');
var nobtn_exitmsg = document.getElementById('nobtn');

var userLanguage

// generate a random string with a given length
function RandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let randomString = '';
  for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      const randomChar = characters.charAt(randomIndex);
      randomString += randomChar;
  }
  return randomString;
}

// wait x miliseconds
function sleep(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}


// calendar element
function updateTime() {
  const currentDate = new Date();
  const currentHour = currentDate.getHours();
  const currentMinutes = currentDate.getMinutes();

  // Format the time as "hh:mm"
  const currentTime = `${formatTimeNumber(currentHour)}:${formatTimeNumber(currentMinutes)}`;
  calendar.textContent = currentTime;
}
function formatTimeNumber(number) {
  return number.toString().padStart(2, '0');
}
updateTime();
setInterval(updateTime, 60000);

// Start menu show/hide event
// Add a click event listener to the button
startbtn.addEventListener('click', () => {
    // Toggle the display property of the hidden element
    if (startmenu.style.display === 'none') {
        startmenu.style.display = 'block';
    } else {
        startmenu.style.display = 'none';
    }
});


// close start menu when a btn or something outside it is clicked
function closeStartmenu() {
  startmenu.style.display = 'none';
}
// Listen for clicks on the document
document.addEventListener('click', function(event) {
  const targetElement = event.target;
  // If the click target is not the startmenu element close the div
  if (targetElement !== startmenu && targetElement !== startbtn) {
    closeStartmenu();
  }
});


// open error box and define title and message
function exitmsg_open(title, message) {
  // hide the start menu
  startmenu.style.display = 'none';

  // get values
  var divTitle = document.getElementById("errortitle");
  var divContent = document.getElementById("errortxt");
   
  // show msg box
  errorbox.style.display = 'block';
}
function exitmsg_close() {
  // hide msg box
  errorbox.style.display = 'none';
};

closebtn_exitmsg.addEventListener('click', () => {
  exitmsg_close();
});
nobtn_exitmsg.addEventListener('click', () => {
  exitmsg_close();});
exitbtn_exitmsg.addEventListener('click', () => {
  exitmsg_close();
});

async function  changetext() {
  // change text color to red
  exitbtn_exitmsg.style.color = "red";
  // Set 4 times a random string with a delay of 300 milliseconds
  for (let i = 0; i < 4; i++) {
    exitbtn_exitmsg.textContent = RandomString(4);
    await sleep(25);
  }
}

// detect if the yes button is hovered an change it
exitbtn_exitmsg.addEventListener('mouseenter', () => {changetext();});

// not hovered anymore
exitbtn_exitmsg.addEventListener('mouseleave', () => {
  exitbtn_exitmsg.style.color = "black";
  exitbtn_exitmsg.textContent = "Exit";
});

shutdownbtn.addEventListener('click', () => {
  exitmsg_open();
});


// Function to get a random number between 1 and numImages
function getRandomImageNumber() {
    return Math.floor(Math.random() * numImages) + 1;
}

// Function to change the random image and adjust its height
window.onload = function() {
  var random = Math.floor(Math.random() * 2) + 1;
  var bg = "./IMG/memes/" + random + ".jpg";

  var lastbg = localStorage.getItem("lastbg");
  if (lastbg == bg) {
      random = Math.floor(Math.random() * 2) + 1;
      bg = "./IMG/memes/" + random + ".jpg";
  }

  // Create a new Image object to load the image
  var image = new Image();

  // Set the source of the image
  image.src = bg;

  // Wait for the image to load
  image.onload = function() {
    // Apply the background to the random-image div
    const randomwindow = document.getElementById("random");
    const randomImage = document.getElementById("random-image");

    randomImage.style.backgroundImage = "url('" + bg + "')";
    randomwindow.style.height = image.naturalHeight + 50 + "px";
  };
};