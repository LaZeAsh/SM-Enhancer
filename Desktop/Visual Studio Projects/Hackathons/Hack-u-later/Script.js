console.log("hi")
function print(txt) {
    console.log(txt)
}
function getText() {
    // var texts = document.querySelectorAll('span[class="break-words"] > span > span')
    var parents = document.querySelectorAll('div[class="update-components-text relative feed-shared-update-v2__commentary "]')
    var texts = document.querySelectorAll('div[class="update-components-text relative feed-shared-update-v2__commentary "] > span > span > span')
    console.log(texts.length)
    for (var i = 0; i < texts.length; ++i) {
        var parent = parents[i]
        var text = texts[i].innerText
        var button = `<button onclick={print(${text})}">hi</button>`
        console.log(parent.childNodes.length)
        // default linkedin parent of texts have 5 children
        if (parent.childNodes.length == 5) {
            parent.innerHTML += button
        }
    }
}
    
const interval = setInterval(getText, 1000);
    