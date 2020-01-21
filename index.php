<?php
    function redirect(){
        header("Location: login.php");  
    }

    session_start();

    if (isset($_SESSION["connected"]) && $_SESSION["connected"]){
        $connected=$_SESSION["connected"];


    }else{
        redirect();
    }


    session_write_close();
    

?>
<!DOCTYPE html>
<html>
    <head>
        <title>MiniWix - Templates</title>
        <meta charset="utf-8"/>
        <link rel="stylesheet" type="text/css" href="style.css"/>
    </head>

    <body>
        <div id="templatesMiniatures">
        </div>
        <div id="widgetsPanel">
        </div>
        <div id="inspector">

        </div>


    </body>


</html>
