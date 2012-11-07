 var capturaTexto = new String("null");
 var bindTexto= '';
 var YStexto = {
		criaCookie: function(){
				var tmp = '';
				//Browsers
				if(window.getSelection) {
					tmp = String(window.getSelection());
				//IE
				}else if(document.selection){
					tmp = document.selection.createRange().text;
				}else{
					tmp = "Seu browser não suporta a seleção de texto!";
				}
				/**
				 * Verifica se o texto está em branco
				 */
				if(tmp == ''){
					tmp = "Você deve selecionar algum texto!";
					if(bindTexto == ''){
					//
					}else{
						tmp = bindTexto;
					}
				}
				capturaTexto = escape(tmp);
				document.cookie = "youspeak=" + capturaTexto;
				bindTexto='';
		},
		deletaCookie: function(){
			document.cookie = "youspeak="+""+"-1";
		}
	};
(function($)
{
    //$('<style type="text/css">.qwertymk{border: 2px black solid} .NOqwertymk{border: none}</style>')
    //.appendTo('head');
    
    function aimedAt(evt){
        var $targ = $(evt.originalEvent.explicitOriginalTarget);  //This worked when it was a click event
        if ($targ[0].nodeType == Node.TEXT_NODE)//jQuery considers a TEXT_NODE
            $targ = $targ.parent();            //just a property of it's parent
        return $targ;
    }

    $(document).bind('click', function(e){
        var $el = aimedAt(e);
		//alert("NodeName " + e.target.nodeName);
		//alert("NodeValue " + e.target.nodeValue);
		//alert("NodeType " + e.target.nodeType);
		//alert("value " + e.target.value);
		//alert("innerHTML " + e.target.innerHTML);
		if((e.target.nodeName == 0) || (e.target.nodeName == "body") || (e.target.nodeName == "BODY")){
			//alert(e.target.data);
			//$($el).marcaTexto($($el).text());
			//alert(e.target.textContent);

			function textnodes(){
				function iterate(node){
					var nodes=node.childNodes
					var len=nodes.length
					for(var a=0;a<len;a++){
						if(nodes[a].nodeType==3){
							if(!nodes[a].nodeValue.match(/^[\s]*$/) ){
								//$(e.target.nodeName).marcaTexto(nodes[a].nodeValue);
								// armazena o texto do elemento
								var content = nodes[a].nodeValue;
								// pesquisa por termo no texto
								var re = new RegExp( content, 'i' );
								var result = content.match( re );
								// caso tenha encontrado ocorrências do texto...
								if( result ){
									// busca novamente, só que agora adicionando a marcação ao(s) termo(s)
									re = new RegExp( content, 'gi' );
									content = ('<span tabindex="0">' + '</span>');
									//content = content.replace( re, '<span>' + content + '</span>');
									//altera o HTML do elemento original
									//$(nodes[a].nodeValue).html( content );
									x = nodes[a];
									$(x).wrap(content);
									//nodes[a].nodeValue = content;
								}
							}else{
								if(nodes[a].nodeName.toLowerCase()!="script" ){
									iterate(nodes[a])
								}
							}
						}
					}
				}
				iterate(document.body)
			}
			textnodes()			
		}else{
			if(e.target.nodeName == "IMG" || e.target.nodeName == "INPUT"){
				if(e.target.nodeName == "IMG"){
					//alert(e.target.alt);
					//YouSoundChrome.BrowserOverlay.PassaValor(e.target.alt);
					bindTexto = "Imagem " + e.target.alt;
				}
				if(e.target.nodeName == "INPUT"){
					//alert(e.target.value);
					if(e.target.type == "text"){
						bindTexto = "Edição " + e.target.value;
					}else{
						bindTexto = "Botão " + e.target.value;
					}
				}
			}else{
				if(e.target.nodeName == "HTML"){
					//
				}else{
					//alert(e.target.textContent);
					if(e.target.nodeName == "A"){
						bindTexto = "Linque " + e.target.textContent;
					}else{
						bindTexto = e.target.textContent;
					}
				}
				// $el.css('border', '1px black solid');
				// $($el).marcaTexto($($el).text());
			}
		}
			console.log($el);
			e.preventDefault();
    });
	//Selecao de Texto
	

	//Fim Selecao de Texto
	
	var percorre = 0;
	var cont = 0;
	var nodes1 = new Array();
	$(document).ready(function() {

		function textnodes(){
			function iterate(node){
				var nodes=node.childNodes
				var len=nodes.length
				for(var a=0;a<len;a++){
					if(nodes[a].nodeType==3 || nodes[a].nodeName=="INPUT" || nodes[a].nodeName=="IMG" || nodes[a].nodeName=="A"){
						if(nodes[a].nodeName=="INPUT" || nodes[a].nodeName=="IMG" || nodes[a].nodeName=="A"){
							if(nodes[a].nodeName=="INPUT"){
								if(nodes[a].type == "text"){
									var content = nodes[a].value;
									nodes1[cont] = "Edição " + content;
									cont++;
								}else{
									var content = nodes[a].value;
									nodes1[cont] = "Botão " + content;
									cont++;
								}
							}
							if(nodes[a].nodeName=="IMG"){
								var content = nodes[a].alt;
								nodes1[cont] = "Imagem " + content;
								cont++;
							}
							if(nodes[a].nodeName=="A"){
								var content = nodes[a].textContent;
								nodes1[cont] = "Linque " + content;
								cont++;
							}
						}else{
							if(!nodes[a].nodeValue.match(/^[\s]*$/) ){
								// armazena o texto do elemento
								var content = nodes[a].nodeValue;
								// pesquisa por termo no texto
								var re = new RegExp( content, 'i' );
								var result = content.match( re );
								// caso tenha encontrado ocorrências do texto...
								if( result ){
									// busca novamente, só que agora adicionando a marcação ao(s) termo(s)
									re = new RegExp( content, 'gi' );
									nodes[a].nodeValue = content;
									nodes1[cont] = nodes[a].nodeValue;
									cont++;
								}
							}
						}
					}else{
						if(nodes[a].nodeName.toLowerCase()!="script" ){
							iterate(nodes[a])
						}
					}
				}
			}			
			iterate(document.body)
		}
		textnodes()
	});

	$(document).bind('keydown', function(e){

		var keyCode = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;
		
		if (keyCode == 16) { //shift
			//SelectText( $(this).next()[0] ); 
			//SelText();

		}
		if (keyCode == 40) { //down Arrow
			if(nodes1[percorre] == 'undefined' || nodes1[percorre] == null || nodes1[percorre] == ''){
				bindTexto ="Fim do documento";
				YStexto.criaCookie();
				percorre--;
			}else{
				//alert(nodes1[percorre]);
				bindTexto = nodes1[percorre];
				YStexto.criaCookie();

			}
			percorre++;
			//e.preventDefault();
		}
		
		if (keyCode == 38) { // up Arrow
			percorre--;
			if(percorre < 0){
				percorre = 0;
				bindTexto ="Início do documento";
				YStexto.criaCookie();
			}else{
				bindTexto = nodes1[percorre];
				YStexto.criaCookie();
			}
			//e.preventDefault();
		}
			console.log(e);
			//e.preventDefault();
    });
	
	$(document).mouseenter(function(){
		//$("body").toggleClass('NOqwertymk');
		//$("body").removeClass('qwertymk').addClass('NOqwertymk');
    }).mouseleave(function(){
		YStexto.criaCookie();
		//$("body").toggleClass('qwertymk');
		//$("body").removeClass('NOqwertymk').addClass('qwertymk');
    });

})(jQuery)