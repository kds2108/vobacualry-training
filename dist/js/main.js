

//Change interface language
let deElements = document.getElementsByClassName("j-span-de"),
    enElements = document.getElementsByClassName("j-span-en"),
    esElements = document.getElementsByClassName("j-span-es");
 
let changeInterfaceLanguage = function (elements1, elements2, elements3) {
    for (let i = 0; i < elements1.length; i++) {
        elements1[i].classList.add("show-class");
        elements1[i].classList.remove("hide-class");
    };
    for (let i = 0; i < elements2.length; i++) {
        elements2[i].classList.add("hide-class");
        elements2[i].classList.remove("show-class");
    };
    for (let i = 0; i < elements3.length; i++) {
        elements3[i].classList.add("hide-class");
        elements3[i].classList.remove("show-class");
    }
}

changeInterfaceLanguage(deElements, enElements, esElements);

document.getElementById("deLink").addEventListener("click", function(){changeInterfaceLanguage(deElements, enElements, esElements);});
document.getElementById("enLink").addEventListener("click", function(){changeInterfaceLanguage(enElements, deElements, esElements);});
document.getElementById("esLink").addEventListener("click", function(){changeInterfaceLanguage(esElements, deElements, enElements);});




function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
};



readTextFile("js/json/first.json", function(a){
    
    //return data from json file
    let data = JSON.parse(a);
    
    //put the content of json-file into new container in HTML, but it still remains hidden
    const list = Object.entries(data);
        
    let listContainer = document.querySelector(".j-vocabulary__content");
    list.forEach(([key, value]) => {
        let oneLine = document.createElement("p");
        oneLine.textContent = `${value}` + ` ----> ` + `${key}`;
        listContainer.appendChild(oneLine);
    })


    //show-hide block with phrases
    let showButton = document.querySelector(".j-vocabulary__show"),
        hideButton = document.querySelector(".j-vocabulary__hide");
        console.log(hideButton);
    
    showButton.addEventListener("click", function(){
        listContainer.classList.remove("hide-class");
        listContainer.classList.add("show-class2");
        hideButton.classList.remove("hide-class");
        this.classList.add("hide-class");
    });
    
    hideButton.addEventListener("click", function(){
        listContainer.classList.add("hide-class");
        listContainer.classList.remove("show-class2");
        showButton.classList.remove("hide-class");
        this.classList.add("hide-class");
    });
    
    
    //function of returning random number
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
    
    let dataCopy = data,
        translateButton = document.querySelector(".j-translate"),
        nextButton = document.querySelector(".j-next"),
        beginButton = document.querySelector(".j-begin"),
        trainingContainer = document.querySelector(".j-training"),
        trainingField = document.querySelector(".j-key-value");
        
    let randomNumber = getRandomInt(Object.keys(dataCopy).length);
        
    trainingField.textContent = Object.keys(dataCopy)[randomNumber];
    
    translateButton.addEventListener("click", function(){
        if (trainingField.textContent == Object.values(dataCopy)[randomNumber]) {
            trainingField.textContent = Object.keys(dataCopy)[randomNumber];
        } else {
            trainingField.textContent = Object.values(dataCopy)[randomNumber];
        }
    });
    
    nextButton.addEventListener("click", function(){
        if(Object.keys(dataCopy).length > 1) {
            Reflect.deleteProperty(dataCopy, Object.keys(dataCopy)[randomNumber]);
            randomNumber = getRandomInt(Object.keys(dataCopy).length);
            console.log(randomNumber);
            trainingField.textContent = Object.keys(dataCopy)[randomNumber];
        } else {
            trainingField.textContent = "Gemacht!"
            translateButton.remove();
            this.remove();
        }
    });
    
    beginButton.addEventListener("click", function(){
        trainingContainer.classList.remove("hide-class");
        this.remove();
    });
    
});



