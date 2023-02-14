var $$ = document.querySelectorAll.bind (document)
var $ = document.querySelector.bind (document)


var clockDuration = $(".clock");
var deg = 100;
var playBtn = $(".play");
var inputTime = $$("input")
var result = [];
var times = 0;
Array.from (inputTime).forEach ((input) => {
    input.onclick = () => {
        input.value = ""
    }
    var inputValue = '';
    input.oninput = () => {
        if (input.value) {
            if (input.value.length <= 2) {
                inputValue = input.value;
            }
            else input.value = inputValue;
            if (parseInt(input.value) <= 60) {
                console.log (true);
            }
            else {
                input.value = inputValue[0];

            }
        }
    }
    input.onblur = () => {
         if (input.value === '') {
            input.value = '00';
        }
        else if (input.value.length < 2) {
            input.value = '0'+input.value;
        }
        
        console.log (input.name + ': ' + input.value);
    }
})

var hours;
var seconds;
var minutes;

var countdownSeconds = setInterval(() => {
        
}, 0000);


var clockDurationCircle = setInterval(() => {
    
}, 0000);

var setTimeBtn = $("button")
setTimeBtn.onclick = (e) => {
    deg = 360;
    result = [];
    e.preventDefault();
    var html = Array.from(inputTime).reduce((string, input, index, array) => {
        if (index < array.length - 1) {
            string += input.value + ":";
        }
        else {
            string += input.value;
        }
        result.push (parseInt(input.value))
        return string
    }, '')
    $('.countdown-container').innerHTML = html;
    console.log (result);
    
    if ($('.countdown-container').innerText != "00:00:00") {
        clockDuration.style.backgroundImage = `conic-gradient(red 0deg, red ${deg}deg, white 0deg, white 360deg)`;
    }
    clearInterval (countdownSeconds);
    clearInterval (clockDurationCircle);
    result = Array.from (inputTime).reduce ((total ,input) => {
        total.push (parseInt (input.value));
        return total
    }, [])
    console.log (result);
    hours = result[0];
    minutes = result[1];
    seconds = result[2];
    times = hours*3600 + minutes*60 + seconds;
    console.log (times);
    playBtn.onclick = () => {
        playBtn.classList.toggle ("active");
        if (playBtn.classList.contains ("active")) {
            var currentTime = $(".countdown-container").innerText.split(':');
            var newTime = currentTime.reduce ((total, value, index) => {
                return total + ((index == 0) ? parseInt(value)*3600 : (index == 1) ? parseInt(value)*60 : parseInt(value))
            }, 0)
            console.log (newTime);
            clockDurationCircle = setInterval(() => {
                if (deg > 0) {
                    deg--;
                }
                clockDuration.style.backgroundImage = `conic-gradient(red 0deg, red ${deg}deg, white 0deg, white 360deg)`;
            }, (newTime)/deg*1000);

            countdownSeconds = setInterval(() => {
                console.log (true);
                if (seconds > 0) {
                    console.log (--seconds);
                    $('.countdown-container').innerText = (hours.toString().length == 2 ? hours : ('0' + hours)) + ":" + (minutes.toString().length == 2 ? minutes : ('0' + minutes))  + ":" +  (seconds.toString().length == 2 ? seconds : ('0' + seconds));
                }
                else if (seconds == 0 && minutes > 0) {
                    minutes--;
                    seconds = 59;
                    $('.countdown-container').innerText = (hours.toString().length == 2 ? hours : ('0' + hours)) + ":" + (minutes.toString().length == 2 ? minutes : ('0' + minutes))  + ":" +  (seconds.toString().length == 2 ? seconds : ('0' + seconds));
                }
                else if (minutes == 0 && seconds == 0 && hours > 0) {
                    hours--;
                    minutes = 59;
                    seconds = 59;
                    $('.countdown-container').innerText = (hours.toString().length == 2 ? hours : ('0' + hours)) + ":" + (minutes.toString().length == 2 ? minutes : ('0' + minutes))  + ":" +  (seconds.toString().length == 2 ? seconds : ('0' + seconds));
                }
                else if (hours == 0 && minutes == 0 && seconds == 0) {
                    clearInterval (countdownSeconds);
                    clearInterval (clockDurationCircle);
                }
            }, 1000);
        }
        else {
            clearInterval (countdownSeconds);
            clearInterval (clockDurationCircle);
        }
    }
}











