class Nemo{
    constructor(name,position){
        if(name == undefined){
            this.name = 'Nemo';
        }else{
            this.name = name;
        }
        let div = document.createElement('div');
        div.setAttribute('class','nemo');
        div.setAttribute('onclick','openConversation(nemo)');
        div.innerHTML = `
        <div class="head">
            <div class="eyesDiv">
                <div class="leftEye eye"></div>
                <div class="rightEye eye"></div>
            </div>
            <div class="mouth"></div>
            <div class="leftEar ear"></div>
            <div class="rightEar ear"></div>
        </div>
        <div class="body">
            <center><div class="logo">N</div></center>
        </div>`;
        let chatbar = document.createElement('div');
        chatbar.setAttribute('class','chatBar');
        chatbar.innerHTML = `
        <p class="title">Chat With <b>${this.name}</b></p>
        <div class="chat">
            <p class="chathint">start conversation with <b>${this.name}</b></p>
        </div>
        <input type="text" class="msginp" placeholder="enter message here" onkeydown="submitMsg(event,this.value,nemo)">
        <p class="poweredBy">powered by <a href="https://cybersykes.com"><b>Cyber Spot</b></a></p>`
        document.body.appendChild(div);
        document.body.appendChild(chatbar);
        this.processor = new WordProcessor();
        this.nemo = div;
        this.mouth = document.getElementsByClassName('mouth')[0];
        this.leftEye = document.getElementsByClassName('leftEye')[0];
        this.rightEye = document.getElementsByClassName('rightEye')[0];
        this.leftEar = document.getElementsByClassName('leftEar')[0];
        this.rightEar = document.getElementsByClassName('rightEar')[0];
        this.chatbar = chatbar;
        this.nemo.setAttribute('title',this.name);
        this.position = position;
        this.setPosition(this.position);
        this.sleeping = false;
        let blinkstyle = {
            "animation-name":"blink",
            "animation-iteration-count":"1",
            "animation-duration":".1s"
        }
        let blinkInterval = setInterval(() => {
            if(!this.sleeping){
                Object.assign(this.leftEye.style,blinkstyle);
                Object.assign(this.rightEye.style,blinkstyle);
                setTimeout(() => {
                    this.leftEye.style.animation = '';
                    this.rightEye.style.animation = '';
                }, 1950);
            }
        }, 2000);
        this.leftEye.removeAttribute('style');
    }
    frown(duration = null){
        this.resetFace()
        if(duration != null){
            this.leftEye.style.borderRadius = '10px 10px 0 0';
            this.rightEye.style.borderRadius = '10px 10px 0 0';
            this.mouth.style.borderRadius = '100% 100% 0 0';
            setTimeout(() => {
                this.resetFace();
            }, duration);
        }else{
            this.leftEye.style.borderRadius = '10px 10px 0 0';
            this.rightEye.style.borderRadius = '10px 10px 0 0';
            this.mouth.style.borderRadius = '100% 100% 0 0';
        }
        
    }
    smile(){
        this.resetFace()
        this.mouth.style.borderRadius = '0 0 100% 100%';
        this.leftEye.style.borderRadius = '20px 20px 100% 100%';
        this.rightEye.style.borderRadius = '20px 20px 100% 100%';
    }
    talk(){
        this.resetFace();
        var style = {
            "animation-name":"talk",
            "animation-duration":"1s",
            "animation-iteration-count":"4",
            "animation-fill-mode":"both"
        }
        setTimeout(() => {
            Object.assign(this.mouth.style,style);
        }, 1);
    }
    setPosition(pos){
        var style = null,
        cssroot = document.documentElement.style;
        if(pos == 'tl'){
            cssroot.setProperty('--botMsgFloat','left');
            cssroot.setProperty('--userMsgFloat','right');
            style = {
                'top':'50px',
                'left':'50px',
                'right':'unset',
                'bottom':'unset'
            }

        }else if(pos == 'tr'){
            cssroot.setProperty('--botMsgFloat','right');
            cssroot.setProperty('--userMsgFloat','left');
            style = {
                'top':'50px',
                'left':'unset',
                'right':'130px',
                'bottom':'unset'
            }
        }else if(pos == 'bl'){
            cssroot.setProperty('--botMsgFloat','left');
            cssroot.setProperty('--userMsgFloat','right');
            style = {
                'top':'unset',
                'left':'50px',
                'right':'unset',
                'bottom':'50px'
            }
        }else if(pos == 'br'){
            cssroot.setProperty('--botMsgFloat','right');
            cssroot.setProperty('--userMsgFloat','left');
            style = {
                'top':'unset',
                'left':'unset',
                'right':'50px',
                'bottom':'50px'
            }
        }
        this.position = pos;
        Object.assign(this.nemo.style,style)
    }
    getShocked(){
        this.resetFace()
        this.mouth.style.borderRadius = '50%';
        this.mouth.style.transform = 'scaleX(0.5)';
        this.leftEye.style.transform = 'translateY(-5px)';
        this.rightEye.style.transform = 'translateY(-5px)';
    }
    normal(){
        this.resetFace()
    }
    sleep(){
        //this.sleeping = true;
        let style = {
            "transform":"scaleY(0.1)"
        }
            Object.assign(this.leftEye.style,style);
            Object.assign(this.rightEye.style,style); 
            Object.assign(this.mouth.style,style);   
    }
    wakeUp(){
        this.sleeping = false;
        this.resetFace();
    }
    angry(){
        let style = {
            "border-radius":"0px 0px 100% 100%",
        }
        Object.assign(this.leftEye.style,style);
        Object.assign(this.rightEye.style,style);
    }
    resetFace(){
        this.mouth.removeAttribute('style');
        this.leftEye.removeAttribute('style');
        this.rightEye.removeAttribute('style');
    }
    sendMessage(msg){
        let hint = document.querySelector('.chathint');
        if(hint != null && hint != undefined){
            hint.remove();
        }
        let temp = document.querySelector('.loadicon');
        if(temp == undefined || temp == null){
            this.chatbar.children[1].innerHTML += `
        <div class="loadicon">
            <div class="loading loading1"></div>
            <div class="loading loading2"></div>
            <div class="loading loading3"></div>
        </div>`;
        }
        document.querySelector('.chat').scrollTo(0,document.querySelector('.chat').scrollHeight);
        setTimeout(() => {
            if(document.querySelector('.loadicon') != undefined && document.querySelector('.loadicon') != null){
                this.chatbar.children[1].removeChild(document.querySelector('.loadicon'));
            }
            this.talk();
            this.chatbar.children[1].innerHTML += `<div class='msgC'><div class="botmsg msg">${msg}</div><div>`;
            document.querySelector('.chat').scrollTo(0,document.querySelector('.chat').scrollHeight);
        }, 2000);
        
    }
    getMessage(msg){
        let callback;
        if(msg == '' || msg == null){
            return;
        }
        if(this.processor.hasCussWord(msg)){
            this.angry();
            return;
        }
        let hint = document.querySelector('.chathint');
        if(hint != null && hint != undefined){
            hint.remove();
        }
        let forme = this.processor.processIn(msg);
        let words = forme.split(' ');
        let dict,answer,temp,word;
        // processing input and getting output
            for(var i = 0; i < words.length;i++){
                word = this.processor.processIn(words[i]);
                if(this.processor.isToBe(word)){
                    continue;
                }
                for(var j = 0;j < this.processor.dictionary.length;j++){
                    dict = this.processor.dictionary[j];
                    temp = Object.keys(dict).indexOf(word);
                    if(temp >= 0){
                        // word is in keys, get corresponding value
                        answer = Object.values(dict)[temp];
                        break;
                    }else if((temp = Object.values(dict).indexOf(word)) >= 0){
                        // word is in values, then get corresponding key
                        answer = Object.keys(dict)[temp];
                        break;
                    }else{
                        // word not found exactly searching for a match
                        for(var k = 0;k < Object.keys(dict).length;k++){
                            // matched word with a key
                            if(word.indexOf(Object.keys(dict)[k]) >= 0){
                                answer = Object.keys(dict)[k];
                                break;
                            }else if(word.indexOf(Object.values(dict)[k]) >=0 ){
                                // matched word with a value
                                answer = Object.values(dict)[k];
                                break;
                            }
                        }
                    }
                }
            }
            if(answer == undefined){
                // check actions
                let acts = this.processor.actions;
                if(forme.indexOf('time') >= 0){
                    answer = acts['time'];
                }else if(forme.indexOf('date') >= 0){
                    answer = acts['date'];
                }else if(forme.indexOf('smile') >= 0){
                    answer = acts['smile'];
                    callback = this.smile;
                }else if(forme.indexOf('sad') >= 0){
                    answer = acts['sad'];
                    callback = this.frown;
                }else if(forme.indexOf('sleep') >= 0){
                    answer = acts['sleep'];
                    callback = this.sleep;
                }
            }
            if(answer == undefined){
                answer = this.processor.noAnswer[parseInt(Math.random()*(this.processor.noAnswer.length))];
            }
        msg = this.processor.capitalize(msg);
        this.chatbar.children[1].innerHTML += `<div class='msgC'><div class="usermsg msg">${msg}</div></div>`;
        document.querySelector('.msginp').value = '';
        document.querySelector('.chat').scrollTo(0,document.querySelector('.chat').scrollHeight);
        setTimeout(() => {
                this.sendMessage(this.processor.processOut(answer));
        }, 500);
    }
}
function openConversation(obj){
    let div = document.querySelector('.chatBar'),
    nemo = document.querySelector('.nemo'),
    rect = nemo.getBoundingClientRect();
    let left,right,top,bottom;
    if(obj.position == 'tl'){
        left = (rect.width+100)+'px';
        top = rect.top;
    }else if(obj.position == 'tr'){
        top = rect.top;
        left = 'unset';
        right = rect.width+100+'px';
    }else if(obj.position == 'br'){
        right = rect.width+100+'px';
        top = 'unset';
        bottom = '50px';
    }else if(obj.position == 'bl'){
        left = rect.width+100+'px';
        top = 'unset';
        bottom = '50px';
    }
    let style = {
        'left':left,
        'top':top,
        'right':right,
        'bottom':bottom,
        'display':'block'
    }
    Object.assign(div.style,style);
}
function submitMsg(event,msg,nemo){
    if(event.keyCode == 13){
        nemo.getMessage(msg);
    }
}