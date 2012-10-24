var YouSpeakPlugin = function(){
	var prefManager = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
	return{
		init : function(){
			gBrowser.addEventListener("load", function(){
				var autoRun = prefManager.getBoolPref("extensions.youspeakplugin.autorun");
				if(autoRun){
					YouSpeakPlugin.run();
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
			scriptElem.src = 'chrome://yousound/content/mespeak.js'; 
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
window.addEventListener("load", YouSpeakPlugin.init, false);