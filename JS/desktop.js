// elements
const errorbox = document.getElementById("errorbox")

const Recycle_Bin = document.getElementById('recycle-bin');
  const recycle_bin_titlebar = document.getElementById('recycle_bin_titlebar');
  const Recycle_Bin_ICO = document.getElementById('recycle_bin_ico');
  const Recycle_Bin_TXT = document.getElementById('recycle_bin_txt');
  const Recycle_Bin_closebtn = document.getElementById('recycle_bin_closebtn');

const About_Me = document.getElementById('about-me');
  const about_me_titlebar = document.getElementById('about_me_titlebar');
  const About_Me_ICO = document.getElementById('about_me_ico');
  const About_Me_TXT = document.getElementById('about_me_txt');
  const About_Me_closebtn = document.getElementById('about_me_closebtn');

const Socials = document.getElementById('socials');
  const socials_titlebar = document.getElementById('socials_titlebar');
  const Socials_ICO = document.getElementById('socials_ico');
  const Socials_TXT = document.getElementById('socials_txt');
  const Socials_closebtn = document.getElementById('socials_closebtn');

const Guest_Book = document.getElementById('guest-book');
  const guest_book_titlebar = document.getElementById('guest_book_titlebar');
  const Guest_Book_ICO = document.getElementById('guest_book_ico');
  const Guest_Book_TXT = document.getElementById('guest_book_txt');
  const Guest_Book_closebtn = document.getElementById('guest_book_closebtn');

const Webring = document.getElementById('webring');
  const webring_titlebar = document.getElementById('webring_titlebar');
  const webring_ICO = document.getElementById('webring_ico');
  const webring_TXT = document.getElementById('webring_txt');
  const webring_closebtn = document.getElementById('webring_closebtn');

const Music = document.getElementById('music');
  const music_titlebar = document.getElementById('music_titlebar');
  const music_ICO = document.getElementById('music_ico');
  const music_TXT = document.getElementById('music_txt');
  const music_closebtn = document.getElementById('music_closebtn');


const titlebarIds = ['recycle-bin', 'about-me', "socials", "guest-book", "webring", "music"];

// make a window draggable
function dragElement_windows(window, titlebar) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

  if (document.getElementById(titlebar.id + "header")) {
    document.getElementById(titlebar.id + "header").onmousedown = dragMouseDown;
  } else {
    titlebar.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;

    titlebar.style.cursor = 'grabbing';
  }

  function elementDrag(e) {
    e = e || window;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    window.style.top = (window.offsetTop - pos2) + "px";
    window.style.left = (window.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;

    titlebar.style.cursor = 'grab';
  }
}
dragElement_windows(errorbox, document.getElementById("titlebar"));
dragElement_windows(Recycle_Bin, document.getElementById("recycle_bin_titlebar"));
dragElement_windows(About_Me, document.getElementById("about_me_titlebar"));
dragElement_windows(Socials, document.getElementById("socials_titlebar"));
dragElement_windows(Guest_Book, document.getElementById("guest_book_titlebar"));
dragElement_windows(Webring, document.getElementById("webring_titlebar"));
dragElement_windows(Music, document.getElementById("music_titlebar"));

// change z index of clicked windows
const zindexInactive = 991;
const zindexActive = 992;

titlebarIds.forEach(id => {
  const titlebar = document.getElementById(id);
  titlebar.addEventListener('click', () => {
    titlebarIds.forEach(tbId => {
      if (tbId !== id) {
        document.getElementById(tbId).style.zIndex = zindexInactive.toString();
      }
    });
    titlebar.style.zIndex = zindexActive.toString();
  });
});


let lastClickTime = 0;
let isWaiting = false;

// functions
function window_close(window) {
  // hide app window
  window.style.display = 'none';
};

function initializeResize(window, minW = 20, minH = 20, music=false, maxW, maxH) {
  return function (e) {
    e.preventDefault();
    
    function startResize(e) {
      const newWidth = e.clientX - window.getBoundingClientRect().left;
      const newHeight = e.clientY - window.getBoundingClientRect().top;

      var limitedWidth

      if (maxW != null) {
        limitedWidth = Math.max(minW, Math.min(maxW, newWidth));
      } else {
        limitedWidth = Math.max(minW, newWidth);
      }
      const limitedHeight = Math.max(minH, newHeight);

      window.style.width = `${limitedWidth}px`;
      window.style.height = `${limitedHeight}px`;
      window.querySelector('.titlebar').style.width = `${limitedWidth}px`;

      // if its the music window change the height of the spotify embed dynamically
      if (music != false) {
        document.getElementById("spotify_embed_iframe").style.height = `${(limitedHeight - 63)}px`;;
      }
    }

    function stopResize() {
      document.removeEventListener('mousemove', startResize);
      document.removeEventListener('mouseup', stopResize);
    }

    document.addEventListener('mousemove', startResize);
    document.addEventListener('mouseup', stopResize);
  };
}




// Recycle Bin
Recycle_Bin_ICO.addEventListener("click", function() {
  const currentTime = new Date().getTime();
  // run second function if clicked again within 700ms
  if (currentTime - lastClickTime <= 600 && !isWaiting) {
    // remove selection
    Recycle_Bin_TXT.style.border = "none";
    Recycle_Bin_TXT.style.background = "linear-gradient(rgba(0, 0, 0, 0.0), rgba(0, 0, 0, 0.0))";
    // open win
    Recycle_Bin.style.display = 'block';
    
    // reset
    isWaiting = true;
    // simulate waiting for 700ms and then reset isWaiting
    setTimeout(function() {
      isWaiting = false;
    }, 700);
  } else {
    // show that the app is selected
    Recycle_Bin_TXT.style.border = "1px dotted white";
    Recycle_Bin_TXT.style.background = "linear-gradient(rgba(0, 0, 170, 0.5), rgba(0, 0, 170, 0.5))";
  }

  lastClickTime = currentTime;
});

Recycle_Bin_closebtn.addEventListener('click', () => {window_close(Recycle_Bin)});
// make window
Recycle_Bin.querySelector('.resizehandle').addEventListener('mousedown', initializeResize(Recycle_Bin, 593, 200, false, 593));

// check is something else is clicked and reset selection
document.addEventListener('click', function(event) {
  const clickedElement_recyclebin = event.target;
  // Check if the clicked element is not the excluded element (About_Me_ICO)
  if (clickedElement_recyclebin !== Recycle_Bin_ICO) {
    // reset selection and reset style
    Recycle_Bin_TXT.style.border = "none";
    Recycle_Bin_TXT.style.background = "linear-gradient(rgba(0, 0, 0, 0.0), rgba(0, 0, 0, 0.0))";
    isWaiting = false;
  }
});



// About Me
About_Me_ICO.addEventListener("click", function() {
  const currentTime = new Date().getTime();
  // run second function if clicked again within 700ms
  if (currentTime - lastClickTime <= 600 && !isWaiting) {
    // remove selection
    About_Me_TXT.style.border = "none";
    About_Me_TXT.style.background = "linear-gradient(rgba(0, 0, 0, 0.0), rgba(0, 0, 0, 0.0))";
    // open win
    About_Me.style.display = 'block';
    
    // reset
    isWaiting = true;
    // simulate waiting for 700ms and then reset isWaiting
    setTimeout(function() {
      isWaiting = false;
    }, 700);
  } else {
    // show that the app is selected
    About_Me_TXT.style.border = "1px dotted white";
    About_Me_TXT.style.background = "linear-gradient(rgba(0, 0, 170, 0.5), rgba(0, 0, 170, 0.5))";
  }

  lastClickTime = currentTime;
});

About_Me_closebtn.addEventListener('click', () => {window_close(About_Me)});
// make window
About_Me.querySelector('.resizehandle').addEventListener('mousedown', initializeResize(About_Me, 200, 200));

// check is something else is clicked and reset selection
document.addEventListener('click', function(event) {
  const clickedElement_aboutme = event.target;
  // Check if the clicked element is not the excluded element (About_Me_ICO)
  if (clickedElement_aboutme !== About_Me_ICO) {
    // reset selection and reset style
    About_Me_TXT.style.border = "none";
    About_Me_TXT.style.background = "linear-gradient(rgba(0, 0, 0, 0.0), rgba(0, 0, 0, 0.0))";
    isWaiting = false;
  }
});



// Socials
let lastClickTime_socials = 0;
let isWaiting_socials = false;
Socials_ICO.addEventListener("click", function() {
  const currentTime = new Date().getTime();
  // run second function if clicked again within 700ms
  if (currentTime - lastClickTime_socials <= 600 && !isWaiting_socials) {
    // remove selection
    Socials_TXT.style.border = "none";
    Socials_TXT.style.background = "linear-gradient(rgba(0, 0, 0, 0.0), rgba(0, 0, 0, 0.0))";
    // open win
    Socials.style.display = 'block';
    
    // reset
    isWaiting_socials = true;
    // simulate waiting for 700ms and then reset isWaiting_socials
    setTimeout(function() {
      isWaiting_socials = false;
    }, 700);
  } else {
    // show that the app is selected
    Socials_TXT.style.border = "1px dotted white";
    Socials_TXT.style.background = "linear-gradient(rgba(0, 0, 170, 0.5), rgba(0, 0, 170, 0.5))";
  }
  lastClickTime_socials = currentTime;
});

Socials_closebtn.addEventListener('click', () => {window_close(Socials);});
// make window
Socials.querySelector('.resizehandle').addEventListener('mousedown', initializeResize(Socials, 330, 135));

// check is something else is clicked and reset selection
document.addEventListener('click', function(event) {
  const clickedElement_socials = event.target;
  // Check if the clicked element is not the excluded element (GuestBook_ICO)
  if (clickedElement_socials !== Socials_ICO) {
    // reset selection and reset style
    Socials_TXT.style.border = "none";
    Socials_TXT.style.background = "linear-gradient(rgba(0, 0, 0, 0.0), rgba(0, 0, 0, 0.0))";
    isWaiting_socials = false;
  }
});



// Guest Book
let lastClickTime_guest_book = 0;
let isWaiting_guest_book = false;
Guest_Book_ICO.addEventListener("click", function() {
  const currentTime = new Date().getTime();
  // run second function if clicked again within 700ms
  if (currentTime - lastClickTime_guest_book <= 600 && !isWaiting_guest_book) {
    // remove selection
    Guest_Book_TXT.style.border = "none";
    Guest_Book_TXT.style.background = "linear-gradient(rgba(0, 0, 0, 0.0), rgba(0, 0, 0, 0.0))";
    
    // load the website (only now else it will load even when not open)
    document.getElementById("guest_book_iframe").src = "https://users2.smartgb.com/g/g.php?a=s&i=g26-39561-09"
    // open win
    Guest_Book.style.display = 'block';
    
    // reset
    isWaiting_guest_book = true;
    // simulate waiting for 700ms and then reset isWaiting_guest_book
    setTimeout(function() {
      isWaiting_guest_book = false;
    }, 700);
  } else {
    // show that the app is selected
    Guest_Book_TXT.style.border = "1px dotted white";
    Guest_Book_TXT.style.background = "linear-gradient(rgba(0, 0, 170, 0.5), rgba(0, 0, 170, 0.5))";
  }
  lastClickTime_guest_book = currentTime;
});

Guest_Book_closebtn.addEventListener('click', () => {window_close(Guest_Book)});
// make window
Guest_Book.querySelector('.resizehandle').addEventListener('mousedown', initializeResize(Guest_Book, 300, 200));

// check is something else is clicked and reset selection
document.addEventListener('click', function(event) {
  const clickedElement_guest_book = event.target;
  // Check if the clicked element is not the excluded element (GuestBook_ICO)
  if (clickedElement_guest_book !== Guest_Book_ICO) {
    // reset selection and reset style
    Guest_Book_TXT.style.border = "none";
    Guest_Book_TXT.style.background = "linear-gradient(rgba(0, 0, 0, 0.0), rgba(0, 0, 0, 0.0))";
    isWaiting_guest_book = false;
  }
});



// Webring
let lastClickTime_webring = 0;
let isWaiting_webring = false;
webring_ICO.addEventListener("click", function() {
  const currentTime = new Date().getTime();
  // run second function if clicked again within 700ms
  if (currentTime - lastClickTime_webring <= 600 && !isWaiting_webring) {
    // remove selection
    webring_TXT.style.border = "none";
    webring_TXT.style.background = "linear-gradient(rgba(0, 0, 0, 0.0), rgba(0, 0, 0, 0.0))";
    // open win
    Webring.style.display = 'block';
    
    // reset
    isWaiting_webring = true;
    // simulate waiting for 700ms and then reset isWaiting_webring
    setTimeout(function() {
      isWaiting_webring = false;
    }, 700);
  } else {
    // show that the app is selected
    webring_TXT.style.border = "1px dotted white";
    webring_TXT.style.background = "linear-gradient(rgba(0, 0, 170, 0.5), rgba(0, 0, 170, 0.5))";
  }
  lastClickTime_webring = currentTime;
});

webring_closebtn.addEventListener('click', () => {window_close(Webring);});
// make window
Webring.querySelector('.resizehandle').addEventListener('mousedown', initializeResize(Webring, 330, 135));

// check is something else is clicked and reset selection
document.addEventListener('click', function(event) {
  const clickedElement_webring = event.target;
  // Check if the clicked element is not the excluded element (GuestBook_ICO)
  if (clickedElement_webring !== webring_ICO) {
    // reset selection and reset style
    webring_TXT.style.border = "none";
    webring_TXT.style.background = "linear-gradient(rgba(0, 0, 0, 0.0), rgba(0, 0, 0, 0.0))";
    isWaiting_webring = false;
  }
});



// Music
let lastClickTime_music = 0;
let isWaiting_music = false;
music_ICO.addEventListener("click", function() {
  const currentTime = new Date().getTime();
  // run second function if clicked again within 700ms
  if (currentTime - lastClickTime_music <= 600 && !isWaiting_music) {
    // remove selection
    music_TXT.style.border = "none";
    music_TXT.style.background = "linear-gradient(rgba(0, 0, 0, 0.0), rgba(0, 0, 0, 0.0))";
   
    // load the website (only now else it will load even when not open)
    document.getElementById("spotify_embed_iframe").src = "https://open.spotify.com/embed/playlist/5H3DFhpmPEF3omNSHGHd8i?utm_source=generator"
    // open win
    Music.style.display = 'block';
    
    // reset
    isWaiting_music = true;
    // simulate waiting for 700ms and then reset isWaiting_music
    setTimeout(function() {
      isWaiting_music = false;
    }, 700);
  } else {
    // show that the app is selected
    music_TXT.style.border = "1px dotted white";
    music_TXT.style.background = "linear-gradient(rgba(0, 0, 170, 0.5), rgba(0, 0, 170, 0.5))";
  }
  lastClickTime_music = currentTime;
});

music_closebtn.addEventListener('click', () => {window_close(Music);});
// make window
Music.querySelector('.resizehandle').addEventListener('mousedown', initializeResize(Music, 330, 160, true, null, 400));

// check is something else is clicked and reset selection
document.addEventListener('click', function(event) {
  const clickedElement_music = event.target;
  // Check if the clicked element is not the excluded element (music_ICO)
  if (clickedElement_music !== music_ICO) {
    // reset selection and reset style
    music_TXT.style.border = "none";
    music_TXT.style.background = "linear-gradient(rgba(0, 0, 0, 0.0), rgba(0, 0, 0, 0.0))";
    isWaiting_music = false;
  }
});

