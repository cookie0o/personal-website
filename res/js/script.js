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