class WordProcessor{
    constructor(){
        let today = new Date();
        setInterval(() => {
            today.setSeconds(today.getSeconds()+1)
        }, 950);
        this.dictionary = [
            {'hi there':'heyy','hey':'hey you!','hello':'howdy','hi':'hey there,what can I do for you'},
            {'bye':'bye bye','see you':'later','see ya':'don\'t be late!'},
            {'bot':'who? me? ofcourse!','are you a bot':'yes, and im a nemo!'},
        ];
        this.actions = {'time':`the time is: ${today.toLocaleTimeString()}`
        ,'date':`today is: ${today.toLocaleDateString()}`
        ,'sleep':'good night','smile':':P','sad':'...','surprise':'WOW!'};
        this.noAnswer = ['come again?','try again','didnt get that'];
        this.qwords = ['how','when','where','what','why','who','whom'];
        this.cussWords = ['shit','idiot','damn','crap','ass'];
    }
    capitalize(word){
        let temp = word.charAt(0);
        temp = temp.toUpperCase();
        word = word.slice(1);
        word = temp+word;
        return word;
    }
    processIn(msg){
        msg = msg.toLowerCase();
        msg = msg.replace(/[^A-Za-z0-9-\s]/g,'');
        let words = msg.split(' ');
        for(var i = 0;i < words.length;i++){
            if(words[i] == 'u'){
                words[i] = 'you';
            }
            if(words[i] == 'i\'m'){
                words[i] = 'im';
            }
        }
        return words.join(' ');
    }
    processOut(msg){
        msg = msg.toLowerCase();
        msg = msg.replaceAll('nt','n\'t');
        let words = msg.split(' ');
        for(var i = 0;i < words.length;i++){
            if(words[i] == 'u'){
                words[i] = 'you';
            }
            if(words[i] == 'im' || words[i] == 'i\'m'){
                words[i] = 'I\'m';
            }
            if(words[i] == 'i'){
                words[i] ='I';
            }
        }
        return this.capitalize(words.join(' '));
    }
    isQuestion(msg){
        let words = msg.split(' '),
        isq;
        for(var i = 0;i < words.length;i++){
            if(this.qwords.indexOf(words[i]) >= 0){
                if(i == words.length-1){
                    isq = true;
                }else if(this.isToBe(words[i+1])){
                    isq = true;
                }else{
                    isq = false;
                }
            }
        }
        return isq;
    }
    hasCussWord(msg){
        let words = msg.split(' ');
        for(var i = 0;i < words.length;i++){
            if(this.cussWords.indexOf(words[i]) >= 0 || words[i].indexOf(this.cussWords[i]) >= 0){
                return true;
            }
        }
        return false;
    }
    isToBe(word){
        let be = ['is','am','are','were','was'];
        if(be.indexOf(word) >= 0){
            return true;
        }
        return false;
    }
}
let tr = new WordProcessor();
let p = tr.hasCussWord('hi shit');
console.log(p);