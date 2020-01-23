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
        <link rel="stylesheet" type="text/css" href="css/index.css"/>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
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
                <h1 style="text-align:center;font-size:3vw;">Widgets</h1>
                <input type="button" value="Container" id="addContainerBtn" class="widgetCreator" draggable="true" ondragstart="drag(event)" onclick="onWidgetCreatorClick(event)"/>
                <input type="button" value="Label" id="addLabelBtn" class="widgetCreator" draggable="true" ondragstart="drag(event)" onclick="onWidgetCreatorClick(event)"/>
                <input type="button" value="Image" id="addImageBtn" class="widgetCreator" draggable="true" ondragstart="drag(event)" onclick="onWidgetCreatorClick(event)"/>
                <input type="button" value="Link" id="addLinkBtn" class="widgetCreator" draggable="true" ondragstart="drag(event)" onclick="onWidgetCreatorClick(event)"/>
        </div>
        <div id="inspector">

        </div>

        <div id="editionPanel" ondragover="allowDrop(event)" ondrop="drop(event)">
            <div id="spinner" class="spinner-border" style="width:50px;height:50px;margin: 0 auto;"></div>
            <button onclick="ClosePopup()">X</button>
            <div id="templateToEdit">

            </div>
        </div>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
        <script src="Source/Widgets/Widget.js"></script>
        <script src="Source/Widgets/ButtonWidget.js"></script>
        <script src="Source/Widgets/ImageWidget.js"></script>
        <script src="Source/Widgets/LabelWidget.js"></script>
        <script src="Source/Widgets/LinkWidget.js"></script>
        <script src="Source/main.js"></script>
    </body>


</html>
