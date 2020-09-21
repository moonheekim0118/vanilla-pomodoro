
// 렌더링 
var PomodoroView = function(PomodoroApp){
    document.querySelector('.startBtn').addEventListener("click",()=>{
        document.querySelector('.contents').innerHTML=`<div class="leftTime"></div>
        <span>후에 완료됩니다...</span>`;
    })
};
