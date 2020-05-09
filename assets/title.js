//Get user name if already set
var nameSet = localStorage.getItem("name")

//Set user name and save to local storage if nonexistent yet
$("#nameSubmit").on("click", function(){

    event.preventDefault()
  
    var name = document.getElementById("nameInput").value.trim()

    localStorage.setItem("name", name)

    location.reload()

})

//Takes users to schedule when clicked
$("#scheduleVisit").on("click", function(){

    event.preventDefault()
  
    self.location="schedule.html"

})

//Checks to see if a name already exists, and hides name submit as needed
if (nameSet) {

    $("#noName").css("display", "none")
    $("#named").css("display", "block")
    $("#nameWelcome").text("Welcome, " + nameSet)

}