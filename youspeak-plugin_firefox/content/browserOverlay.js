 /*
 * YouSound namespace.
 */
if ("undefined" == typeof(YouSoundChrome)) {
  var YouSoundChrome = {};
};
/**
 * Controls the browser overlay for the YouSound extension.
 */
YouSoundChrome.BrowserOverlay = {
	sayHello : function(aEvent) {
		//window.alert("daew Guri!");
		//speak(text.value, {amplitude: amplitude.value, wordgap: wordgap.value, pitch: pitch.value, speed: speed.value});// return false;
		//alert('Bem vindo ao YouSound');// return false;

	},
	YSCopy : function() {
		/*alert('01');
		var tmp_cookie = document.cookie;
		alert('tmp_cookie: ' + tmp_cookie);
		var qlinha = tmp_cookie.split("yousound=");
		alert('qlinha: '+qlinha)
		var tmp_cookie2 = unescape(qlinha[1]);
		alert(tmp_cookie2);*/
		var tmp ='';
		var cookieManager = Components.classes["@mozilla.org/cookiemanager;1"]
							.getService(Components.interfaces.nsICookieManager);
		var iter = cookieManager.enumerator;
		while (iter.hasMoreElements()){
			var cookie = iter.getNext();
			if(cookie instanceof Components.interfaces.nsICookie){
				if(cookie.name == "yousound"){
					tmp = unescape(cookie.value);
				}
			}
		}
        /**
         * "Cola" o texto
         */
        $('#result-copy').val(tmp);	
	}
};
YouSoundChrome.YouSpeak = {
	say : function(text) {								
		/*this.prefs = Components.classes["mozilla.org/preferences-serce;1"]
			.getService(Components.interfaces.nsIPrefService)
			.getBranch("yousound.");
		this.prefs.QueryInterface(Components.interfaces.nsIPrefBranch2);
		this.prefs.addObserver("", this, false);*/
		
		var speakWorker;
		try {
		  speakWorker = new Worker("chrome://yousound/content/speakWorker.js");
		} catch(e) {
		  console.log('speak.js warning: no worker support - ' + e);
		}
						
	},
	hello : function (text, args) {

		text = "Welcome";
		  function parseWav(wav) {
			function readInt(i, bytes) {
			  var ret = 0;
			  var shft = 0;
			  while (bytes) {
				ret += wav[i] << shft;
				shft += 8;
				i++;
				bytes--;
			  }
			  return ret;
			}
			if (readInt(20, 2) != 1) throw 'Invalid compression code, not PCM';
			if (readInt(22, 2) != 1) throw 'Invalid number of channels, not 1';
			return {
			  sampleRate: readInt(24, 4),
			  bitsPerSample: readInt(34, 2),
			  samples: wav.subarray(44)
			};
		  }

		  function playHTMLAudioElement(wav) {
			function encode64(data) {
			  var BASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
			  var PAD = '=';
			  var ret = '';
			  var leftchar = 0;
			  var leftbits = 0;
			  for (var i = 0; i < data.length; i++) {
				leftchar = (leftchar << 8) | data[i];
				leftbits += 8;
				while (leftbits >= 6) {
				  var curr = (leftchar >> (leftbits-6)) & 0x3f;
				  leftbits -= 6;
				  ret += BASE[curr];
				}
			  }
			  if (leftbits == 2) {
				ret += BASE[(leftchar&3) << 4];
				ret += PAD + PAD;
			  } else if (leftbits == 4) {
				ret += BASE[(leftchar&0xf) << 2];
				ret += PAD;
			  }
			  return ret;
			}
			var doc = gBrowser.selectedBrowser.contentDocument;
			doc.getElementById("audio").innerHTML=("<audio id=\"player\" src=\"data:audio/x-wav;base64,"+encode64(wav)+"\">");
			doc.getElementById("player").play();
		  }

		  function playAudioDataAPI(data) {
			try {
			  var output = new Audio();
			  output.mozSetup(1, data.sampleRate);
			  var num = data.samples.length;
			  var buffer = data.samples;
			  var f32Buffer = new Float32Array(num);
			  for (var i = 0; i < num; i++) {
				var value = buffer[i<<1] + (buffer[(i<<1)+1]<<8);
				if (value >= 0x8000) value |= ~0x7FFF;
				f32Buffer[i] = value / 0x8000;
			  }
			  output.mozWriteAudio(f32Buffer);
			  return true;
			} catch(e) {
			  return false;
			}
		  }

		  function handleWav(wav) {
			var data = parseWav(wav); // validate the data and parse it

			// TODO: try playAudioDataAPI(data), and fallback if failed
			playHTMLAudioElement(wav);
		  }

		  if (args && args.noWorker) {
			// Do everything right now. speakGenerator.js must have been loaded.
			handleWav(generateSpeech(text, args));
		  } else {
			// Call the worker, which will return a wav that we then play
			speakWorker.onmessage = function(event) {
			  handleWav(event.data);
			};
			speakWorker.postMessage({ text: text, args: args });
		  }
		}
};
YouSoundChrome.InsertJS = function(){
	var prefManager = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
	return{
		init : function(){
			gBrowser.addEventListener("load", function(){
				var autoRun = prefManager.getBoolPref("extensions.yousound.autorun");
				if(autorun){
					YouSoundChrome.InsertJS.run();
				}
			}, false);
		},
		run : function(){
			var scriptElem = content.document.createElement("script"); 
			scriptElem.type = "text/javascript"; 
			scriptElem.src = 'chrome://yousound/content/jquery.js'; 
			content.document.getElementsByTagName('head')[0].appendChild(scriptElem); 

			var scriptElem = content.document.createElement("script"); 
			scriptElem.type = "text/javascript"; 
			scriptElem.src = 'chrome://yousound/content/InspectElement.js'; 
			content.document.getElementsByTagName('head')[0].appendChild(scriptElem); 
			
			var scriptElem = content.document.createElement("script"); 
			scriptElem.type = "text/javascript"; 
			scriptElem.src = 'chrome://yousound/content/InspectElement_bind.js'; 
			content.document.getElementsByTagName('head')[0].appendChild(scriptElem); 
			
			var scriptElem = content.document.createElement("script"); 
			scriptElem.type = "text/javascript"; 
			scriptElem.src = 'chrome://yousound/content/functionsYouSound.js'; 
			content.document.getElementsByTagName('head')[0].appendChild(scriptElem);
			
			var scriptElem = content.document.createElement("script"); 
			scriptElem.type = "text/javascript"; 
			scriptElem.src = 'chrome://yousound/content/speakClient.js'; 
			content.document.getElementsByTagName('head')[0].appendChild(scriptElem);
			
			var scriptElem = content.document.createElement("div"); 
			scriptElem.id = "audio"; 
			content.document.getElementsByTagName('body')[0].appendChild(scriptElem);
			
			//var scriptElem = content.document.createElement("applet"); 
			//scriptElem.setAttribute("name","YouSound");
			//scriptElem.setAttribute("width","100");
			//scriptElem.setAttribute("height","100");	
			//content.document.getElementsByTagName('body')[0].appendChild(scriptElem);
		}
	};
}();
window.addEventListener("load", YouSoundChrome.InsertJS.init, false);