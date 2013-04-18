	function showCandidateInfo(code){
		$("tr[id=tr"+code+"]").each(function(index) {

			if ($(this).attr('style') !== undefined) {
				
				if($("table[id=table"+code+"]").attr("class") == "n_s"){
					SortTable(1,"table"+code);
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
