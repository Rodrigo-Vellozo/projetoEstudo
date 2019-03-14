//submit do formulario para o controller
$("#form-add-promo").submit(function(evt){
	//bloquear o comportamento padrão do submit
	evt.preventDefault();
	
	var promo = {};
	promo.linkPromocao = $("#linkPromocao").val();
	promo.descricao = $("#descricao").val();
	promo.preco = $("#preco").val();
	promo.titulo = $("#titulo").val();
	promo.categoria = $("#categoria").val();
	promo.site = $("#site").text();
	promo.linkImagem = $("#linkImagem").attr("src");
	
	$.ajax({
		method: 'POST',
		url: '/promocao/save',
		data: promo,
		beforeSend: function(){
			//removendo as mensagens
			$("span").closest(".error-span").remove();
			
			//removendo as bordas vermelhas
			$("#categoria").removeClass("is-invalid");
			$("#preco").removeClass("is-invalid");
			$("#linkPromocao").removeClass("is-invalid");
			$("#titulo").removeClass("is-invalid");
			
			//habilita o loading
			$("#form-add-promo").hide();
			$("#loader-form").addClass("loader").show();
		},
		success:function(){
			$("#form-add-promo").each(function(){
				this.reset();
			});
			$("#linkImagem").attr("src", "/images/promo-dark.png");
			$("#site").text("");
			
			$("#alert").removeClass("alert alert-danger").addClass("alert alert-success").text("OK, promocao cadastrada com sucesso");
		},
		//pegando o erro no controller
		statusCode:{
			422:function(xhr){
				console.log("Error >>> ", xhr.status);
				var errors = $.parseJSON(xhr.responseText);
				$.each(errors, function(key, val){
					$("#"+key).addClass("is-invalid");
					$("#error-"+key).addClass("invalid-feedback").append("<span class='error-span'>"+val+"</span>");
				});
			}
		},
		error: function(){
			//console.log("Error >>> "+xhr.responseText);
			$("#alert").addClass("alert alert-danger").text("Não foi posível salvar a promoção!");
		},
		complete:function(){
			$("#loader-form").fadeOut(800, function(){
				$("#form-add-promo").fadeIn(250);
				$("#loader-form").removeClass("loader");
			});
		}
	})
});

//Função para cagelogar as Metatags
$("#linkPromocao").on("change", function(){
	var url = $(this).val();//recuperar valor do linkPromocao
	
	if(url.length > 7){
		
		$.ajax({
			method: "POST",
			url: "/meta/info?url="+url,
			cache: false,
			beforeSend: function(){
				$("#alert").removeClass("alert alert-danger alert-success").text("");
				$("#titulo").val("");
				$("#site").text("");
				$("#linkImagem").attr("src", "");
				$("#loader-img").addClass("loader");
			},
			success: function(data){
				console.log(data);
				$("#titulo").val(data.title);
				$("#site").text(data.site.replace("@",""));
				$("#linkImagem").attr("src", data.image);				
			},
			statusCode:{
				404: function(){
					$("#alert").addClass("alert alert-danger").text("Nenhuma informação pode ser recuperadadessa URL!");
					$("#linkImagem").attr("src", "/images/promo-dark.png");
				},
				500: function(){
					$("#alert").addClass("alert alert-danger").text("Ops... algo deu errado!");
					$("#linkImagem").attr("src", "/images/promo-dark.png");
				}
			},
			complete: function(){
				$("#loader-img").removeClass("loader");
			}
			
		})
		
	}
})