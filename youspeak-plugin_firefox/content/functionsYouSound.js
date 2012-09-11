	$(document).ready(function(){
	/*$("textbox, textarea, select, p, a, span").click(function(){
		alert($(this).text());
	});
	$("div").click(function(event){
		var text = '<$tag>$(this)</$tag>'.replace(/<[^<]+?>/g, '')
		alert($(this).text());
	});
	$("td").click(function(){
		alert($(this).text());
	});
	$("input").click(function(){
		alert($(this).val());
	});
	$("img").click(function(){
		alert($(this).attr('alt'));
	}); */
	//alert("ljgfoisdjgjokdrgoij");
});

function html2txt(html){ //
    var salida=html;

    salida=salida.replace(/&gt;/g,   '>');
    salida=salida.replace(/&lt;/g,   '<');
    salida=salida.replace(/&#039;/g, "'");
    salida=salida.replace(/&quot;/g, '"');
    salida=salida.replace(/&amp;/g,  '&');

    return salida;
}