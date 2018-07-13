$(document).ready(function() {
    if(localStorage.getItem("token")){
        window.location.href = "home.html";
    }else{
        $("#login-form").on("submit",function(ev){
            ev.preventDefault();
            $.ajax({
                "url": "https://oe-final.herokuapp.com/auth/",
                "method": "POST",
                data: {"access_token": "fiOA4CojZ0wP5QcLStQLw1PnjZAtGEuX"},
                headers: {                
                    "Authorization":"Basic "+btoa($("#login-email").val()+':'+$("#login-pwd").val())
                },
                success:function(response){
                    console.log(response);
                    if (typeof(Storage) !== "undefined") {
                        localStorage.setItem("token",response.token);
                        window.location.href = "home.html";
                    } else {
                        document.getElementsByTagName("body").innerHTML = "Sorry update browser!!!!";
                    }
                },
                error: function() {
                    $('#error').css("display","block");
                }
            });
        });
    }
});