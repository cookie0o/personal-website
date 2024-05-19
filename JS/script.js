const calendar=document.getElementById('calendar');const startbtn=document.getElementById('startbtn');const startmenu=document.getElementById('startmenu');const shutdownbtn=document.getElementById('shutdownbtn');var closebtn_exitmsg=document.getElementById('closebtn');var exitbtn_exitmsg=document.getElementById('exitbtn');var nobtn_exitmsg=document.getElementById('nobtn');var userLanguage
function RandomString(length){const characters='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';let randomString='';for(let i=0;i<length;i++){const randomIndex=Math.floor(Math.random()*characters.length);const randomChar=characters.charAt(randomIndex);randomString+=randomChar;}
return randomString;}
function sleep(milliseconds){return new Promise(resolve=>setTimeout(resolve,milliseconds));}
function updateTime(){const currentDate=new Date();const currentHour=currentDate.getHours();const currentMinutes=currentDate.getMinutes();const currentTime=`${formatTimeNumber(currentHour)}:${formatTimeNumber(currentMinutes)}`;calendar.textContent=currentTime;}
function formatTimeNumber(number){return number.toString().padStart(2,'0');}
updateTime();setInterval(updateTime,60000);startbtn.addEventListener('click',()=>{if(startmenu.style.display==='none'){startmenu.style.display='block';}else{startmenu.style.display='none';}});function closeStartmenu(){startmenu.style.display='none';}
document.addEventListener('click',function(event){const targetElement=event.target;if(targetElement!==startmenu&&targetElement!==startbtn){closeStartmenu();}});function exitmsg_open(title,message){startmenu.style.display='none';var divTitle=document.getElementById("errortitle");var divContent=document.getElementById("errortxt");errorbox.style.display='block';}
function exitmsg_close(){errorbox.style.display='none';};closebtn_exitmsg.addEventListener('click',()=>{exitmsg_close();});nobtn_exitmsg.addEventListener('click',()=>{exitmsg_close();});exitbtn_exitmsg.addEventListener('click',()=>{exitmsg_close();});async function changetext(){exitbtn_exitmsg.style.color="red";for(let i=0;i<4;i++){exitbtn_exitmsg.textContent=RandomString(4);await sleep(25);}}
exitbtn_exitmsg.addEventListener('mouseenter',()=>{changetext();});exitbtn_exitmsg.addEventListener('mouseleave',()=>{exitbtn_exitmsg.style.color="black";exitbtn_exitmsg.textContent="Exit";});shutdownbtn.addEventListener('click',()=>{exitmsg_open();});function loadRandom(){var baseUrls={"steam":"https://steamuserimages-a.akamaihd.net/ugc/","ibb":"https://i.ibb.co/"};var backgrounds=["steam:2032857200428334921/602AFD1E3D8AD05F15A8F9A4CF18BCAC550098F9/","steam:2408935303712749509/63AD24A580E82F917FA29FA056563B91DE4250F6/","steam:2408935303712756203/1430AACC505FAACA9BAFC8F4AE6629D294BCB3D3/","steam:2465231303170403926/A7FE168534B860D53EE1E206A022B94AD2DC265A/","steam:2032857200428334407/7326B885BDD2F0940C8ECDE5827BC359681C0F8A/","steam:2032857200428335511/5F446354D114DDD98F206E8F4B36001DC0E6306C/","steam:2408935303712753609/D9276C29D5F2B6F23A64CE70175F581B7F866B0E/","steam:2408935303712757926/072034F1F69F40D290ABCA5813766D833700F1AC/","steam:2408935303712757579/52B881ADEDC39E5E50D21918234E67D4FED6097D/","steam:1813239499465677235/3379799A35851884439A38332978E5B6B9DFEAD6/","steam:2027218894809984359/B6673AF9B63D7E6AB31D19CDA247954B00D7B3BB/","steam:2465231303170401801/634B0AC41D4E14A1A119D3A0B2177DEB8D98F8D6/","ibb:10H2G1M/MC-Base-Profile-Screenshot-2024-05-19-01-04-22-86.png","ibb:HCFVPcd/MC-Base-Profile-Screenshot-2024-05-18-23-21-15-20.png","ibb:mzvhjdj/MC-Base-Profile-Screenshot-2024-05-19-00-30-32-28.png","ibb:ZYvbb89/MC-Base-Profile-Screenshot-2024-05-19-00-30-48-28.png","ibb:j8xmQ8p/MC-Base-Profile-Screenshot-2024-05-19-00-31-01-42.png","ibb:pQ13J11/MC-Base-Profile-Screenshot-2024-05-19-00-31-50-77.png","ibb:6wKV6rD/MC-Base-Profile-Screenshot-2024-05-19-01-03-53-32.png","ibb:Db1z7Tn/MC-Base-Profile-Screenshot-2024-05-19-01-12-08-84.png","ibb:CKdbM0z/MC-Base-Profile-Screenshot-2024-05-19-01-10-03-34.png","ibb:26S5mVf/Base-Profile-Screenshot-2024-05-19-00-53-47-39.png",];var randomIndex=Math.floor(Math.random()*backgrounds.length);var rawBg=backgrounds[randomIndex];var lastBg=localStorage.getItem("lastbg");if(lastBg==rawBg){randomIndex=(randomIndex+1)%backgrounds.length;rawBg=backgrounds[randomIndex];}
var[prefix,path]=rawBg.split(":",2);var bg=rawBg.startsWith("http")?rawBg:(baseUrls[prefix]+path);var image=new Image();image.src=bg;image.onload=function(){document.body.style.backgroundImage="url('"+bg+"')";document.body.style.setProperty("fetchpriority","high","important");};localStorage.setItem("lastbg",rawBg);}
loadRandom();