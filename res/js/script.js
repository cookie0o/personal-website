// Loading screen
;(function(){
    function id(v){ return document.getElementById(v); }
    function loadbar() {
        var ovrl = id("overlay"),
            prog = id("progress"),
            img = document.images,
            c = 0,
            tot = img.length;
        if(tot == 0) return doneLoading();

        function imgLoaded(){
        c += 1;
        var perc = ((100/tot*c) << 0) +"%";
        prog.style.width = perc;
        if(c===tot) return doneLoading();
        }
        function doneLoading(){
        ovrl.style.opacity = 0;

        setTimeout(function(){ 
            ovrl.style.display = "none";
        }, 2200);
        }
        for(var i=0; i<tot; i++) {
        var tImg     = new Image();
        tImg.onload  = imgLoaded;
        tImg.onerror = imgLoaded;
        tImg.src     = img[i].src;
        }    
    }
    document.addEventListener('DOMContentLoaded', loadbar, false);
    }());

// parallax effect (not used)
let dde = document.documentElement;
dde.addEventListener("mousemove", e => {
    let ow = dde.offsetWidth; 
    let oh = dde.offsetHeight; 
dde.style.setProperty('--mouseX', e.clientX * 15 / ow + "%");
dde.style.setProperty('--mouseY', e.clientY * 15 / oh + "%");
})


// music fade in
function audioVolumeIn(q){
    if(q.volume){
       var InT = 0;
       var setVolume = 0.8; // Target volume level for new song
       var speed = 0.0013; // Rate of increase
       q.volume = InT;
       var eAudio = setInterval(function(){
           InT += speed;
           q.volume = InT.toFixed(1);
           if(InT.toFixed(1) >= setVolume){
              clearInterval(eAudio);
              //alert('clearInterval eAudio'+ InT.toFixed(1));
           };
       },50);
    };
};

function audioVolumeOut(q){
    if(q.volume){
       var InT = 0.2;
       var setVolume = 0;  // Target volume level for old song 
       var speed = 0.005;  // Rate of volume decrease
       q.volume = InT;
       var fAudio = setInterval(function(){
           InT -= speed;
           q.volume = InT.toFixed(1);
           if(InT.toFixed(1) <= setVolume){
              clearInterval(fAudio);
              //alert('clearInterval fAudio'+ InT.toFixed(1));
           };
       },50);
    };
};