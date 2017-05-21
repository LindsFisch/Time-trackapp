$(document).ready(function(){

var config = {
    apiKey: "AIzaSyA43qudHKwWKvW8XISz-ugkaALMSWTLWKg",
    authDomain: "employeedatabase-b5ef3.firebaseapp.com",
    databaseURL: "https://employeedatabase-b5ef3.firebaseio.com",
    projectId: "employeedatabase-b5ef3",
    storageBucket: "employeedatabase-b5ef3.appspot.com",
    messagingSenderId: "596063807654"
  };

  firebase.initializeApp(config);


var database = firebase.database();	

//initial values
var name = "";
var role ="";
var start ="";
var rate = 0;
var billed = 0;
var worked = 0;


//database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot){})

database.ref().on("child_added", function(childsnapshot) {
  var child = childsnapshot.val();

worked = (moment(child.dataStart).diff(moment(),"months"))*-1;

billed = worked * child.dataRate;


  var table = $("<tr class = 'table'>");
  $("#table").append(table);
  table.append("<td>" + child.dataName + "</td>");
  table.append("<td>" + child.dataRole + "</td>");
  table.append("<td>" + child.dataStart + "</td>");
  table.append("<td>" + worked + "</td>");
  table.append("<td>" + child.dataRate + "</td>");
  table.append("<td>" + billed + "</td>");


    // var newStart = new Date(childSnapshot.val().dataStart);
    // var myEpoch = parseInt(newStart.getTime()/1000.0);
    // var currentDate = new Date();
    // var currentEpoch = parseInt(currentDate.getTime()/1000.0);
    // var difference = currentEpoch - myEpoch;
    // var month = 2629743;

    // convertMonth = difference/month;

    // console.log("Converted: " + newStart);
    // console.log("Unix: " + myEpoch);
    // console.log(currentDate);
    // console.log(currentEpoch);
    // console.log("difference: " + difference);
    // console.log(convertMonth);



  }, function(error) {
    console.log("error");

  });
	
$("#submit").on("click", function() {

	event.preventDefault();

		name = $("#name-input").val().trim();
		role = $("#role-input").val().trim();
		start = $("#date-input").val().trim();
		rate = parseInt($("#rate-input").val().trim());

var month = (moment(start).diff(moment(),"months"))*-1;
billed = month * rate;

  var table = $("<tr class = 'table'>");
  $("#table").append(table);
  table.append("<td>" + name + "</td>");
  table.append("<td>" + role + "</td>");
  table.append("<td>" + start + "</td>");
  table.append("<td>" + month + "</td>");
  table.append("<td>" + rate + "</td>");
  table.append("<td>" + billed + "</td>");

	database.ref().push({
      dataName: name,
      dataRole: role,
      dataStart: start,
      dataRate: rate,
    })

  //empty after submit
  $("#name-input").val("");
  $("#role-input").val("");
  $("#date-input").val("");
  $("#rate-input").val("");

	})


//database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot){
//  var child = snapshot.val();
//  console.log(child);
//}, function(error){
// console.log("error");
//})
})

