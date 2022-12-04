class Editor {
  constructor() {
    this.selected;
    this.head = document.querySelector(".head");
    this.leye = document.querySelector(".leftEye");
    this.reye = document.querySelector(".rightEye");
    this.mouth = document.querySelector(".mouth");
    this.body = document.querySelector(".body");
    this.lear = document.querySelector(".leftEar");
    this.rear = document.querySelector(".rightEar");
    (this.logo = document.querySelector(".logo")),
      (this.colorI = document.querySelector(".color"));
    this.bordercolorI = document.querySelector(".bordercolor");
    this.btr = document.querySelector(".btr");
    this.btl = document.querySelector(".btl");
    this.bbr = document.querySelector(".bbr");
    this.bbl = document.querySelector(".bbrl");
    this.width = document.querySelector(".width");
    this.height = document.querySelector(".height");
    this.elements = [
      this.head,
      this.body,
      this.leye,
      this.reye,
      this.mouth,
      this.lear,
      this.rear,
      this.logo,
    ];
    var temp;
    for (var i = 0; i < this.elements.length; i++) {
      temp = this.elements[i];
      temp.addEventListener("click", (event) => {
        this.selected = event.target;
        this.setProperties(event, event.target);
      });
    }
    let cheight = document.querySelector(".nemoC").getBoundingClientRect().y;
    document.querySelector(".nemo").style.height = cheight + "px";
    document.querySelector(".nemo").style.paddingTop = "50px";
  }
  setProperties(event, div) {
    event.stopPropagation();
    let rect = div.getBoundingClientRect(),
      maxwidth = rect.height,
      maxheight = rect.height;
    if (
      localStorage.getItem(div.getAttribute("class") + "maxwidth") ==
        undefined ||
      localStorage.getItem(div.getAttribute("class") + "maxwidth") == null
    ) {
      localStorage.setItem(div.getAttribute("class") + "maxwidth", maxwidth);
      localStorage.setItem(div.getAttribute("class") + "maxheight", maxheight);
    } else {
      maxwidth = localStorage.getItem(div.getAttribute("class") + "maxwidth");
      maxheight = localStorage.getItem(div.getAttribute("class") + "maxheight");
    }

    let color = document.querySelector(".color"),
      borderwidth = document.querySelector(".borderwidth"),
      borderradius = document.querySelector(".borderradius"),
      bordercolor = document.querySelector(".bordercolor"),
      width = document.querySelector(".width"),
      height = document.querySelector(".height"),
      marginl = document.querySelector('.marginleft'),
      margint = document.querySelector('.margintop'),
      obj = window.getComputedStyle(div);
    // set defaults
    width.setAttribute("max", `${maxwidth * 1.5}`);
    height.setAttribute("max", `${maxheight * 1.5}`);

    // px number values
    borderwidth.setAttribute(
      "value",
      parseInt(obj.getPropertyValue("border-width"))
    );
    borderwidth.value = parseInt(obj.getPropertyValue("border-width"));
    borderwidth.parentNode.children[1].innerText =
      obj.getPropertyValue("border-width");
    borderradius.setAttribute(
      "value",
      parseInt(obj.getPropertyValue("border-radius"))
    );
    borderradius.value = parseInt(obj.getPropertyValue("border-radius"));
    borderradius.parentNode.children[1].innerText =
      obj.getPropertyValue("border-radius");
    width.setAttribute("value", parseInt(obj.getPropertyValue("width")));
    width.value = parseInt(obj.getPropertyValue("width"));
    width.parentNode.children[1].innerText = obj.getPropertyValue("width");
    height.setAttribute("value", parseInt(obj.getPropertyValue("height")));
    height.value = parseInt(obj.getPropertyValue("height"));
    height.parentNode.children[1].innerText = obj.getPropertyValue("height");
    marginl.setAttribute(
      "value",
      parseInt(obj.getPropertyValue("margin-left"))
    );
    marginl.value = parseInt(obj.getPropertyValue("margin-left"));
    marginl.parentNode.children[1].innerText =
      obj.getPropertyValue("margin-left");
      margint.setAttribute(
        "value",
        parseInt(obj.getPropertyValue("margin-top"))
      );
      margint.value = parseInt(obj.getPropertyValue("margin-top"));
      margint.parentNode.children[1].innerText =
        obj.getPropertyValue("margin-top");
    // colors
    let colorval;
    if (isHex(obj.getPropertyValue("background-color"))) {
      colorval = obj.getPropertyValue("background-color");
    } else {
      colorval = rgbToHex(obj.getPropertyValue("background-color"));
    }
    color.setAttribute("value", colorval);
    color.value = colorval;
    bordercolor.setAttribute(
      "value",
      rgbToHex(obj.getPropertyValue("border-color"))
    );
    bordercolor.value = rgbToHex(obj.getPropertyValue("border-color"));
  }
  setProperty(inpdiv) {
    let prop = inpdiv.getAttribute("prop");
    if (this.selected == undefined) {
      return;
    }
    let unit = "";
    if (!isNaN(parseInt(inpdiv.value))) {
      unit = "px";
    }
    if (prop == "width") {
      let inpleft = parseFloat(
          window.getComputedStyle(this.selected).getPropertyValue("left")
        ),
        selwidth = parseFloat(
          window.getComputedStyle(this.selected).getPropertyValue("width")
        );
      if (selwidth > inpdiv.value) {
        this.selected.style.left =
          inpleft + (selwidth - inpdiv.value) / 2 + "px";
      } else {
        this.selected.style.left =
          inpleft + (selwidth - inpdiv.value) / 2 + "px";
      }
    }
    this.selected.style[inpdiv.getAttribute("prop")] = inpdiv.value + unit;
    if (inpdiv.parentNode.children.length == 2) {
      inpdiv.parentNode.children[1].innerText = inpdiv.value + unit;
    }
  }
  resetAppearance(event) {
    for (var i = 0; i < this.elements.length; i++) {
      this.elements[i].removeAttribute("style");
    }
    this.selected == undefined ? 0 : this.setProperties(event, this.selected);
  }
  saveAppearance() {
    let headstyle = window.getComputedStyle(this.head),
      bstyle = window.getComputedStyle(this.body),
      leyes = window.getComputedStyle(this.leye),
      reyes = window.getComputedStyle(this.reye),
      mstyle = window.getComputedStyle(this.mouth),
      lears = window.getComputedStyle(this.lear),
      rears = window.getComputedStyle(this.rear),
      logos = window.getComputedStyle(this.logo),
      nemo = `.nemo{
        -webkit-user-select:none;
        user-select: none;
        transition-duration: 1s;
        position: absolute;
        display:flex;
        flex-direction:column;
        justify-content:center;
        align-items:center;
    }
    .nemo *{
        transition-duration: .5s;
        box-sizing:border-box;
    }
    .head{
        border-radius: ${headstyle.getPropertyValue("border-radius")};
        background-color: ${headstyle.getPropertyValue("background-color")};
        border: ${headstyle.getPropertyValue(
          "border-width"
        )} solid ${headstyle.getPropertyValue("border-color")};
        height: ${headstyle.getPropertyValue("height")};
        width: ${headstyle.getPropertyValue("width")};
        margin-left: ${headstyle.getPropertyValue("margin-left")};
        margin-top: ${headstyle.getPropertyValue("margin-top")};
        position:relative;
        display:flex;
        flex-direction:column;
        justify-content:center;
        box-sizing: border-box;
    }
    .eye{
        border-radius: 50%;
        background-color: black;
        top: 27px;
        transition-duration: 0.1s;
        position: absolute;
    }
    .leftEye {
        border-radius: ${leyes.getPropertyValue("border-radius")};
        background-color: ${leyes.getPropertyValue("background-color")};
        height: ${leyes.getPropertyValue("height")};
        width: ${leyes.getPropertyValue("width")};
        border: ${leyes.getPropertyValue(
          "border-width"
        )} solid ${leyes.getPropertyValue("border-color")};
        left: 6px;
    }
    
    .rightEye {
        border-radius: ${reyes.getPropertyValue("border-radius")};
        background-color: ${reyes.getPropertyValue("background-color")};
        height: ${reyes.getPropertyValue("height")};
        width: ${reyes.getPropertyValue("width")};
        border: ${reyes.getPropertyValue(
          "border-width"
        )} solid ${reyes.getPropertyValue("border-color")};
        right: 6px;
    }
    .mouth{
        transition-duration: .1s;
        border-radius: ${mstyle.getPropertyValue("border-radius")};
        background-color: ${mstyle.getPropertyValue("background-color")};
        height: ${mstyle.getPropertyValue("height")};
        width: ${mstyle.getPropertyValue("width")};
        border: ${mstyle.getPropertyValue(
          "border-width"
        )} solid ${mstyle.getPropertyValue("border-color")};
        position: absolute;
        margin-left: ${mstyle.getPropertyValue("margin-left")};
        margin-top: ${mstyle.getPropertyValue("margin-top")};
        bottom: 15px;
        right: 25px;
    }
    .ear{
        z-index: -1;
        position: absolute;
        background-color: #b4b1aa;
        height: 20px;
        width: 10px;
    }
    .leftEar{
        border-radius: ${lears.getPropertyValue("border-radius")};
        background-color: ${lears.getPropertyValue("background-color")};
        height: ${lears.getPropertyValue("height")};
        width: ${lears.getPropertyValue("width")};
        border: ${lears.getPropertyValue(
          "border-width"
        )} solid ${lears.getPropertyValue("border-color")};
        margin-left: ${lears.getPropertyValue("margin-left")};
        left:-10px;
        top: 25px;
        border-top-left-radius: 50%;
        border-bottom-left-radius: 50%;
    }
    .rightEar{
        border-radius: ${rears.getPropertyValue("border-radius")};
        background-color: ${rears.getPropertyValue("background-color")};
        height: ${rears.getPropertyValue("height")};
        width: ${rears.getPropertyValue("width")};
        border: ${rears.getPropertyValue(
          "border-width"
        )} solid ${rears.getPropertyValue("border-color")};
        margin-left: ${rears.getPropertyValue("margin-left")};
        right: -10px;
        top: 25px;
        border-top-right-radius: 50%;
        border-bottom-right-radius: 50%;
    }
    .body{
        border-radius: ${bstyle.getPropertyValue("border-radius")};
        background-color: ${bstyle.getPropertyValue("background-color")};
        height: ${bstyle.getPropertyValue("height")};
        width: ${bstyle.getPropertyValue("width")};
        border: ${bstyle.getPropertyValue(
          "border-width"
        )} solid ${bstyle.getPropertyValue("border-color")};
        margin-left: ${bstyle.getPropertyValue("margin-left")};
        margin-top: 20px;
        animation-name: hover;
        animation-duration: 2s;
        animation-timing-function: ease-in-out;
        animation-iteration-count: infinite;
        animation-direction: alternate;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .logo{
        border-radius: ${logos.getPropertyValue("border-radius")};
        background-color: ${logos.getPropertyValue("background-color")};
        height: ${logos.getPropertyValue("height")};
        width: ${logos.getPropertyValue("width")};
        border: ${logos.getPropertyValue(
          "border-width"
        )} solid ${logos.getPropertyValue("border-color")};
        margin-left: ${logos.getPropertyValue("margin-left")};
        margin-top: ${logos.getPropertyValue("margin-top")};
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        font-weight: bolder;
        padding: 5px;
        box-sizing: border-box;
    }
    .logo:hover{
        animation-name: logo;
        animation-duration: 1s;
        animation-iteration-count: infinite;
        animation-fill-mode: both;
        animation-direction: alternate;
    }`;
    console.log(nemo)
    let xtp = new XMLHttpRequest(),
      notif = document.querySelector(".notif");
    xtp.open("post", "../../saveAppearance.php",true);
    xtp.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
    xtp.onreadystatechange = () => {
      if (xtp.readyState == 4 && xtp.status == 200) {
        if (xtp.responseText == "1") {
          notif.style.transform = "scale(1)";
          notif.innerText = "Done";
          setTimeout(() => {
            notif.style.transform = 'scale(0)';
          }, 3000);
        } else {
          console.log(xtp.responseText);
        }
      }
    };
    xtp.send(JSON.stringify(
      {'data':nemo}));
  }
}
function itoHex(int) {
  return int.toString(16);
}

function isHex(str) {
  return str.indexOf("#") >= 0;
}

function isRgb(str) {
  return str.indexOf("rgb") >= 0;
}

function rgbToHex(str) {
  str = str.replaceAll(" ", "");
  let arr = str.split(",");
  for (var i = 0; i < arr.length; i++) {
    arr[i] = arr[i].replace(/\D/g, "");
  }
  let rr =
      itoHex(parseInt(arr[0])).length == 1
        ? "0" + itoHex(parseInt(arr[0]))
        : itoHex(parseInt(arr[0])),
    gg =
      itoHex(parseInt(arr[1])).length == 1
        ? "0" + itoHex(parseInt(arr[1]))
        : itoHex(parseInt(arr[1])),
    bb =
      itoHex(parseInt(arr[2])).length == 1
        ? "0" + itoHex(parseInt(arr[2]))
        : itoHex(parseInt(arr[2]));
  return `#${rr}${gg}${bb}`;
}

function hover(event, obj) {
  event.stopPropagation();
  obj.style.boxShadow = "2px 2px 10px black,-2px -2px 10px black";
}

function unhover(event, obj) {
  event.stopPropagation();
  obj.style.boxShadow = "";
}
