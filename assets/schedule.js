//Retrieves all the timeBlocks to style them properly
var timeBlocks = document.querySelectorAll(".timeBlock")

//Retrieves user name and user events from storage
//Sets a new dictionary if no events are made yet
var nameSet = localStorage.getItem("name")
var events = JSON.parse(localStorage.getItem("events"))
if (!events){
  events = {}
}

//Sets the schedule to personal name
document.title = nameSet +"'s Schedule"
$("#scheduleBrand").text(nameSet +"'s Workday Schedule")

//Makes the div for the current time editable and changes the edit button to a save button
$(".editSurr").on('click', ".edit", function(){

  //Super jank way to get the current time being edited
  var timeOf = $(this).parent().parent().parent().attr("time")
  var toEdit = "#eventSurr" + timeOf
  $(this).html("<h2 class='event'>Save</h2>")
  $(this).attr("class", "save")
  $(toEdit).children().attr("contenteditable", true)
  $(toEdit).children().focus()

})


$(".editSurr").on('click', ".save", function(){

  var timeOf = $(this).parent().parent().parent().attr("time")
  var toEdit = "#eventSurr" + timeOf
  $(this).html("<h2 class='event'>Edit</h2>")
  $(this).attr("class", "edit")
  $(toEdit).children().attr("contenteditable", false)
  events[timeOf] = $(toEdit).children().html()
  localStorage.setItem("events", JSON.stringify(events))

})

function renderEvents(events){

  for (const time in events) {

    $("[time=" + time +"]").find(".event").html(events[time])

  }
}

function pad(num) {

  return ('0' + num).slice(-2);
  
}

function checkTime(i) {

  if (i < 10) {
    i = "0" + i;
  }

  return i;

}

function startTime() {

  var today = new Date()
  var h = today.getHours()
  var m = today.getMinutes()
  var s = today.getSeconds()
  // add a zero in front of numbers<10
  m = checkTime(m)
  s = checkTime(s)

  if (h > 12){

      var hour = h - 12
      document.getElementById('time').innerHTML = hour + ":" + m + ":" + s + " PM"

  }

  else {

    document.getElementById('time').innerHTML = hour + ":" + m + ":" + s + " AM"
    
  }

  setTimeout(function() {
    startTime()
  }, 1000)

}

function eventSet() {

  var today = new Date()
  var hour = today.getHours()

  document.getElementById("date").innerHTML = today.toLocaleDateString()

  if (events[hour]){

    $("#currEv").html("Current Event: " + events[hour])

  }

  if (events[hour + 1]){

    $("#nextEv").html("Upcoming Event: " + events[hour + 1])

  }

  setTimeout(function() {
    eventSet()
  } , 60000)

}

function colorSet() {

  var today = new Date()
  console.log("set")
  timeBlocks.forEach(function(block){

    if (block.getAttribute('time') < today.getHours()) {

        block.querySelector(".eventSurr").classList.add("past")

    }

    
    if (block.getAttribute('time') == today.getHours()) {

        block.querySelector(".eventSurr").classList.add("current")

    }

  })

  setTimeout(function() {
      colorSet()
  }, 60000)

}

startTime()
colorSet()
eventSet()
renderEvents(events)