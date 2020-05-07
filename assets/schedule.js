var nameSet = localStorage.getItem("name")
var dt = new Date()

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

  t = setTimeout(function() {
    startTime()
  }, 1000)

}

startTime()

