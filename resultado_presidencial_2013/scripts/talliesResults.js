
var myTable;
var globalTableName;
var CAFound = false;
var globalShowTally = false;
var globalShowTallyImage = false;
var globalPathImage;

function displayTally(name,lvgCode,contest,pathTally,pathImage,tableName,showTally,showImage){
	globalTableName = tableName;
	globalShowTally = showTally;
	globalShowTallyImage = showImage;
	globalPathImage = pathImage;
	
	if($("#"+name).is(':visible')){
		$("#"+name).hide('slow');
		return;
	}

	myTable = document.getElementById(globalTableName);
	if(myTable.childElementCount <= 1){	
		d3.json(pathTally, function(tally){ 
			if(tally != undefined ){
				addTally(tally);
				$("#"+name).show('slow');
			}			
			
			// Reset the globalName
			globalTableName="";
		});
	}else{
		$("#"+name).show('slow');
	}
	
}

function addTally(tally){

	myTable = document.getElementById(globalTableName);
	
	/* Add global vars */
	addTallyGlobalParameters(myTable,tally);
	
	/* Add option register */
	if(globalShowTally){
		if(tally.optionsRegister != undefined && tally.optionsRegister.length > 0){
			for(var i=0;i<tally.optionsRegister.length;i++){
				var option = tally.optionsRegister[i];
				addOptionRegister(option,myTable);
			}
		}
	}
	
	/* Add image */
	if(globalShowTallyImage){
		addTallyImage(myTable,tally);
	}

}

function addOptionRegister(option,myTable){
   	var newTR = document.createElement("tr");
	newTR.setAttribute('class','tblightrow');

   	var ballotName = document.createElement("td");
   	ballotName.setAttribute('class','lightRowContent');
   	ballotName.setAttribute('align','left');
   	ballotName.setAttribute('width','60%');
   	ballotName.innerHTML = option.ballotName;;

	
   	var partyName = document.createElement("td");
	partyName.setAttribute('class','lightRowContent');
	partyName.setAttribute('align','left');
	partyName.setAttribute('width','30%');    	
	partyName.innerHTML = option.partyAbb;

   	var votes = document.createElement("td");
	votes.setAttribute('class','lightRowContent');
	votes.setAttribute('align','right');
	votes.setAttribute('width','10%');    	
	votes.innerHTML = option.amount;
   
	newTR.appendChild(ballotName);  
	newTR.appendChild(partyName);  
	newTR.appendChild(votes);  

	myTable.appendChild(newTR);
}

function addTallyImage(myTable,tally){
	
	$.ajax({
		  type: "GET",
		  url: globalPathImage,
		  success: function()
		  { var newTR = document.createElement("tr");
			newTR.setAttribute('class','tblightrow');

		   	var tallyImageTd = document.createElement("td");
		   	tallyImageTd.setAttribute('class','lightRowContent');
		   	tallyImageTd.setAttribute('align','center');
		   	tallyImageTd.setAttribute('width','100%');
		   	tallyImageTd.setAttribute('colspan','3');
		   	tallyImageTd.innerHTML = '<span><img src="'+globalPathImage+'" title="'+tally.number+'"/></span>';

			   
			newTR.appendChild(tallyImageTd);  
			myTable.appendChild(newTR);},
		  error: function(xhr, status, error) {
		    if(xhr.status==404)
		      { /** not found! **/}
		  }
		});
   	
}


function addTallyGlobalParameters(myTable,tally){
   	var newTR = document.createElement("tr");
	newTR.setAttribute('class','tblightrow');

   	var tallyImageTd = document.createElement("td");
   	tallyImageTd.setAttribute('class','lightRowContent');
   	tallyImageTd.setAttribute('align','center');
   	tallyImageTd.setAttribute('width','100%');
   	tallyImageTd.setAttribute('colspan','3');
   	tallyImageTd.innerHTML = tally.number;

	   
	newTR.appendChild(tallyImageTd);  
	myTable.appendChild(newTR);
}

function addLastCATr(){
	myTable = document.getElementById(globalTableName);
	var newTR = document.createElement("tr");
	newTR.setAttribute('class','tblightrow');
	
	var caInformation = document.createElement("td");
   	caInformation.setAttribute('class','lightRowContent');
   	caInformation.setAttribute('align','left');
  	caInformation.setAttribute('colspan','5');
   	caInformation.setAttribute('width','100%');
   	caInformation.innerHTML = "<font color='#990000'> * </font> Opciones con cambios de alianza";

	newTR.appendChild(caInformation);  
	myTable.appendChild(newTR);
}