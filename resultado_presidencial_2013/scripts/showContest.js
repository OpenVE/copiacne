	function Show(id) {
		if (document.getElementById('var.' + id).value == "0") {
			Show2(id);
		} else {
			Hide(id);
		}
	}

	function Show2(id) {
		var objid = id;
		var head1 = document.getElementById(objid);
		if (navigator.userAgent.indexOf("Netscape6") != -1) {
			head1.style.visibility = "visible";
		} else {
			head1.style.display = "";
		}
		document.getElementById('var.' + id).value = "1";
	}

	function Hide(id) {
		var objid = id;
		var head1 = document.getElementById(objid);
		if (navigator.userAgent.indexOf("Netscape6") != -1) {
			head1.style.visibility = "hidden";
		} else {
			head1.style.display = "none";
		}
		document.getElementById('var.' + id).value = "0";
	}		

function showCandidateInfo(code){
		$("tr[id=tr"+code+"]").each(function(index) {

			if ($(this).attr('style') !== undefined) {
				
				if($("table[id=table"+code+"]").attr("class") == "n_s"){
					$("table[id=table"+code+"]").removeAttr("class");				
				}
				
				$(this).removeAttr("style");

			} else {
				$(this).attr("style","display:none");
			}

		});
	}
	
	var sortedOn = 0;   
	  
	function SortTable(sortOn,tableName) {   
	  
		sortedOn = 0;
		var table = document.getElementById(tableName);   
		var tbody = table.getElementsByTagName('tbody')[0];   
		var rows = tbody.getElementsByTagName('tr');   
		  
		var rowArray = new Array();   
		for (var i=0, length=rows.length; i<length; i++) {   
		rowArray[i] = new Object;   
		rowArray[i].oldIndex = i;   
		rowArray[i].value = +rows[i].getElementsByTagName('td')[sortOn].firstChild.firstChild.data.split('.').join('').split(',').join('');
	}   
	  
	if (sortOn == sortedOn) { rowArray.reverse(); }   
	else {   
	sortedOn = sortOn;   
	/*  
	Decide which function to use from the three:RowCompareNumbers,  
	RowCompareDollars or RowCompare (default).  
	For first column, I needed numeric comparison.  
	*/  
		rowArray.sort(RowCompareNumbers); 
	}   
		  
		var newTbody = document.createElement('tbody');   
		for (var i=0, length=rowArray.length ; i<length; i++) {   
		newTbody.appendChild(rows[rowArray[i].oldIndex].cloneNode(true));   
		}   
		  
		table.replaceChild(newTbody, tbody);   
	}   
	  
	function RowCompare(a, b) {    
	  
		var aVal = a.value;   
		var bVal = b.value;   
		return (aVal == bVal ? 0 : (aVal > bVal ? -1 : 1));   
	}   
	// Compare number   
	function RowCompareNumbers(a, b) {   
	  
		var aVal = parseInt( a.value);   
		var bVal = parseInt(b.value);   
		return (bVal - aVal);   
	}   
	// compare currency   
	function RowCompareDollars(a, b) {   
	  
		var aVal = parseFloat(a.value.substr(1));   
		var bVal = parseFloat(b.value.substr(1));   
		return (bVal - aVal);   
	}   
	
function cleanPollingStation() {
	$("a[id=region_ref]").each(function(index) {
		var refText=$(this).text();
		var refSplit = refText.split(" ");
		var pattern = /Mesa: \d{1,}/;
		var test = pattern.test(refText);
		if(test){
			$(this).text(refText.match(pattern)); 
		}	
	});
}

function hideCClass(cClassCode) {
	$("#cClassNoResultDiv").html('');
	var id = "cclass."+cClassCode;
	var found = false;
	var contests = $("div[id^='cclass.']");
	for (var i=0; i<contests.length; i++) {
		if($(contests[i]).attr('id') != id) {
			$(contests[i]).hide('slow');
		} else {
			found = true;
			$(contests[i]).show('slow');
			var $kids = $(contests[i]).children();
			var contestsResults = getElementsStartsWithId($kids, 'resultDiv.');
			Show2(contestsResults[0].id);
		}
	}
	if (!found) {
		$("#cClassNoResultDiv").html('<hr />	<div id="cClassNoResultContest">		<p align="center" style="font-weight: bold;">			Disculpe los Resultados para este cargo no están disponibles por los momentos por favor intente más tarde.		</p>	</div>');
	}
}

function showAllCClass() {
	$("div[id^='resultDiv.']").each( function() {
		$(this).hide();			
	});
	$("input[id^='var.resultDiv.']").each( function() {
		$(this).val(0);			
	});
	$("div[id^='cclass.']").each( function() {
		$(this).show('slow');			
	});
}

function getElementsStartsWithId(children, id ) {
	  var elements = [], child;
	  for (var i = 0, length = children.length; i < length; i++) {
	    child = children[i];
	    if (child.id.substr(0, id.length) == id)
	      elements.push(child);
	  }
	  return elements;
}

window.onload = function()
{
   showContest();
   displayAll();
};

function showContest() {
	var contestToShow = getQueryString()["c"];
	var cClassCode = getQueryString()["cClass"];
	if (contestToShow != undefined && cClassCode != undefined) {
		hideCClass(cClassCode);
		Show2('resultDiv.'+contestToShow)
	}
}

function getQueryString() {
	var result = {}, queryString = location.search.substring(1),
	  re = /([^&=]+)=([^&]*)/g, m;
	
	while (m = re.exec(queryString)) {
	result[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
	}
	
	return result;
}

function displayAll() {
	$("div[id^='resultDiv.']").each( function() {
		$(this).show();			
	});
	$("input[id^='var.resultDiv.']").each( function() {
		$(this).val(1);			
	});
}