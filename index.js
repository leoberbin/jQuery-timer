$(document).ready(function(){
    const count = {
        min:{ break : 5,
              session : 25 },
        seg:0,
        reload: !1, 
        run:!1,
    };
    const color = (color1, color2, color3, color4)=>{
        $('#display').css({
            "border":"5px solid " + color2,
            "color":color1
        })
        $('#display>button').css({
            "border-top":"2px solid " + color2,
            "color":color3
        })
        $('#reset').css("border-left","2px solid " + color2);
        $('#clock').css("border", "10px solid " + color4);
        $('#center').css("background-color", color4);
    }
    const changeTimerTo = () =>{
        let label = $('#timer-label')[0].innerText;
        let min; 
        if(!count['reload']){
            count['reload'] = !0; 
            setTimeout(changeTimerTo, 1000);
        }else{
            count['reload'] = !1; 
            if(label.toLowerCase() === 'session'){
                min = count['min']['break'];
                label = 'break'
            }else{
                min = count['min']['session'];
                label = 'session'
            }; 
            $('#timer-label').text(label);
            const m = min >= 10 ? min.toString() : "0" + min.toString() ;
            $('#time-left').text( m + ":00");
            color('yellow', 'chartreuse', 'gray','gold');
            count.interval=setInterval(start_stop, 1000); 
        }; 
    };
    const start_stop = ()=>{
        count['seg'] !== 0 ? count['seg']-- : count['seg'] = 59;
        const time = $('#time-left')[0].innerText;
        let {seg} = count;
        let min = parseInt(time.match(/^\d{2}/).join(""));
        min > 0 && seg === 59 && min--;
        min===0 && seg > 0 &&
            color('red', 'red', 'red', '#FF7373');
        if(min===0 && seg===0){
            const sound=document.createElement('audio');
            sound.setAttribute('src', './assest/Beep_Short_05_Sound_Effect_Mp3_261.mp3'); 
            sound.setAttribute('id', 'beep');
            sound.play();
            $('#time-left').text( "00:00")
            clearInterval(count.interval)
            changeTimerTo()
        };
        const s = seg >= 10 ? seg.toString() : "0" + seg.toString() ;
        const m = min >= 10 ? min.toString() : "0" + min.toString() ;
        $('#time-left').text( m + ":" + s );
    };
    $('button').on('click', (event) => {
        const e = event.target.id;
        const src = e === 'start_stop' ? './assest/Beep_Short_03_Sound_Effect_Mp3_259.mp3' : !count.run ? './assest/Beep_Short_04_Sound_Effect_Mp3_260.mp3' : ''
        const audio = document.createElement('audio'); 
        audio.setAttribute('src', src);
        audio.play();
    })
    $('#break, #session').on('click', (event)=>{
        const e = event.target.value;
        if(e!==undefined){
            const m = e.replace(/-|\+/, "")
            const output ="#" + e.replace(/-|\+/, "-length");
            let {min, run} = count;
            if(!run){
                color('yellow', 'chartreuse', 'gray', 'gold');
                /\+$/.test(e) && min[m] < 60 && min[m]++ ;
                /-$/.test(e) && min[m] > 1 && min[m]-- ; 
                count['seg'] = 0; 
                let zero = min[m] < 10 ? "0" : ""
                $('#timer-label')[0].innerText === m.toUpperCase() && 
                $('#time-left').text(zero + min[m] + ":00")
            }; $(output).text(min[m]);
        };
    });
    $('#start_stop').on('click', (event)=>{
        const a = event.target.innerText;
        if(/play/i.test(a)){
            str = "stop";
            count.run = !0;
            count.interval=setInterval(start_stop, 1000);
        }else{
            str = "play";
            count.run=!1;
            clearInterval(count.interval);
        }; $('#start_stop').text(str); 
    });
    $('#reset').on('click', function(){
        clearInterval(count.interval)
        count['min']={break: 5, session: 25}; 
        count['seg']=0; 
        count.run=!1;
        $('#break-length').text('5');
        $('#session-length').text('25');
        $('#timer-label').text('session');
        $('#time-left').text('25:00');
        $('#start_stop').text('play'); 
        color('yellow', 'chartreuse', 'gray', 'gold');
    })
});