var element = document.createElement("YouSpeakDataElement");
element.setAttribute("textoYouSpeak","text2AddonYS");
document.documentElement.appendChild(element);

var evt = document.createEvent("Events");
evt.initEvent("keydown", true, false);
element.dispatchEvent(evt);