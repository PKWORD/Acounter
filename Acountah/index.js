let count = 0
let limval = ""
let final = localStorage.getItem("pace");
let interval;
let audio = document.getElementById('audio');
let timeloss;
let disable_limit = document.getElementById("limit-text")
let synth = window.speechSynthesis
let quarter;
let half;
let triple
let CheckVal;
let allowSound;
let newFinalVal

document.getElementById("paceNum").value = localStorage.getItem("pace")
if(document.getElementById("paceNum").value == ""){
    resetPop()
    console.log("uhm")
}

checkCheck()



function add(){
    count += 1
    limtext = document.getElementById('limit-text').innerText
    
    document.getElementById('label').innerText = count

    if (parseInt(document.getElementById('label').innerText) == parseInt(limval)){
        audio.play()

        setTimeout(function () {
            window.alert('Limit Reached!');
        }, 500)
        
    }
}

function add_one(){
    count += 1
    document.getElementById('label').innerText = count
    

    if (parseInt(document.getElementById('label').innerText) == parseInt(limval)){
        clearInterval(interval)
        pace_start()


        audio.play()

        setTimeout(function () {
            window.alert('Limit Reached!');

            speak("Your Welcome")
        }, 500)
    }

    if (count == Math.round(quarter) - 1){
        speak("Count reached 25% ")
    }
    
    else if (count == Math.round(half) - 1){
        speak("Count reached 50% ")
    }
    
    else if (count == Math.round(triple) - 1){
        speak("Count reached 75% ")
    }


}

function remove(){
    count -= 1
    document.getElementById('label').innerText = count

    if (parseInt(document.getElementById('label').innerText) == parseInt(limval)){
        audio.play()

        setTimeout(function () {
            window.alert('Limit Reached!');
        }, 500)
    }


}

function reset(){
    count = 0
    limval = ""
    quarter =  ""
    half =  ""
    triple =  ""
    
    let disable_limit = document.getElementById("limit-text")
    if(limval === ""){
    disable_limit.style.display = "none"
    }
    
    document.getElementById('label').innerText = count
    document.getElementById('limit-text').innerText = 0

    clearInterval(interval)
    document.getElementById("pace").style.color = "rgb(55, 214, 68)"
}

function increase(){
    let incr = window.prompt('Increase the count by:')

    let current_val = document.getElementById('label').innerText
    if (incr == "" || incr == null){
        document.getElementById('label').innerText = current_val
    }
    else{
    count = document.getElementById('label').innerText = parseInt(count) + parseInt(incr)
    }

    if (parseInt(document.getElementById('label').innerText) == parseInt(limval)){
        clearInterval(interval)

        audio.play()

        setTimeout(function () {
            window.alert('Limit Reached!');
        }, 500)
    }


}

function decrease(){
    let decr = window.prompt('Decrease the count by:')

    let current_val = document.getElementById('label').innerText
    if (decr == "" || decr == null){
        document.getElementById('label').innerText = current_val
    }
    else{
    count = document.getElementById('label').innerText = parseInt(count) - parseInt(decr)
    }

    if (parseInt(document.getElementById('label').innerText) == parseInt(limval)){
        clearInterval(interval)
        audio.play()

        setTimeout(function () {
            window.alert('Limit Reached!');
        }, 500)
    }


}

function limit(){
    limval = window.prompt('Set limit:')

    document.getElementById('limit-text').innerText = limval

    if (limval != ""){
        disable_limit.style.display = "inline"
    }
    
    let shortcut = document.getElementById('limit-text').innerText = limval

    quarter = (parseInt(shortcut) / 100) * 25
    half = (parseInt(shortcut) / 100) * 50
    triple = (parseInt(shortcut) / 100) * 75
}

function pace_start(){
    
    if(document.getElementById("pace").style.color != "red"){

    interval = setInterval(add_one,final)

    document.getElementById("pace").style.color = "red"
    }

    else if(document.getElementById("pace").style.color == "red"){
        clearInterval(interval)
        document.getElementById("pace").style.color = "rgb(55, 214, 68)"
    }

}

function tlfunc(){
    timeloss = window.prompt("Enter the time loss")
    timeloss = Math.round(timeloss / 0.315)

    count = parseInt(count) - parseInt(timeloss)
    document.getElementById("label").innerText = count
}

function speak(speech){
    if (document.getElementById("checkPop").checked){
        let utterance = new SpeechSynthesisUtterance(speech)

        utterance.voice = synth.getVoices()[6]


        synth.speak(utterance)
}
else{}
}

function popShow(){
    showHide()

    if(document.getElementById("paceNum").value == ""){
        resetPop()
    }
    else{}

    let closeBtn = document.getElementById("closeBtn").onclick = function(){
        document.getElementById("popup").style.display = "none"

    newFinalVal = document.getElementById("paceNum").value
    final = newFinalVal

    localStorage.setItem("pace",newFinalVal)

    CheckVal = document.getElementById("checkPop").checked
    localStorage.setItem("checkPop",CheckVal)

}}

function resetPop(){
    document.getElementById("paceNum").value = Number(310)
    document.getElementById("checkPop").checked = false

}

function checkCheck(){
    if (document.getElementById("checkPop").checked && localStorage.getItem("checkPop") == "false"){
        document.getElementById("checkPop").checked = false
        allowSound = 0
    }
    else{allowSound = 1}
}

function cancel(){
    document.getElementById("popup").style.display = "none"
    document.getElementById("paceNum").value = final

    if(allowSound == 0){
    document.getElementById("checkPop").checked = false
    }
    else{
        document.getElementById("checkPop").checked = true
    }
}

document.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowRight') {
        add();
    }

    else if (event.key === 'ArrowLeft') {
        remove();
    }
    
    else if (event.key === 'ArrowUp') {
        add();
    }
    
    else if (event.key === 'ArrowDown') {
        remove();
    }
    
    else if (event.key === ' ') {
        add();
    }

    else if (event.key === 'Backspace') {
        remove();
    }

    else if (event.key === 'Enter') {
        add();
}})

function showHide(){
    let smthn = document.getElementById("popup")


    if(smthn.style.display = "none" && smthn.style.display != "block"){
        document.getElementById("popup").style.display = "block"
        }

    else{
        cancel()
    }
}
