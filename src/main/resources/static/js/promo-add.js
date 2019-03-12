//Função para cagelogar as Metatags
$("#linkPromocao").on("change", function(){
	var url = $(this).val();//recuperar valor do linkPromocao
	
	if(url.length > 7){
		
		$.ajax({
			method: "POST",
			url: "/meta/info?url="+url,
			cache: false,
			beforeSend: function(){
				$("#alert").removeClass("alert alert-danger").text("");
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