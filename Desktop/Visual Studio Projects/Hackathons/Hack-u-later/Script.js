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


function print(e) {
    console.clear()
    var text = document.elementFromPoint(e.clientX, e.clientY).getAttribute("text")
    console.log(text)
    placeInComment(text)
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
        var button = `<button id=${buttonId} text="${text}">hi</button>`

        // default linkedin parent of texts have 5 children
        if (parent.childNodes.length == 5) {
            parent.innerHTML += button
            document.getElementById(`${buttonId}`).addEventListener("click", print);
        }
    }
}
    
const interval = setInterval(getText, 1000);
    