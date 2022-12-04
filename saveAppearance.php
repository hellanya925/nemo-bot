<?php
$str_json = file_get_contents('php://input');
$json = json_decode($str_json, true);
$data = $json["data"];
$first = ':root{
        --botMsgFloat: left;
        --userMsgFloat:right;
    }
    @keyframes talk {
        0%{border-radius: 10px;}
        20%{transform: scaleY(0.1);}
        40%{
            transform: scaleY(1);
            border-radius: 5px 5px 100% 100%;
        }
        60%{transform: scaleX(0.5);border-radius: 50%;}
        80%{border-radius: 10px;transform: scaleX(1);}
        100%{border-radius: 10px 10px 100% 100%;}
    }
    @keyframes moveMouth{
        0%{transform: scaleY(0.5);}
        100%{transform: scaleY(1);}
    }
    @keyframes eyesRight {
        0%{transform: translateX(1px);}
        1000%{transform: translateX(0px);}
    }
    @keyframes eyesLeft {
        0%{transform: translateX(-1px);}
        1000%{transform: translateX(0px);}
    }
    @keyframes logo{
        0%{border-top-color: green}
        100%{transform: rotateZ(360deg);border-top-color: green;}
    }
    @keyframes blink {
        0%{transform: scaleY(1);}
        50%{transform: scaleY(0.1);}
        100%{transform: scaleY(1);}
    }
    @keyframes hover {
        0%{transform: translateY(10px);}
        100%{transform: translateY(0px);}
    }
    @keyframes loading {
        0%{transform: translateY(-5px);}
        100%{transform: translateY(0px);}
    }
    .chatBar{
        position: absolute;
        display: none;
        scroll-behavior: smooth;
    
    }
    .chathint{
        text-align: center;
        color: gray;
    }
    .title{
        border-bottom: 1px solid gray;
    }
    .chat{
        transition-duration: .5s;
        padding: 10px;
        border-radius: 15px;
        background-color: white;
        border: 5px solid #e4e5e2;
        transition-duration: .5s;
        min-height: 100px;
        max-height: 200px;
        overflow-y: auto;
    }
    .msg{
        background-color: lightgreen;
        border-radius: 10px;
        padding: 10px;
        max-width: 80%;
        width: fit-content;
        margin-top: 10px;
    }
    .msgC{
        display: block;
        width: 100%;
        overflow: hidden;
    }
    .botmsg{
        float: var(--botMsgFloat);
        max-width: 80%;
    }
    .usermsg{
        float: var(--userMsgFloat);
    }
    .msginp{
        margin-top: 15px;
        border-radius: 10px;
        border: 5px solid #e4e5e2;
        padding-left: 10px;
    
    }
    .loading{
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: gray;
        transition-duration: .1s;
        float: var(--botMsgFloat);
        margin: 5px;
        animation-name: loading;
        animation-iteration-count: infinite;
        animation-direction: alternate;
        animation-fill-mode: both;
        animation-duration: .6s;
        animation-timing-function: ease-in-out;
    }
    .loading1{
        animation-delay: 0s;
    }
    .loading2{
        animation-delay: .3s;
    }
    .loading3{
        animation-delay: .6s;
    }
    .poweredBy{
        display: block;
        width: 100%;
        text-align: left;
        font-size: 10px;
    }';
$final = $first .PHP_EOL. $data;
$file = fopen('./NemoFiles/nemo.css', 'w');
fwrite($file, $final);
fclose($file);
echo 1;