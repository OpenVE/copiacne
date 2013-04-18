function includePartyEndorsement(div,file){
	$("#"+div).load(file+" #cambioAlianza",function() {
		$("#"+div).attr("style","display:block");
	});
}