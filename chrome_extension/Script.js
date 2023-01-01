console.log("hi")
function placeInComment(text) {
    var list2 = document.querySelectorAll('div[class="editor-content ql-container"] > div')
    console.log(list2.length)
    for (var i = 0; i < list2.length; ++i) {
        // get the closest id of the comment 
        console.log(list2[i].closest("div[class]"))
        var p = `<p>${text}</p>`;
        list2[i].innerHTML = p;    
    }
}

function getButton(buttonId, text) {
    // we place the id first so it recognizes tap seamlessly
    // text at button text since that is where we will query for the text
    return `
    <br></br>
    <div class="mybutton-container" id="${buttonId}" text="${text}">
        <div class="mybutton" text="${text}">
          <div class="mybutton-text" text="${text}">
            hover
          </div>
        </div>
        <div class="mybutton-outline" text="${text}"></div>
      </div>
    `
}

function print(e) {
    console.clear();
    var text = document.elementFromPoint(e.clientX, e.clientY).getAttribute("text");
    console.log(text);
    var URL = "https://a68d-47-42-192-206.ngrok.io/comment";
    httpRequests(URL, text)
    // console.log(finalText)
}

function getText() {
    var parents = document.querySelectorAll('div[class="update-components-text relative feed-shared-update-v2__commentary "]')
    for (var i = 0; i < parents.length; ++i) {
        // to find text it's a linkedin thing 
        var parent = parents[i]
        var text = parent.children[0].children[0].innerText
        if (text === undefined || text === null) continue; 

        // we use different button ids to simulate different pressed
        var buttonId = `SendToServerBtn${i}`
        // var button = `<button id=${buttonId} text="${text}">hi</button>`
        var button = getButton(buttonId, text)

        // default linkedin parent of texts have 5 children
        if (parent.childNodes.length == 5) {
            parent.innerHTML += button
            document.getElementById(`${buttonId}`).addEventListener("click", print);
        }
    }
}

async function httpRequests(URL, text) {
    var content = {
        "ID": text
    } 
    fetch(URL, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36'
        },
        method: 'POST',
        body: JSON.stringify(content)
    })
    .then((response) => response.json())
    .then((object)=> {
        console.log(object)
        placeInComment(object)
    })
}

const interval = setInterval(getText, 1000);