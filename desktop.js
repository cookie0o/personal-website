// elements
const titlebars = document.querySelectorAll('.titlebar');
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

const random = document.getElementById('random');


const titlebarIds = ['recycle-bin', 'about-me', "socials", "guest-book"];

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
dragElement_windows(random, document.getElementById("random_titlebar"));
dragElement_windows(Recycle_Bin, document.getElementById("recycle_bin_titlebar"));
dragElement_windows(About_Me, document.getElementById("about_me_titlebar"));
dragElement_windows(Socials, document.getElementById("socials_titlebar"));
dragElement_windows(Guest_Book, document.getElementById("guest_book_titlebar"));

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

function initializeResize(window, maxW = 20, maxH = 20, minW) {
  return function (e) {
    e.preventDefault();
    
    function startResize(e) {
      const newWidth = e.clientX - window.getBoundingClientRect().left;
      const newHeight = e.clientY - window.getBoundingClientRect().top;

      var limitedWidth

      if (minW != null) {
        limitedWidth = Math.max(maxW, Math.min(minW, newWidth));
      } else {
        limitedWidth = Math.max(maxW, newWidth);
      }
      const limitedHeight = Math.max(maxH, newHeight);

      window.style.width = `${limitedWidth}px`;
      window.style.height = `${limitedHeight}px`;
      window.querySelector('.titlebar').style.width = `${limitedWidth}px`;
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
Recycle_Bin.querySelector('.resizehandle').addEventListener('mousedown', initializeResize(Recycle_Bin, 593, 200, 593));

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
