
var myTable2;
var globalTableName2 = "tablaResultados_tally_table";
var CAFound = false;


function displayTally(name,lvgCode){

	if($("#"+name).attr("name") == "table_displayed"){
		$("#"+name).attr("name","not_table_displayed");
		$("#"+name).attr("style","display:none");
		return;
	}

	myTable2 = document.getElementById(globalTableName2);	
	if(myTable2.childElementCount <= 1){
	
		var lvgArray = {};	
		var found = false;
		var tallyNullVotes;		
		var dir = "tallies/"+Math.floor(lvgCode/1000);
		
		d3.csv("../../"+dir+"/"+lvgCode, function(csvData) {
		    for (var i = 0; i < csvData.length; i++) {
					
			if(lvgCode == csvData[i].lvg){
			
				var ballot = {"name":csvData[i].name,"eligible":csvData[i].eligible,"ballot":csvData[i].ballot,"party":csvData[i].party,"amount":csvData[i].amount,"partyname":csvData[i].partyname,"eligiblenew":csvData[i].eligiblenew};
				lvgArray[csvData[i].eligible] = ballot 
		
				/* Set values */
				addRow(ballot);			
				found = true;
				tallyNullVotes = csvData[i].nullvotes;
			} else if(found){
				break;
			}
		    }

			if(tallyNullVotes != undefined){
				addNullVotesRow(+tallyNullVotes);
			}


		});

	}
	
	$("#"+name).attr("name","table_displayed");
	$("#"+name).show('slow');
}

function addRow(ballot){

	var ca = ballot.eligible != ballot.eligiblenew;
	CAFound = ca || CAFound;

	myTable2 = document.getElementById(globalTableName2);
   	var newTR2 = document.createElement("tr");
	newTR2.setAttribute('class','tblightrow');

	
   	var ballotName = document.createElement("td");
	ballotName.setAttribute('class','lightRowContent');
	ballotName.setAttribute('align','left');
	ballotName.innerHTML = '<span>'+ballot.name+'</span>';
   
   	var partyImage = document.createElement("td");
	partyImage.setAttribute('class','lightRowContent');
	partyImage.setAttribute('align','center');
	partyImage.innerHTML = '<span>'+ballot.partyname+'</span>';

   	var votesParty = document.createElement("td");
	votesParty.setAttribute('class','lightRowContent');
	votesParty.setAttribute('align','right');
   	votesParty.innerHTML = '<span id="'+ballot.eligible+'_'+ballot.party+'_votes">'+ballot.amount+'</span>';

	newTR2.appendChild(ballotName);  
	newTR2.appendChild(partyImage);
	newTR2.appendChild(votesParty);
	myTable2.appendChild(newTR2);

}

function addNullVotesRow(nullVotesIn){

	myTable2 = document.getElementById(globalTableName2);
	var newTR = document.createElement("tr");
	newTR.setAttribute('class','tblightrow');
	
	var nullTag = document.createElement("td");
   	nullTag.setAttribute('class','lightRowContent');
   	nullTag.setAttribute('align','left');
  	nullTag.setAttribute('colspan','2');
	nullTag.innerHTML = 'Votos Nulos:';

	var nullVotes = document.createElement("td");
   	nullVotes.setAttribute('class','lightRowContent');
   	nullVotes.setAttribute('align','right');
	nullVotes.innerHTML = +nullVotesIn;

	newTR.appendChild(nullTag);  
	newTR.appendChild(nullVotes);  
	myTable2.appendChild(newTR);
}

