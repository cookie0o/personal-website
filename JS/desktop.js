// elements
const Recycle_Bin = document.getElementById('recycle-bin');
  const recycle_bin_titlebar = document.getElementById('recycle_bin_titlebar');
  const Recycle_Bin_ICO = document.getElementById('recycle_bin_ico');
  const Recycle_Bin_TXT = document.getElementById('recycle_bin_txt');
  const Recycle_Bin_closebtn = document.getElementById('recycle_bin_closebtn');


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


// Recycle Bin clicked event
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