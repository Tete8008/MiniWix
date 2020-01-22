var connectBtn=document.getElementById("connectBtn");
var username=document.getElementById("username");
var password=document.getElementById("password");
var spinner=document.getElementById("spinner");
var statusLabel=document.getElementById("statusLabel");

function SetLoading(on){
    connectBtn.disabled=on;
    username.disabled=on;
    password.disabled=on;
    spinner.style.visibility=on?"visible":"hidden";
    PrintStatus("Connecting...");
}


connectBtn.onclick=function(event){
    
    //data validation
    if (username.value!="" && password.value!=""){
        //disable input while waiting for the request, to prevent the user from sending multiple requests at once
        SetLoading(true);

        let jsonData={
            username:username.value,
            password:password.value
        };

        console.log(jsonData);
        $.ajax({
            type:"POST",
            dataType: "json",
            url: "loginCheck.php",
            data: jsonData,
            timeout:10000, //10 seconds timeout
            success: LoginResponseSuccess,
            error:LoginResponseError,
            complete:LoginResponseComplete
        });
    }else{
        PrintStatus("One or more fields are empty. Please enter username and password to login.");
    }

    
}


//this function is called after success and error
function LoginResponseComplete(xhr,status){
    SetLoading(false);
    
    
}

function LoginResponseSuccess(data,status){
    console.log(data);
    if (data.connected){

        sessionStorage.setItem("templates",data.templates);

        //redirect to main page
        window.location.href=".";
    }else{
        PrintStatus(data.errorMessage);
    }



}

function LoginResponseError(xhr,status,error){
    let text="";
    switch(status){
        case "timeout":
            text="The request was timed out.";
        break;
        case "error":
            text="An error occured.";
        break;
        case "abort":
            text="The request was aborted.";
        break;
        case "parsererror":
            text="A parse error occured";
        break;

    }

    PrintStatus(text);
    console.log(error);
    console.log(xhr);
    
    
}

var printStatusTimeoutHandle;

function PrintStatus(message,printDuration=5){
    statusLabel.innerText=message;
    statusLabel.style.opacity=1;
    //cancel the previous timeout to reset its life time
    if (printStatusTimeoutHandle!=null){
        clearTimeout(printStatusTimeoutHandle);
    }

    //clear the message after a few seconds
    printStatusTimeoutHandle=setTimeout(function(){
        statusLabel.style.opacity=0;
    },printDuration*1000);
}