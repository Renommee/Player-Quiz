var answers = [];
var PlayerTypesArray = [];
var BoldPlayerTypesArray = [false, false, false, false, false, false, false];
var ItalicsPlayerTypesArray = [false, false, false, false, false, false, false];
// Uncomment the for loop belose to populate the answers for testing purposes //
//for (i = 0; i < 42; i++) {
//	answers[i] = 50;	
//}

function toInt(n){ return Math.round(Number(n)); };

function submitResults() {
	var question = "q";
	var missedQ;
	var missedQuestions = "";
	var n;

	for (q = 0; q < 42; q++) {
		var qnum = q+1;
		var question = "q" + qnum;
		var inputs = document.getElementsByName(question);
		for (i = 0; i < inputs.length; i++) {
		  if (inputs[i].checked) {
			answers[q] = Number(inputs[i].value);
		  }
		}
		if (typeof answers[q] == 'undefined') {
		  if (typeof missedQ !== 'undefined') {
		  	missedQuestions = missedQuestions + ", "; 
		  }
		  missedQ = q+1;
		  missedQuestions = missedQuestions + missedQ;
		}
	}
	if (typeof missedQ !== 'undefined') {
		n = missedQuestions.search(", ");
		if (typeof n == 'undefined' || n == -1) {
			missedQuestions = "您留空了问题 #" + missedQuestions;
		} else { missedQuestions = "您需要填空以下问题: " + missedQuestions; }
		missedQuestions = missedQuestions + ".";
	}

//	alert(MissedQuestions);
	document.getElementById("MissedQuestions").style.display = "block";
	document.getElementById("MissedQuestions").innerHTML = missedQuestions;
	analyze_data();
}

google.load("visualization", "1", {packages:["corechart"]});

function analyze_data() {
	var PG = 0;
	var BK = 0;
	var TT = 0;
	var SP = 0;
	var MA = 0;
	var ST = 0;
	var CG = 0;
	var Sum = 0;
	var PlayerTypesArray = [];
	var within_std_of = 1;
	var PlayerTypesTextOutput;
	var BarGraphOutput;

	// Calculate Player Type Totals	
	PG = PG + answers[0];
	BK = BK + answers[1];
	TT = TT + answers[2];
    SP = SP + answers[3];
	MA = MA + answers[4];
	ST = ST + answers[5];
	CG = CG + answers[6];
	PG = PG + answers[7];
	BK = BK + answers[8];
	ST = ST + answers[9];
	TT = TT + answers[10];
	SP = SP + answers[11];
	MA = MA + answers[12];
	CG = CG + answers[13];
	PG = PG + answers[14];
	BK = BK + answers[15];
	TT = TT + answers[16];
	SP = SP + answers[17];
	MA = MA + answers[18];
	ST = ST + answers[19];
	CG = CG + answers[20];
	PG = PG + answers[21];
	TT = TT + answers[22];
	SP = SP + answers[23];
	CG = CG + answers[24];
	BK = BK + answers[25];
	MA = MA + answers[26];
	ST = ST + answers[27];
	BK = BK + answers[28];
	SP = SP + answers[29];
	MA = MA + answers[30];
	CG = CG + answers[31];
	TT = TT + answers[32];
	ST = ST + answers[33];
	PG = PG + answers[34];
	MA = MA + answers[35];
	PG = PG + answers[36];
	TT = TT + answers[37];
	CG = CG + answers[38];
	SP = SP + answers[39];
	ST = ST + answers[40];
	BK = BK + answers[41];
	
	//Normalize Player Types so they sum to 100
	Sum = PG + BK + TT + SP + MA + ST + CG
	PG = PG*100/Sum;
	BK = BK*100/Sum;
	TT = TT*100/Sum;
	SP = SP*100/Sum;
	MA = MA*100/Sum;
	ST = ST*100/Sum;
	CG = CG*100/Sum;
	
	//Do Statistics On Player Types Totals
	PlayerTypesArray = [PG, BK, TT, SP, MA, ST, CG];

	//Calculates the Mean, Variance, and Deviation
	statistics = function(a) {
	  var r = {mean: 0, variance: 0, deviation: 0}, t = a.length;
	  for(var m, s = 0, l = t; l--; s += a[l]);
	  for(m = r.mean = s / t, l = t, s = 0; l--; s += Math.pow(a[l] - m, 2));
	  return r.deviation = Math.sqrt(r.variance = s / t), r;
	}
  
  	//True if the the "val" is within "stdev" standard deviations of the "mean"
	withinStd = function(mean, val, stdev) {
	   var low = mean-(stdev*x.deviation);
	   var hi = mean+(stdev*x.deviation);
	   return (val > low) && (val < hi);
	}

	//Set up arrays to make Text Result look nice
	var x = statistics(PlayerTypesArray);
	for (i=0; i<PlayerTypesArray.length; i++) {
			if (!withinStd(x.mean, PlayerTypesArray[i], within_std_of) && PlayerTypesArray[i] > x.mean) { BoldPlayerTypesArray[i] = true; };
			if (!withinStd(x.mean, PlayerTypesArray[i], within_std_of) && PlayerTypesArray[i] < x.mean) { ItalicsPlayerTypesArray[i] = true; };
	}

	//Round Results For Display
	PG = toInt(PG);
	BK = toInt(BK);
	TT = toInt(TT);
	SP = toInt(SP);
	MA = toInt(MA);
	ST = toInt(ST);
	CG = toInt(CG);

	// For Troubleshooting
//	var TestOutput = PlayerTypesArray + "<br>" + x.mean + ", " + x.deviation + ", " + BoldPlayerTypesArray;
//	document.getElementById("TroubleShooting").innerHTML = TestOutput;

	// Prepare Text Results
	if (BoldPlayerTypesArray[0]) {b1 = "<b>"; b2 = "</b>"} else {b1 = ""; b2 = ""};
	if (ItalicsPlayerTypesArray[0]) {i1 = "<i>"; i2 = "</i>"} else {i1 = ""; i2 = ""};
	PlayerTypesTextOutput = b1 + i1 + "滥强: " + PG + "%" + i2 + b2 + "<br>";
	if (BoldPlayerTypesArray[1]) {b1 = "<b>"; b2 = "</b>"} else {b1 = ""; b2 = ""};
	if (ItalicsPlayerTypesArray[1]) {i1 = "<i>"; i2 = "</i>"} else {i1 = ""; i2 = ""};
	PlayerTypesTextOutput = PlayerTypesTextOutput + b1 + i1 + "踢门: " + BK + "%" + i2 + b2 + "<br>";
	if (BoldPlayerTypesArray[2]) {b1 = "<b>"; b2 = "</b>"} else {b1 = ""; b2 = ""};
	if (ItalicsPlayerTypesArray[2]) {i1 = "<i>"; i2 = "</i>"} else {i1 = ""; i2 = ""};
	PlayerTypesTextOutput = PlayerTypesTextOutput + b1 + i1 + "战术: " + TT + "%" + i2 + b2 + "<br>";
	if (BoldPlayerTypesArray[3]) {b1 = "<b>"; b2 = "</b>"} else {b1 = ""; b2 = ""};
	if (ItalicsPlayerTypesArray[3]) {i1 = "<i>"; i2 = "</i>"} else {i1 = ""; i2 = ""};
	PlayerTypesTextOutput = PlayerTypesTextOutput + b1 + i1 + "专精: " + SP + "%" + i2 + b2 + "<br>";
	if (BoldPlayerTypesArray[4]) {b1 = "<b>"; b2 = "</b>"} else {b1 = ""; b2 = ""};
	if (ItalicsPlayerTypesArray[4]) {i1 = "<i>"; i2 = "</i>"} else {i1 = ""; i2 = ""};
	PlayerTypesTextOutput = PlayerTypesTextOutput + b1 + i1 + "扮演: " + MA + "%" + i2 + b2 + "<br>";
	if (BoldPlayerTypesArray[5]) {b1 = "<b>"; b2 = "</b>"} else {b1 = ""; b2 = ""};
	if (ItalicsPlayerTypesArray[5]) {i1 = "<i>"; i2 = "</i>"} else {i1 = ""; i2 = ""};
	PlayerTypesTextOutput = PlayerTypesTextOutput + b1 + i1 + "叙事: " + ST + "%" + i2 + b2 + "<br>";
	if (BoldPlayerTypesArray[6]) {b1 = "<b>"; b2 = "</b>"} else {b1 = ""; b2 = ""};
	if (ItalicsPlayerTypesArray[6]) {i1 = "<i>"; i2 = "</i>"} else {i1 = ""; i2 = ""};
	PlayerTypesTextOutput = PlayerTypesTextOutput + b1 + i1 + "随兴: " + CG + "%" + i2 + b2 + "<br>";
	
	//Prepare Bar Graph Results
	BarGraphOutput = '<dl class="BarGraph">';
	BarGraphOutput = BarGraphOutput + '<dt>滥强</dt>' + '<dd><div id="data-one" class="bar" style="width: ' + PG + '%">' + PG + '%</div></dd>';
	BarGraphOutput = BarGraphOutput + '<dt>踢门</dt>' + '<dd><div id="data-two" class="bar" style="width: ' + BK + '%">' + BK + '%</div></dd>';
	BarGraphOutput = BarGraphOutput + '<dt>战术</dt>' + '<dd><div id="data-three" class="bar" style="width: ' + TT + '%">' + TT + '%</div></dd>';
	BarGraphOutput = BarGraphOutput + '<dt>专精</dt>' + '<dd><div id="data-four" class="bar" style="width: ' + SP + '%">' + SP + '%</div></dd>';
	BarGraphOutput = BarGraphOutput + '<dt>扮演</dt>' + '<dd><div id="data-five" class="bar" style="width: ' + MA + '%">' + MA + '%</div></dd>';
	BarGraphOutput = BarGraphOutput + '<dt>叙事</dt>' + '<dd><div id="data-six" class="bar" style="width: ' + ST + '%">' + ST + '%</div></dd>';
	BarGraphOutput = BarGraphOutput + '<dt>随兴</dt>' + '<dd><div id="data-seven" class="bar" style="width: ' + CG + '%">' + CG + '%</div></dd>';
	BarGraphOutput = BarGraphOutput + '</dl>';

	//Prepare Pie Graph Results
	var data = google.visualization.arrayToDataTable([
	  ['玩家类型', 'Fraction of Total'],
	  ['滥强',     PG],
	  ['踢门',      BK],
	  ['战术',  TT],
	  ['专精', SP],
	  ['扮演', MA],
	  ['叙事', ST],
	  ['随兴', CG],
	]);
	
	var options = {
	  title: 'Pie Graph',
      slices: {
        0: { color: 'firebrick' },
        1: { color: 'orange' },
        2: { color: 'gold' },
        3: { color: 'green' },
        4: { color: 'royalblue' },
        5: { color: 'blueviolet' },
        6: { color: 'violet' },
      },
      pieSliceTextStyle: {
        color: 'black',
      },
	};

	var chart = new google.visualization.PieChart(document.getElementById('PieChart'));
	
	//Display Results
	
	document.getElementById("FormattedText").style.display = "block";
	document.getElementById("FormattedText").innerHTML = PlayerTypesTextOutput;
	
	document.getElementById("BarGraph").style.display = "block";
	document.getElementById("BarGraph").innerHTML = BarGraphOutput;
	
	document.getElementById("PieChart").style.display = "block";
	chart.draw(data, options);

	//Scroll down page so results can be seen.
	window.scrollTo(0,document.body.scrollHeight);
}