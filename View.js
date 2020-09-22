// 렌더링 
var PomodoroView = function(PomodoroApp){

    const $contents = document.querySelector('.contents');
    const $state = document.querySelector('.state');
    const $time = document.querySelector('.time');
    const $body = document.querySelector('body');
    const $playStatus=document.querySelector('.playStatus');
    let status="play";
    let state="재배";
    let PomoCnt;
    let max;
    const storeTomato=(num)=>{
        const now = new Date().getDate();
        let expiredTime = parseInt(localStorage.getItem('expiredTime'))||0;
        if(expiredTime!==0){
            if(expiredTime===now){
                localStorage.setItem('tomato',0);
                localStorage.setItem('expiredTime',now+1);
            }
        }
        else{
            localStorage.setItem('expiredTime',now+1);
        }
        let doneTomatos = parseInt(localStorage.getItem('tomato'))||0;
        doneTomatos+=num;
        localStorage.setItem('tomato',doneTomatos);
        document.querySelector('.completed').innerHTML=``;
        for(let i = 0 ; i < doneTomatos; i++){
            document.querySelector('.completed').innerHTML+=`<svg class="tomato" height="50" viewBox="0 0 128 128" width="50" xmlns="http://www.w3.org/2000/svg"><g><ellipse cx="64" cy="76.167" fill="#f7502f" rx="48.237" ry="45.333"/><path d="m92.9 106.576a1.75 1.75 0 0 1 -1.152-3.067 38.625 38.625 0 0 0 6.631-7.509 1.751 1.751 0 0 1 2.906 1.953 42.143 42.143 0 0 1 -7.233 8.2 1.744 1.744 0 0 1 -1.152.423z" fill="#d8351e"/><path d="m85.56 47a31.406 31.406 0 0 1 -16.37-2.44 12.843 12.843 0 0 1 -5.19 10.52 12.843 12.843 0 0 1 -5.19-10.52 31.406 31.406 0 0 1 -16.37 2.44s2.87-5.31 11.37-9.25c0 0-8.43-.75-13.5-3.66a85.146 85.146 0 0 1 16.06-4.31c1.19-.19 2.4-.35 3.62-.46 0-.02.01-.05.01-.07 1.46-8.08 4.86-15.71 8.7-22.75l5.27 2.87c-3.33 6.1-4.57 12.71-5 19.71v.02c0 .06-.01.12-.01.18a.66.66 0 0 0 -.01.14h.01c1.17.13 2.33.3 3.48.5a85.94 85.94 0 0 1 15.25 4.17c-5.07 2.91-13.5 3.66-13.5 3.66 8.5 3.94 11.37 9.25 11.37 9.25z" fill="#9adb07"/></g></svg>`
        }
    }

    const drawPlay=()=>{
        if(status==='stop'){
            $playStatus.innerHTML=`<i class="fas fa-play"></i>`;
        }
        else{
            $playStatus.innerHTML=`<i class="fas fa-stop-circle"></i>`;
        }
    }

    $contents.addEventListener("click",(e)=>{
        if(e.target.className='startBtn' && e.target.nodeName==="BUTTON"){
            PomoCnt=1;
            $body.classList.add('work');
            $contents.innerHTML='';
            $contents.appendChild($state);
            $contents.appendChild($time);
            $contents.appendChild($playStatus);
            document.querySelector('.history').classList.add('show');
            const id =parseInt(e.target.id);
            max = id + (id-1);
            PomodoroApp(state).startPomo(3);
            storeTomato(0);
        }
    })    

    $playStatus.addEventListener("click",(e)=>{
        status= status==="play"? "stop" : "play";
        if(status==="play"){
            playStatus="play";
            PomodoroApp(state).restartPomo();
        }
        else{
             playStatus="stop";
        }
        drawPlay();
    })


    const drawState=()=>{
        $state.innerHTML=` <span class="title">토마토 ${state} 중</span>`;
        drawPlay();
    }

    const drawTime =(min,sec)=>{
        const zero = sec < 10 ? 0:'';
        $time.innerHTML=`
        <div class="leftTime">  <span>${min}분 ${zero}${sec}초🤤</span></div>`;
    }

    const controlPomo=()=>{
        PomoCnt++;
        if(PomoCnt<=max){
            if(PomoCnt%2!==0){ // work 
                $body.classList.add('work');
                state="재배";
                PomodoroApp(state).startPomo(20);
            }
            else{
                $body.classList.remove('work');
                state="휴식"
                PomodoroApp(state).startPomo(5);
            }
        }
        else{
            $contents.innerHTML=` <button class="startBtn">재배시작하기</button>`
            storeTomato(1);
        }
    }

    return {drawTime,drawState,controlPomo};
};
