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
            <?php
                $templatesPath = "Templates/*";
                foreach(glob($templatesPath) as $templateFile)
                {
                    if(!is_dir($templateFile)) {
                        include $templateFile;
                    }
                }
            ?>
        </div>
        <div id="widgetsPanel">
        </div>
        <div id="inspector">

        </div>

        <div id="editionPanel">
            <button onclick="ClosePopup()">X</button>
            <div id="templateToEdit">

            </div>
        </div>
        
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
        <script src="main.js"></script>
    </body>


</html>
