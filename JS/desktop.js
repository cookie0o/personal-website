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

const random = document.getElementById('random');

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
dragElement_windows(Recycle_Bin, document.getElementById("recycle_bin_titlebar"));
dragElement_windows(About_Me, document.getElementById("about_me_titlebar"));
dragElement_windows(Socials, document.getElementById("socials_titlebar"));
dragElement_windows(random, document.getElementById("random_titlebar"));
dragElement_windows(errorbox, document.getElementById("titlebar"));

// change z index of clicked windows
const titlebarIds = ['recycle-bin', 'about-me', "socials"];
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



// Recycle Bin
let lastClickTime = 0;
let isWaiting = false;
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
function Recycle_Bin_close() {
  // hide app window
  Recycle_Bin.style.display = 'none';
};
Recycle_Bin_closebtn.addEventListener('click', () => {
  Recycle_Bin_close();
});
// make Recycle bin window Recycle_Bin
const resizeHandle = Recycle_Bin.querySelector('.resizehandle');
resizeHandle.addEventListener('mousedown', initializeResize);
function initializeResize(e) {
  e.preventDefault();

  document.addEventListener('mousemove', startResize);
  document.addEventListener('mouseup', stopResize);
}
function startResize(e) {
  const newWidth = e.clientX - Recycle_Bin.getBoundingClientRect().left;
  const newHeight = e.clientY - Recycle_Bin.getBoundingClientRect().top;

  // Limit minimum and maximum width and height
  const limitedWidth = Math.max(593, Math.min(593, newWidth));
  const limitedHeight = Math.max(200, newHeight);

  Recycle_Bin.style.width = `${limitedWidth}px`;
  Recycle_Bin.style.height = `${limitedHeight}px`;

  // Update title bar position based on new width
  recycle_bin_titlebar.style.width = `${limitedWidth}px`;
}
function stopResize() {
  document.removeEventListener('mousemove', startResize);
  document.removeEventListener('mouseup', stopResize);
}
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
let lastClickTime_aboutme = 0;
let isWaiting_aboutme = false;
About_Me_ICO.addEventListener("click", function() {
  const currentTime = new Date().getTime();
  // run second function if clicked again within 700ms
  if (currentTime - lastClickTime_aboutme <= 600 && !isWaiting_aboutme) {
    // remove selection
    About_Me_TXT.style.border = "none";
    About_Me_TXT.style.background = "linear-gradient(rgba(0, 0, 0, 0.0), rgba(0, 0, 0, 0.0))";
    // open win
    About_Me.style.display = 'block';
    
    // reset
    isWaiting_aboutme = true;
    // simulate waiting for 700ms and then reset isWaiting_aboutme
    setTimeout(function() {
      isWaiting_aboutme = false;
    }, 700);
  } else {
    // show that the app is selected
    About_Me_TXT.style.border = "1px dotted white";
    About_Me_TXT.style.background = "linear-gradient(rgba(0, 0, 170, 0.5), rgba(0, 0, 170, 0.5))";
  }
  lastClickTime_aboutme = currentTime;
});
function About_Me_close() {
  // hide app window
  About_Me.style.display = 'none';
};
About_Me_closebtn.addEventListener('click', () => {
  About_Me_close();
});
// make Recycle bin window About_Me
const resizeHandle_aboutme = About_Me.querySelector('.resizehandle');
resizeHandle_aboutme.addEventListener('mousedown', initializeResize_aboutme);
function initializeResize_aboutme(e) {
  e.preventDefault();

  document.addEventListener('mousemove', startResize_aboutme);
  document.addEventListener('mouseup', stopResize_aboutme);
}
function startResize_aboutme(e) {
  const newWidth = e.clientX - About_Me.getBoundingClientRect().left;
  const newHeight = e.clientY - About_Me.getBoundingClientRect().top;

  // Limit minimum and maximum width and height
  const limitedWidth_aboutme = Math.max(250, newWidth);
  const limitedHeight_aboutme = Math.max(200, newHeight);

  About_Me.style.width = `${limitedWidth_aboutme}px`;
  About_Me.style.height = `${limitedHeight_aboutme}px`;

  // Update title bar position based on new width
  about_me_titlebar.style.width = `${limitedWidth_aboutme}px`;
}
function stopResize_aboutme() {
  document.removeEventListener('mousemove', startResize_aboutme);
  document.removeEventListener('mouseup', stopResize_aboutme);
}
// check is something else is clicked and reset selection
document.addEventListener('click', function(event) {
  const clickedElement_aboutme = event.target;
  // Check if the clicked element is not the excluded element (About_Me_ICO)
  if (clickedElement_aboutme !== About_Me_ICO) {
    // reset selection and reset style
    About_Me_TXT.style.border = "none";
    About_Me_TXT.style.background = "linear-gradient(rgba(0, 0, 0, 0.0), rgba(0, 0, 0, 0.0))";
    isWaiting_aboutme = false;
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
function Socials_close() {
  // hide app window
  Socials.style.display = 'none';
};
Socials_closebtn.addEventListener('click', () => {
  Socials_close();
});
// make Recycle bin window Socials
const resizeHandle_socials = Socials.querySelector('.resizehandle');
resizeHandle_socials.addEventListener('mousedown', initializeResize_socials);
function initializeResize_socials(e) {
  e.preventDefault();

  document.addEventListener('mousemove', startResize_socials);
  document.addEventListener('mouseup', stopResize_socials);
}
function startResize_socials(e) {
  const newWidth = e.clientX - Socials.getBoundingClientRect().left;
  const newHeight = e.clientY - Socials.getBoundingClientRect().top;

  // Limit minimum and maximum width and height
  const limitedWidth_socials = Math.max(330, newWidth);
  const limitedHeight_socials = Math.max(135, newHeight);

  Socials.style.width = `${limitedWidth_socials}px`;
  Socials.style.height = `${limitedHeight_socials}px`;

  // Update title bar position based on new width
  socials_titlebar.style.width = `${limitedWidth_socials}px`;
}
function stopResize_socials() {
  document.removeEventListener('mousemove', startResize_socials);
  document.removeEventListener('mouseup', stopResize_socials);
}
// check is something else is clicked and reset selection
document.addEventListener('click', function(event) {
  const clickedElement_socials = event.target;
  // Check if the clicked element is not the excluded element (Socials_ICO)
  if (clickedElement_socials !== Socials_ICO) {
    // reset selection and reset style
    Socials_TXT.style.border = "none";
    Socials_TXT.style.background = "linear-gradient(rgba(0, 0, 0, 0.0), rgba(0, 0, 0, 0.0))";
    isWaiting_socials = false;
  }
});
