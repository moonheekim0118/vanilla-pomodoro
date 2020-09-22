
// Pomodoro 시작
// Pomodoro 멈춤

const audio = new Audio('./resources/alertSound.wav');
// Pomodoro 정보 저장 담당
var PomodoroApp = function(){
    var startTime;
    var afterTime;
    var distance;
    var min, sec;
    var startPomo=(time)=>{ // 처음 시작 
        startTime=new Date();
        afterTime=new Date(startTime);
        afterTime.setMinutes(startTime.getMinutes()+time);
        changeTime();
    }
    var changeTime=()=>{ // 남은 시간 변경 
        audio.play();
        var x = setInterval(() => {
            startTime=new Date();
            distance = afterTime.getTime()-startTime.getTime();
            min = Math.floor((distance%(1000*60*60))/(1000*60));
            sec = Math.floor((distance%(1000*60))/1000);
            app.drawTime(min,sec);
            if(distance <=0){
                clearInterval(x);
                app.controlPomo();
            }
        }, (1000));
    }

    var restartPomo=()=>{ // 멈췄다가 재시작
        startTime=new Date();
        afterTime=new Date(startTime);
        afterTime.setMinutes(startTime.getMinutes()+min);
        afterTime.setSeconds(startTime.getSeconds()+sec);
        changeTime();
    }

    return {startPomo, changeTime, restartPomo};

};
