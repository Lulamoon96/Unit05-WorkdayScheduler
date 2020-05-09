var nameSet = localStorage.getItem("name")
var dt = new Date()

var timeBlocks = document.querySelectorAll(".timeBlock")

var events = JSON.parse(localStorage.getItem("events"))
if (!events){
  events = {}
}


document.title = nameSet +"'s Schedule"
$("#scheduleBrand").text(nameSet +"'s Workday Schedule")
document.getElementById("date").innerHTML = dt.toLocaleDateString()


var second = 1000;

function pad(num) {
  return ('0' + num).slice(-2);
}

function checkTime(i) {

  if (i < 10) {
    i = "0" + i;
  }

  return i;

}

$(".editSurr").on('click', ".edit", function(){

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

function renderEvents(){

  events.forEach

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

function colorSet() {

  timeBlocks.forEach(function(block){

      if (block.getAttribute('time') < dt.getHours()) {

          block.querySelector(".eventSurr").classList.add("past")

      }

      
      if (block.getAttribute('time') == dt.getHours()) {

          block.querySelector(".eventSurr").classList.add("current")

      }

  })

  setTimeout(function() {
      colorSet()
  }, 60000)

}

startTime()
colorSet()
