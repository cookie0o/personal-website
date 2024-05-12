var language = "en"

// store the strings
const translation = {};

// load translation strings from defined language
async function loadTranslations(language) {
    return await fetch(`./JS/language/translations/translation_${language}.json`)
        .then(response => response.json())
        .then(data => {
            translation[language] = data;
        });
}



function updateContent(translation, language) {
    // load the translation
    loadTranslations(language).then(() => {
        // get the ids and apply the currently selected or defined language
        document.getElementById('startbtn').innerText = translation[language].startbtn;
        document.getElementById('shutdownbtn').innerText = translation[language].shutdownbtn;
        document.getElementById('errortitle').innerText = translation[language].errortitle;
        document.getElementById('errortxt').innerText = translation[language].errortxt;
        document.getElementById('exitbtn').innerText = translation[language].exitbtn;
        document.getElementById('nobtn').innerText = translation[language].nobtn;
        // desktop elements
        document.getElementById('recycle_bin_txt').innerText = translation[language].recycle_bin_txt;
        document.getElementById('about_me_txt').innerText = translation[language].about_me_txt;
        document.getElementById('socials_txt').innerText = translation[language].socials_txt;
        document.getElementById('guest_book_txt').innerText = translation[language].guest_book_txt;
        document.getElementById('webring_txt').innerText = translation[language].webring_txt;
        document.getElementById('music_txt').innerText = translation[language].music_txt;
        // apps (windows)
        // other titles
        document.getElementById('socialstitle').innerText = translation[language].socialstitle;
        document.getElementById('guestbooktitle').innerText = translation[language].guestbooktitle;
        document.getElementById('webringtitle').innerText = translation[language].webringtitle;
        document.getElementById('musictitle').innerText = translation[language].musictitle;
        // Recycle Bin
        document.getElementById('recyclebintitle').innerText = translation[language].recyclebintitle;
        document.getElementById('categorie1').innerText = translation[language].categorie1;
        document.getElementById('categorie2').innerText = translation[language].categorie2;
        document.getElementById('categorie3').innerText = translation[language].categorie3;
        document.getElementById('categorie4').innerText = translation[language].categorie4;
        document.getElementById('infobar1').innerText = translation[language].infobar1;
        document.getElementById('infobar2').innerText = translation[language].infobar2;
        document.getElementById('deleteditems1').innerText = translation[language].deleteditems1;
        document.getElementById('deleteditems2').innerText = translation[language].deleteditems2;
        document.getElementById('deleteditems3').innerText = translation[language].deleteditems3;
        document.getElementById('deleteditems4').innerText = translation[language].deleteditems4;
        document.getElementById('deleteditems5').innerText = translation[language].deleteditems5;
        // About Me
        document.getElementById('aboutmetitle').innerText = translation[language].aboutmetitle;
        document.getElementById('text').innerHTML = translation[language].text;
    });
};
// Initial content update
updateContent(translation, language);