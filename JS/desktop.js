// elements
const titlebars = document.querySelectorAll('.titlebar');

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

// change z index of clicked windows
const titlebarIds = ['recycle-bin', 'about-me'];
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
