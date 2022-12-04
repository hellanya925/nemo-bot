let position = 'tl';

        function showAppearanceTab() {
            let tab = document.querySelector('.atab');
            tab.style.transform = 'scale(1)';
        }

        function hideAppearanceTab() {
            let tab = document.querySelector('.atab');
            tab.style.transform = 'scale(0)';
        }
        // sets destination file
        function setFile(div) {
            let divs = document.getElementsByClassName('file');
            for (var i = 0; i < divs.length; i++) {
                if (divs[i] != div) {
                    div.removeAttribute('style');
                    div.removeAttribute('id');
                }
            }
            let divstyle = {
                "background-color": "green",
                'color': 'white'
            }
            Object.assign(div.style, divstyle);
            div.setAttribute('id', 'selectedFile');
        }

        function hideInstaller() {
            let obj = document.getElementsByClassName('installerC')[0],
                ins = document.querySelector('.installer'),
                bg = document.querySelector('.bg');
            obj.style.transform = 'scale(0)';
            ins.style.transform = 'scale(0)';
            but = document.getElementsByClassName('installerBut')[0];
            but.style.transform = '';
            bg.style.filter = '';
        }

        function showInstaller() {
            let obj = document.getElementsByClassName('installerC')[0],
                but = document.getElementsByClassName('installerBut')[0],
                ins = document.querySelector('.installer'),
                bg = document.querySelector('.bg');
            but.style.transform = 'scale(0)';
            obj.style.transform = 'scale(1)';
            ins.style.transform = 'scale(1)';
            bg.style.filter = 'blur(10px)';
        }

        function installNemo(editor) {
            editor.saveAppearance();
            let filename;
            if (document.querySelector('#selectedFile')) {
                filename = document.querySelector('#selectedFile').innerText;
            } else {
                return;
            }
            let botname = document.querySelector('.botname').value;
            if (botname == undefined || botname == '') {
                return;
            }
            let force = document.getElementsByClassName('force')[0];
            if (force.checked) {
                force = '1';
            } else {
                force = '0';
            }
            let installer = document.querySelector('.installer'),
                loading = document.querySelector('.loader'),
                loadercc = document.querySelector('.loadercc'),
                loaderP = document.querySelector('.loaderP');
            loadercc.style.transform = 'scaleY(1)';
            let xtp = new XMLHttpRequest();
            xtp.open('get', `./script.php?install=true&botname=${botname}&filename=${filename}&position=${position}&force=${force}`);
            xtp.onreadystatechange = () => {
                if (xtp.readyState == 4 && xtp.status == 200) {
                    if (xtp.responseText == '1') {
                        loaderP.innerText = `Installation Complete`;
                        loading.style.right = '0%';
                        installer.style.transform = 'scale(0)';
                    } else if (xtp.responseText == '0') {
                        loaderP.innerText = `The file '${filename}' has a version of this bot`;
                    } else {
                        loaderP.innerText = `${xtp.responseText}`;
                    }
                } else if (xtp.readyState == 1) {
                    loading.style.right = '100%';
                    loaderP.innerText = `Installing ${botname}`;
                } else if (xtp.readyState == 2) {
                    loading.style.right = '50%';
                    loaderP.innerText = `Please Be Patient`;
                } else if (xtp.readyState == 3) {
                    loaderP.innerText = `Getting Things Ready`;
                    loading.style.right = '75%';
                }
            }
            xtp.send();
        }

        // sets bot icon in the corner in position selection
        function setCornerIcon(corner) {
            // get corners in installer and add hover effect
            let corners = document.getElementsByClassName('c');
            for (var i = 0; i < corners.length; i++) {
                if (corners[i] == corner) {
                    continue
                }
                corners[i].innerHTML = '';
            }
            corner.innerHTML = '<img src="./assets/icons/robot-solid.svg">';
        }