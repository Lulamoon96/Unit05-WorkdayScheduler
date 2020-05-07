$("#nameSubmit").on("click", function(){

    event.preventDefault()
  
    var name = document.getElementById("nameInput").value.trim()

    localStorage.setItem("name", name)

})