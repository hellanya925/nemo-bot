<?php
$dir = scandir('../');
$filesdiv = '<div class="files"><p class="title">Destination File:</p>';
function getFileExtension($file)
{
    $temp = '';
    for ($i = strlen($file) - 1; $i >= 0; $i--) {
        if ($file[$i] == '.') {
            for ($j = $i + 1; $j < strlen($file); $j++) {
                $temp .= $file[$j];
            }
            break;
        }
    }
    return $temp;
}
$suitable = 0;
for ($i = 2; $i < sizeof($dir); $i++) {
    $temp = getFileExtension($dir[$i]);
    if ($temp == 'html' || $temp == 'php') {
        $suitable++;
        $filesdiv .= '
    <div class="file" onclick="setFile(this)">
        ' . $dir[$i] . '
    </div>
    ';
    }
}
$filesdiv .= '</div>';
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./assets/style/bootstrap.min.css">
    <link rel="stylesheet" href="./assets/style/installer.css">
    <!-- appearance editor functions -->
    <script src="./assets/script/appearanceeditor.js"></script>
    <script src="./assets/script/installer.js"></script>
</head>

<body>
    <!-- bg -->
    <img class="bg" src="./assets/images/cubes.jpg">
    <!-- startup button -->
    <div class="container d-flex justify-content-center align-items-center">
        <img src="./assets/icons/download.svg" class="installerBut" onclick="showInstaller()">
    </div>
    <!-- startup button ends here -->

    <!-- installer starts here -->
    <div class="installerC">
        <div class="installer">
            <div class="row d-flex justify-content-around align-items-center">
                <div class="installertitle col">Install Nemo</div>
                <img src="./assets/icons/x-solid.svg" class="exit" style="float: right;text-align:end;cursor: pointer;" onclick="hideInstaller()">
            </div>
            <form onsubmit="return false;">
                <div class="card">
                    <p class="title">Name:</p>
                    <input type="text" class="form-control botname" placeholder="give me a name">
                </div>
                <div class="card filedivC">
                    <?php if($suitable == 0){
                        echo $filesdiv.'<p>No suitable files found in the current directory.<br>Please put the executable in the same directory of an <b>html</b> or <b>php</b> file</p>';
                    }else{
                        echo $filesdiv;
                    }
                     ?>
                </div>
                <div class="card">
                    <p class="title">Position:</p>
                    <div class="cornerSelection">
                        <div class="c ctl" onclick="position = 'tl';setCornerIcon(this)"><i></i></div>
                        <div class="c ctr" onclick="position = 'tr';setCornerIcon(this)"><i></i></div>
                        <div class="c cbr" onclick="position = 'br';setCornerIcon(this)"><i></i></div>
                        <div class="c cbl" onclick="position = 'bl';setCornerIcon(this)"><i></i></div>
                    </div>
                </div>
                <div class="card">
                    <div class="form-check-inline d-flex justify-content-between">
                        <span class="title">Overwrite Installation:</span>
                        <input type="checkbox" class="force form-check">
                    </div>
                </div>
                    <button class="btn btn-dark w-100" onclick="showAppearanceTab()">Customize Appearance</button>
                <button onclick="installNemo(editor)" class="installBut">Install</button>
            </form>
        </div>
        <div class="loadercc">
            <p class="loaderP"></p>
            <div class="loaderC">
                <div class="loader"></div>
            </div>
        </div>
    </div>
    <div class="atab">
        <img src="./assets/icons/x-solid.svg" class="atabexit" height="20px" width="20px" style="cursor:pointer;float: right;margin:20px" onclick="hideAppearanceTab()">
        <p class="title">Customize Appearance</p>
        <div class="nemoC">
            <div class="nemo">
                <div class="head" onclick="" onmouseover="hover(event,this)" onmouseout="unhover(event,this)">
                    <div class="leftEye eye" onmouseover="hover(event,this)" onmouseout="unhover(event,this)"></div>
                    <div class="rightEye eye" onmouseover="hover(event,this)" onmouseout="unhover(event,this)"></div>
                    <div class="mouth" onmouseover="hover(event,this)" onmouseout="unhover(event,this)"></div>
                    <div class="leftEar ear" onmouseover="hover(event,this)" onmouseout="unhover(event,this)"></div>
                    <div class="rightEar ear" onmouseover="hover(event,this)" onmouseout="unhover(event,this)"></div>
                </div>
                <div class="body" onmouseover="hover(event,this)" onmouseout="unhover(event,this)">
                    <center>
                        <div class="logo" onmouseover="hover(event,this)" onmouseout="unhover(event,this)">N</div>
                    </center>
                </div>
            </div>
        </div>
        <div class="tools">
            <div class="row propbar">
                <div class="col-6">Color:</div>
                <div class="col-6">
                    <input type="color" class="color colorI" oninput="editor.setProperty(this)" prop="background-color">
                </div>
            </div>
            <div class="row propbar">
                <div class="col-6">
                    Border Width:
                </div>
                <div class="col-6">
                    <input type="range" min="0" value="0" class="borderwidth" oninput="editor.setProperty(this)" prop="border-width">
                    <span>0px</span>
                </div>
            </div>
            <div class="row propbar">
                <div class="col-6">Border Color:</div>
                <div class="col-6">
                    <input type="color" class="bordercolor colorI" oninput="editor.setProperty(this)" prop="border-color">
                </div>
            </div>
            <div class="row propbar">
                <div class="col-6">Border Radius:</div>
                <div class="col-6">
                    <input type="range" max="50" min="0" value="0" class="borderradius" oninput="this.parentNode.children[1].innerText = this.value;editor.setProperty(this)" prop="border-radius">
                    <span>0px</span>
                </div>
            </div>
            <div class="row propbar">
                <div class="col-6">
                    Width
                </div>
                <div class="col-6">
                    <input type="range" min="10"  value="0" class="width" oninput="editor.setProperty(this)" prop="width">
                    <span>0px</span>
                </div>
            </div>
            <div class="row propbar">
                <div class="col-6">
                    Height:
                </div>
                <div class="col-6">
                    <input type="range" min="10" value="0" class="height" oninput="editor.setProperty(this)" prop="height">
                    <span>0px</span>
                </div>
            </div>
            <div class="row propbar">
                <div class="col-6">
                    X:
                </div>
                <div class="col-6">
                    <input type="range" min="0" value="0" class="marginleft" oninput="editor.setProperty(this)" prop="margin-left">
                    <span>0px</span>
                </div>
            </div>
            <div class="row propbar">
                <div class="col-6">
                    Y:
                </div>
                <div class="col-6">
                    <input type="range" min="0" value="0" class="margintop" oninput="editor.setProperty(this)" prop="margin-top">
                    <span>0px</span>
                </div>
            </div>
            <div class="controlbuts">
                <button onclick="editor.resetAppearance(event)" class="controlbut">reset</button>
                <button onclick="editor.saveAppearance()" class="controlbut">save</button>
            </div>
        </div>
        <div class="notif"></div>
    </div>

    <!-- installer ends here -->
    <!-- rights p -->
    <p class="rights">&copy;</p>
    <script>
        let editor = new Editor();
        document.querySelector('.rights').innerText = `Cyber Spot Tech ${new Date().getFullYear()} ` + document.querySelector('.rights').innerText;
    </script>
</body>

</html>