(function($) {

  $.fn.inspectHTML = function(log) {
  
    var that = this;
    var html = that.html();
    var sanitizedHTML = html.replace(/\s+/g, ''); 
    
    log = log || false;  
   
    return that.each(function() { 
     
      $.each($(sanitizedHTML), function(prop, value) {
      
        
  var tag = value.tagName.toLowerCase();
  var content = value.innerHTML;
  
		  if(log) {

			console.log(tag + ' ' + content);
	  
		  } else {
		  
			alert(tag + ' ' + content);
		  
		  
		  }     
      });
   }); 
  
  };

})(jQuery);