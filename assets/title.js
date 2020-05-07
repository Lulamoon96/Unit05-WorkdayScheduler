var nameSet = localStorage.getItem("name")

$("#nameSubmit").on("click", function(){

    event.preventDefault()
  
    var name = document.getElementById("nameInput").value.trim()

    localStorage.setItem("name", name)

    location.reload()

})

$("#scheduleVisit").on("click", function(){

    event.preventDefault()
  
    self.location="schedule.html"

})


if (nameSet) {

    $("#noName").css("display", "none")
    $("#named").css("display", "block")
    $("#nameWelcome").text("Welcome, " + nameSet)

}