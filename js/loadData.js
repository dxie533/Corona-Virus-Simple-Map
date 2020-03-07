var confirmedArr;
var deathArr;
$(document).ready(function(){
	// WAIT FOR DOC TO FINISH LOADING
	loadConfirmedData();
	addCircles();
}); 

function loadConfirmedData(){
	//OBTAIN DATA FROM RAW CSV FILE
	$.ajax({
    url: "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Confirmed.csv",
    success: function (data) {
        confirmedArr = $.csv.toArrays(data);
        loadDeathData();
    },
    dataType: "text",
    });

	/*function somefunction(arr) {
    //alert("confirmed");
    }*/
}

function loadDeathData(){
	$.ajax({
	//OBTAIN DATA FROM RAW CSV FILE
    url: "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Deaths.csv",
    success: function (data) {
        deathArr = $.csv.toArrays(data);
        //somefunction2(deathArr);
		addCircles();
    },
    dataType: "text",
    });

	/*function somefunction2(arr) {
    //alert("wow");
    }*/
}

function addCircles(){
	//ITERATE THROUGH EACH ROW AND ADD A CIRCLE
	const CITYNAME = 0;
	const COUNTRY = 1;
	const LAT = 2;
	const LONG = 3;
	//START FROM 1 BECAUSE FIRST ROW ARE TITLES
	for (var i = 1; i < confirmedArr.length; i++) {
		var name = confirmedArr[i][CITYNAME];
		var countryName = confirmedArr[i][COUNTRY];
		var circleLat = confirmedArr[i][LAT];
		var circleLong = confirmedArr[i][LONG];
		var circleInfected = confirmedArr[i][confirmedArr[i].length - 1];
		var circleDead = deathArr[i][deathArr[i].length - 1];
		//CREATE A CIRCLE
		var circle = L.circle([circleLat, circleLong], {
			color: 'red',
			fillColor: '#f03',
			fillOpacity: 0.25,
			radius: 200 - (-1 *circleInfected),
		})
		//CHECK IF CITY NAME IS AVAILABLE AND CHANGE THE TOOLTIP TEXT ACCORDINGLY
		if(name){
			circle.bindTooltip(name + ", " + countryName + "<br/>" + "Confirmed cases : " + circleInfected + "<br/>" + "Deaths: " + circleDead).addTo(map);
		}
		else{
			circle.bindTooltip(countryName + "<br/>" + "Confirmed cases : " + circleInfected + "<br/>" + "Deaths: " + circleDead).addTo(map);
		}
	}
}
