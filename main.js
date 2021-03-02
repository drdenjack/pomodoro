
function animateTheTomato() {
    playSquishSound();
    var elem = document.getElementById("tomatoImg");
    var id = setInterval(frame, 1000);

    var angle = 0;
    elem.style.transform = "rotate(" + angle + "deg)";

    function frame() {
        console.log('Animating ...');
        if (angle < 180) {
            angle += 20;
            console.log("rotating to " + angle + "deg");
            elem.style.transform = "rotate(" + angle + "deg)";
        }
        else {
            clearInterval(id);
        }
    }
}

function playSounds(sounds) {
    const numSounds = sounds.length
    if (numSounds > 0) {
        var s1 = document.getElementById(sounds[0]);
        s1.play();
        s1.addEventListener('ended', (ev) => {
            var fewerSounds = sounds.slice(1, numSounds);
            console.log('fewerSounds: ' + fewerSounds);
            playSounds(fewerSounds);
        })
    }
}

function playSquishSound() {
    const sounds = [
        "splatSound",
        "mooSound"
    ];
    playSounds(sounds);
}

function getTimeStr(numSeconds) {
    var mm = Math.floor(numSeconds/60);
    var ss = numSeconds % 60;
    if (mm < 10) {mm = "0"+mm;}
    if (ss < 10) {ss = "0"+ss;}
    return mm + ":" + ss;
}

const app = Vue.createApp({
    data: function() {
        return{
            startTime: 25.0,
            remainingTime: 1500,
            remainingTimeStr: "25:00",
            showMouseover: false,
            mouseoverText: "Slowly squish the tomato!",
            tomatoSquished: false,
            tomatoAngle: 0,
            timerId: null
        }
    },
    methods: {
        clickTheTomato() {
            console.log('you clicked the tomato!!');
            if(this.tomatoSquished) {
                console.log('stopping!');
                if(this.timerId) { clearInterval(this.timerId); }
                this.tomatoSquished = false;
                this.updateTime(this.startTime);
                playSquishSound();
            }
            else {
                console.log('starting ...');
                this.tomatoSquished = true;
                this.timerId = setInterval(countDownFrame.bind(this), 1000);

                function countDownFrame() {
                    if (this.remainingTime > 0) {
                        this.remainingTime -= 1;
                        this.remainingTimeStr = getTimeStr(this.remainingTime);
                    }
                    else {
                        clearInterval(this.timerId);
                        playSquishSound();
                    }
                }
            }
        },
        updateTime(newTimeMin) {
            console.log('the start time changed to: ' + newTimeMin);
            this.startTime = newTimeMin;
            this.remainingTime = newTimeMin * 60;
            this.remainingTimeStr = getTimeStr(this.remainingTime);
        },
        mouseoverTomato() {
            console.log("it's hover time!")
            this.showMouseover = true;
        }
    }
})