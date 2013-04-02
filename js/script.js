/*
	Author: Rafael Mayrink
	Job:IPizza | Projeto academico
	descrition: Project academic TCC
	date:23/10/12
*/
		//numero randomico
		function aleatorio(inferior,superior){
			
			numPosibilidades = superior - inferior ; 
			aleat = Math.random() * numPosibilidades ; 
			return Math.round(parseInt(inferior) + aleat) ; 
		}
		
		function numero_aleatorio(){
			minimo = 999 ; 
			maximo = 9999 ;
			resultado = aleatorio(minimo,maximo) ;
			document.ConcluirCompra.NumeroPedido.value = "Nº do pedido: "+resultado ;
		}

		//geolocation
        function initGeoLocalizacao() {
            if (navigator.geolocation){
                navigator.geolocation.getCurrentPosition(locSucesso, erro);
            } else {
                $('#status').text('Seu browser não suporta geolocalização!');
            }
        }
 
        function locSucesso(position) {
            var latLong = position.coords.latitude+","+position.coords.longitude;
            $("#latlng").val(latLong);
            $('#status').text("Confira seu endereço!");
            $('#status').css({
            	'padding':'5px'
            }, $('#geolocalizacao').remove());

            var geocoder;
            var map;
            var infowindow = new google.maps.InfoWindow();
            var marker; 

              geocoder = new google.maps.Geocoder();
              var latlng = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
        var mapOptions = {
                zoom: 8,
                center: latlng,
                mapTypeId: 'roadmap'
        }
        map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);

              var input = document.getElementById('latlng').value;
              var latlngStr = input.split(',', 2);
              var lat = parseFloat(latlngStr[0]);
              var lng = parseFloat(latlngStr[1]);
              var latlng = new google.maps.LatLng(lat, lng);
              geocoder.geocode({'latLng': latlng}, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                  if (results[1]) {
                    map.setZoom(11);
                    marker = new google.maps.Marker({
                        position: latlng,
                        map: map
                    });
                    infowindow.setContent(results[0].formatted_address);
                    infowindow.open(map, marker);

                    $(".endereco").val(results[0].formatted_address);
                  } else {
                    alert('Não foram encontrados resultados');
                  }
                } else {
                  alert('Geolocalização falhou devido a ' + status);
                }
              });

        }
 
        function erro(error) {
            $('#status').text(error == typeof msg == 'string' ? msg : "falha ao localizar, digite seu endereço!");
            $('#status').css({
            	'padding':'5px'
            }, $('#geolocalizacao').hide());
            $('.endereco').focus();
 
        }

        var ua = navigator.userAgent.toLowerCase();
		var isiPad = ua.match(/ipad/i) != null;
		var isiPhone = ua.match(/iphone/i) != null;
		var isAndroid = ua.indexOf("android") > -1;
 
$(function(){
	//gera numero do pedido aleatorio
	numero_aleatorio();

	//Verifica se a vizualizacao esta sendo feita em android ou ipad iphone
	if(isiPad || isiPhone){
        setTimeout(scrollTo, 100, 0, 1);
    	$("#geolocalizacao , input.number").show();
    	$("input.cep , label.cep , input.string , .1").remove();	      
	} else if (isAndroid){
        window.scrollTo(0,1);
        $("#geolocalizacao , input.number").show();
        $("input.cep , label.cep , input.string , .1").remove();
	}else{
		$("input.cep , input.string").show();
		$(".number").remove();
	}

	//variaveis globais
	var $resultado = $(".resultado");
	var $resultadoValor = $resultado.val();
	var $ValorPag = $(".valorCompra");
	//console.log($ValorPag);

	//FUN1 - função que arredonda valor monetário
	function format(number){
		var formatad = Math.round(number*100)/100;
		return formatad;
	}

	//Inseri na DIV.RESULTADO o valor inicial 0
	$resultado.val(parseFloat($resultadoValor));
	
	//FUN2 - função que da scroll
	function scrolling(id){
		$('html, body').animate({scrollTop : $("#"+id).offset().top}, 'slow');
	}

	//FUN3 - soma os elementos
	function somaElem(){
		//Se selecionado soma ao resultado final
		$total = parseFloat($resultadoValor) + parseFloat($valor);
		$resultadoValor = format($total);
		$resultado.val(format($total));
		$ValorPag.val("Valor R$ " + format($resultadoValor));
	}

	//FUN4 - função que exclui elemento do valor final e da lista
	function DeleteElem(){
		//Se o numero de itens for menor que 1 o texto de apoio desaparece
		$ItemSelection = $("ul#listHide li").length;
		if($ItemSelection <= 1){
			$("#textSelection").hide();
		}

		//Se selecionado revome o valor do resultado final
		$total = parseFloat($resultadoValor) - parseFloat($valor);
		$resultadoValor = format($total);
		$resultado.val(format($total));
		$ValorPag.val("Valor R$ " + format($resultadoValor));

		//Identifica o ID do item selecionado
		$Identif = $this.attr("id");
		
		//Caso o ID seja igual a descrição exclui o item da lista
		if($Identif = $Descric.replace(/\s*/g, "")){
			$("ul#listHide").find("#"+$Identif).remove();
		}

	}
	$(".closeRequest").hide();

    $("#geolocalizacao").click(function(){
    	$(this).css({
    		"background":"url(img/load.gif) no-repeat center left"
    	});
      initGeoLocalizacao();
    });

	$(".star , #logo").click(function(){
		$("#Selecaopizzas").show(0, function(){
			$(".descricao , .star").remove();
			scrolling("Selecaopizzas");
		});	
	});

	$(".closeRequest").click(function(){
		$("#FormcloseRequest").show(0, function(){
			scrolling("FormcloseRequest");
		});
	});

	$(".flagCard img").click(function(){
		$(".flagCard img").css({
			"opacity":"1.0"
		});
		$(this).css({
			"opacity":"0.4"
		});
	});
	
	$(".pizzas").click(function(){								
		
		//variaveis locais						 
		$this = $(this);
		$opacityElem = $this.css("opacity");
		$valor = $this.val();
		$Descric = $this.next("p").stop().html();
		$clasSelection = $("#pizzasSelection .selection").length;
		$clasSelection++;
		//console.log($clasSelection);

		
			if($opacityElem == 1){

				if($clasSelection > 1){
					return false;
				}else{

					$(this).css({
						"opacity":"0.8",
						"border-color":"#D5D500",
						"-moz-box-shadow": "0px 0px 8px 2px #000", /* Firefox */
	  					"-webkit-box-shadow": "0px 0px 8px 2px yellow", /* Safari, Chrome */
	  					"box-shadow": "0px 0px 8px 2px yellow" /* CSS3 */
					}).addClass("selection");

					//Mostra texto de Apoio da lista
					$("#textSelection, .escolhaIngrediente").show();

					//chama a função scroll
					scrolling("OpIngre");

					//chama a função que soma os valores
					somaElem();					
					
			 		//Insere conteudo selecionado na lista de descricao
					$ListaOculta = $("ul#listHide");
					$ListaOculta.prepend("<li class='PizzasSelect' id=" + $Descric.replace(/\s*/g, "") + ">Uma " + String($Descric) + " com:</li>");
				}
					
			}else{			
				$(this).css({
					"opacity":"1",
					"border-color":"#CCC",
					"border-color":"#AAAA00",
					"-moz-box-shadow": "0px 0px 8px 2px #CC0000", /* Firefox */
  					"-webkit-box-shadow": "0px 0px 8px 2px #CC0000", /* Safari, Chrome */
  					"box-shadow": "0px 0px 8px 2px #CC0000" /* CSS3 */					
				}).removeClass("selection");

				//FUN4
				DeleteElem();

				$("#ConfPedido , .escolhaIngrediente , #FormcloseRequest").hide();
				
			}
	});
	


	$(".product").click(function(){
								 
		//variaveis locais						 
		$this = $(this);
		$opacityElem = $this.css("opacity");
		$valor = $this.val();
		$Descric = $this.next("p").html();

		NumIngredient = $(".Vproduct").length;

		if(NumIngredient > 1){
			$(".closeRequest , #ConfPedido").show();
		}else{
			$("#FormcloseRequest , #ConfPedido").hide();
			NumIngredient = 0;
		}
		
			if($opacityElem == 1){
				$(this).css({
					"opacity":"0.8",
					"border-color":"#D5D500",
					"-moz-box-shadow": "0px 0px 8px 2px #000", /* Firefox */
  					"-webkit-box-shadow": "0px 0px 8px 2px yellow", /* Safari, Chrome */
  					"box-shadow": "0px 0px 8px 2px yellow" /* CSS3 */
				});

				//FUN3
				somaElem();
				
				//Mostra texto de Apoio da lista
				$("#textSelection").show();

		 		//Insere conteudo selecionado na lista de descricao
				$ListaOculta = $("ul#listHide");
				$ListaOculta.append("<li class='Vproduct' id=" + $Descric.replace(/\s*/g, "") + ">" + String($Descric) + "</li>");


			}else{
				$(this).css({
					"opacity":"1",
					"border-color":"#CCC",
					"border-color":"#AAAA00",
					"-moz-box-shadow": "0px 0px 8px 2px #CC0000", /* Firefox */
  					"-webkit-box-shadow": "0px 0px 8px 2px #CC0000", /* Safari, Chrome */
  					"box-shadow": "0px 0px 8px 2px #CC0000" /* CSS3 */					
				});

				//FUN4
				DeleteElem();
			}
	});

	//PLACE HOLDER
	$("input[placeholder] , textarea[placeholder]").each(function(el){
		if($(this).val()==""){
		  $(this).val($(this).attr("placeholder")).addClass("placeholder");
	}
	$(this).focus(function(){
		  if($(this).val()==$(this).attr("placeholder")){
			$(this).removeClass("placeholder").val("");   
		  }
	});
	$(this).blur(function(){
		  if($(this).val()==""){
			$(this).addClass("placeholder").val($(this).attr("placeholder"));
		  }
		});            
	}); 
	$("form").submit(function(){
		$("input[placeholder] , textarea[placeholder]").each(function(n,element){
		  if($(element).val()==$(element).attr("placeholder")){
			return false; 
		  }
		});
	});


			   
});





