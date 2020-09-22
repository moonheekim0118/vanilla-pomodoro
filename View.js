
// 렌더링 
var PomodoroView = function(PomodoroApp){

    let PomoNum;
    document.querySelector('.contents').addEventListener("click",(e)=>{
        if(e.target.className="startBtn"){
            PomoNum=1;
            document.querySelector('body').classList.add('work');
            PomodoroApp().startPomo(2);
        }
    })

    const storeTomato=()=>{
        const now = new Date().getDate();
        let expiredTime = localStorage.getItem('expiredTime')||0;
        if(expiredTime!==0){
            if(expiredTime===now){
                localStorage.setItem('tomato',0);
                localStorage.setItem('expiredTime',now+1);
            }
        }
        else{
            localStorage.setItem('expiredTime',now+1);
        }
        let doneTomatos = localStorage.getItem('tomato')||0;
        doneTomatos++;
        localStorage.setItem('tomato',doneTomatos);
        for(let i = 0 ; i < doneTomatos; i++){
            console.log('후후');
        }
    }

    const drawTime =(min,sec)=>{
        const zero = sec < 10 ? 0:'';
        document.querySelector('.contents').innerHTML=`
        <span class="title">재배중인 토마토</span>
        <div class="leftTime"></div>
        <span>${min}분 ${zero}${sec}초 후에 완료됩니다🤤</span>`;
    }

    const controlPomo=()=>{
        PomoNum++;
        if(PomoNum<=2){
            if(PomoNum%2!==0){ // work 
                document.querySelector('body').classList.add('work');
                PomodoroApp().startPomo(2);
            }
            else{
                document.querySelector('body').classList.remove('work');
                PomodoroApp().startPomo(1);
            }
        }
        else{
            document.querySelector('.contents').innerHTML=` <button class="startBtn">재배시작하기</button>`
            storeTomato();
        }
    }

    return {drawTime,controlPomo};
};
