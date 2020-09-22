
// Pomodoro 시작
// Pomodoro 멈춤
let stoppedMin=0;
let stoppedSec=0;
const audio = new Audio('./resources/alertSound.wav');
// Pomodoro 정보 저장 담당
var PomodoroApp = function(){
    var startTime,afterTime,distance;
    var min, sec,x;
    var startPomo=(time)=>{ // 처음 시작 
        startTime=new Date();
        afterTime=new Date(startTime);
        afterTime.setMinutes(startTime.getMinutes()+time);
        app.drawState();
        audio.play();
        changeTime();
    }
    var changeTime=()=>{ // 남은 시간 변경 
        x = setInterval(() => {
            startTime=new Date();
            distance = afterTime.getTime()-startTime.getTime();
            min = Math.floor((distance%(1000*60*60))/(1000*60));
            sec = Math.floor((distance%(1000*60))/1000);
            stoppedMin=min;
            stoppedSec=sec;
            if(playStatus==='stop'){
                clearInterval(x);
            }
            else if(distance <=0){
                clearInterval(x);
                app.controlPomo();
            }
            else if(min!==-1 && sec !==-1){
                app.drawTime(min,sec);}
        }, (1000));
    }

    var restartPomo=()=>{ // 멈췄다가 재시작
        startTime=new Date();
        afterTime=new Date(startTime);
        console.log(stoppedMin , stoppedSec);
        afterTime.setMinutes(afterTime.getMinutes()+stoppedMin);
        afterTime.setSeconds(afterTime.getSeconds()+stoppedSec);
        changeTime();
    }

    return {startPomo, changeTime, restartPomo};

};
