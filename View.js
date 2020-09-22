
// 렌더링 
var PomodoroView = function(PomodoroApp){

    let PomoNum;
    const beep=()=>{
        audio.play(); 
    }
    document.querySelector('.contents').addEventListener("click",(e)=>{
        if(e.target.className="startBtn"){
            PomoNum=1;
            PomodoroApp().startPomo(2);
        }
    })


    const drawTime =(min,sec)=>{
        document.querySelector('.contents').innerHTML=`
        <span class="title">재배중인 토마토</span>
        <div class="leftTime"></div>
        <span>${min} : ${sec}후에 완료됩니다...</span>`;
    }

    const controlPomo=()=>{
        PomoNum++;
        if(PomoNum<=2){
            if(PomoNum%2!==0){ // work 
                PomodoroApp().startPomo(2);
                beep();
            }
            else{
                PomodoroApp().startPomo(1);
                beep();
            }
        }
        else{
            document.querySelector('.contents').innerHTML=` <button class="startBtn">재배시작하기</button>`
        }
    }

    return {drawTime,controlPomo};
};
