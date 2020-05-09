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

  //Super jank way to get the current time being edited to make sure I'm getting the right event to edit
  //I have no doubt there is an easier way but this works
  var timeOf = $(this).parent().parent().parent().attr("time")
  var toEdit = "#eventSurr" + timeOf

  //Changes the button to a save button
  $(this).html("<h2 class='event'>Save</h2>")
  $(this).attr("class", "save")

  //Makes the events box editable
  $(toEdit).children().attr("contenteditable", true)
  $(toEdit).children().focus()

})

//Save button
$(".editSurr").on('click', ".save", function(){

  //Same jank way to get the correct time being edited
  var timeOf = $(this).parent().parent().parent().attr("time")
  var toEdit = "#eventSurr" + timeOf

  //Changes button back to edit button
  $(this).html("<h2 class='event'>Edit</h2>")
  $(this).attr("class", "edit")

  //Makes the events box not editable, and saves the contents to local storage in a dictionary
  //Time is the key, and inner html is the value
  $(toEdit).children().attr("contenteditable", false)
  events[timeOf] = $(toEdit).children().html()
  localStorage.setItem("events", JSON.stringify(events))

  //If the current hour or the next hour is edited, the corresponding event banner is updated
  eventSetOnce()

})

//Renders previous events in local storage
function renderEvents(events){

  for (const time in events) {

    //Goes through the dictionary and adds events using time value
    $("[time=" + time +"]").find(".event").html(events[time])

  }
}

//Adds correct number of zeroes to minutes and seconds
function checkTime(i) {

  if (i < 10) {
    i = "0" + i;
  }

  return i;

}

//Running clock function which I found on stackoverflow and edited to my needs
function startTime() {

  var today = new Date()
  //Set current date
  document.getElementById("date").innerHTML = today.toLocaleDateString()
  var h = today.getHours()
  var m = today.getMinutes()
  var s = today.getSeconds()
  //Add a zero in front of numbers < 10
  m = checkTime(m)
  s = checkTime(s)

  //Changes clock from 24 hours to 12 hours
  if (h > 12){

      var hour = h - 12
      document.getElementById('time').innerHTML = hour + ":" + m + ":" + s + " PM"

  }

  else {

    document.getElementById('time').innerHTML = h + ":" + m + ":" + s + " AM"
    
  }

  //Change time every second
  setTimeout(function() {
    startTime()
  }, 1000)

}

//Displays current event and next event (for the next hour)
function eventSet() {

  var today = new Date()
  var hour = today.getHours()


  if (events[hour]){

    $("#currEv").html("Current Event: " + events[hour])

  }

  if (events[hour + 1]){

    $("#nextEv").html("Upcoming Event: " + events[hour + 1])

  }

  //Check every minute
  setTimeout(function() {
    eventSet()
  } , 60000)

}

//This function is used when the user edits the current hour or a following hour
//setTimeout is removed or it would be running again
function eventSetOnce() {

  var today = new Date()
  var hour = today.getHours()


  if (events[hour]){

    $("#currEv").html("Current Event: " + events[hour])

  }

  if (events[hour + 1]){

    $("#nextEv").html("Upcoming Event: " + events[hour + 1])

  }

}

//Colors the timeBlock depending on whether it is in the past, current, or future
function colorSet() {

  var today = new Date()

  timeBlocks.forEach(function(block){

    if (block.getAttribute('time') < today.getHours()) {

        block.querySelector(".eventSurr").classList.add("past")
        block.querySelector(".eventSurr").classList.remove("current")

    }

    
    else if (block.getAttribute('time') == today.getHours()) {

        block.querySelector(".eventSurr").classList.add("current")
        block.querySelector(".eventSurr").classList.remove("past")

    }

    else {

      block.querySelector(".eventSurr").classList.remove("past")
      block.querySelector(".eventSurr").classList.remove("current")

    }

  })

  //Check blocks every minute
  //This means that the color may lag for a minute
  setTimeout(function() {
      colorSet()
  }, 60000)

}

//Calling all the timed functions and rendering any events that have been saved
startTime()
colorSet()
eventSet()
renderEvents(events)