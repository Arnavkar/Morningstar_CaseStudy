let newPageOpened = Date.now()
let firstInstance = newPageOpened

console.log(`currentTime is ${newPageOpened}, starting Timer now!`)

document.addEventListener("click", function() {
    let secondInstance = Date.now()
    let timeElapsed = (secondInstance - firstInstance)/1000
    console.log(`Time elapsed since last click is ${timeElapsed} seconds`)
    firstInstance = secondInstance
}, false);


