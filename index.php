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

        <header>
            Templates

        </header>

        <div id="templatesMiniatures" class="container">
            <?php
                $templatesPath = "Templates/*";
                $index=0;
                foreach(glob($templatesPath) as $templateFile)
                {
                    if ($index%6==0){
                        echo "<div class='row'>";
                    }
                    echo "<div class='col-sm'>";
                    if(!is_dir($templateFile)) {
                        include $templateFile;
                    }
                    echo "</div>";
                    if ($index%6==5 || $index==count(glob($templatesPath))-1){
                        echo "</div>";
                    }
                    $index++;
                }
            ?>
        </div>
        <div id="widgetsPanel">
                <h1 style="text-align:center;font-size:3vw;">Widgets</h1>
                <input type="button" value="Container" id="addContainerBtn" class="widgetCreator" draggable="true" ondragstart="drag(event)" onclick="onWidgetCreatorClick(event)"/>
                <input type="button" value="Label" id="addLabelBtn" class="widgetCreator" draggable="true" ondragstart="drag(event)" onclick="onWidgetCreatorClick(event)"/>
                <input type="button" value="Image" id="addImageBtn" class="widgetCreator" draggable="true" ondragstart="drag(event)" onclick="onWidgetCreatorClick(event)"/>
                <input type="button" value="Link" id="addLinkBtn" class="widgetCreator" draggable="true" ondragstart="drag(event)" onclick="onWidgetCreatorClick(event)"/>
                <input type="button" value="Save" id="saveBtn" style="width:80%;margin:10%;"/>
        </div>
        <div id="inspector">
        <button onclick="ClosePopup()" style="right:0px;position:absolute;">X</button>
            <div id="inspectorContent" style="visibility:hidden;">
                
                <h1 style="text-align:center;font-size:3vw;">Details</h1>
                <label class="inputLabel">
                    Position
                </label>
                <div id="positionInput">
                    <label for="positionXInput" class="inputLabel">X</label>
                    <input type="number" value="0" id="positionXInput" class="numberInput" oninput="onPropertyChanged(event)"/>
                    <label for="positionYInput" class="inputLabel">Y</label>
                    <input type="number" value="0" id="positionYInput" class="numberInput" oninput="onPropertyChanged(event)"/>
                </div>
                <label class="inputLabel">
                    Size
                </label>
                <div id="sizeInput">
                    <label for="sizeXInput" class="inputLabel">X</label>
                    <input type="number" value="0" id="sizeXInput" class="numberInput" oninput="onPropertyChanged(event)"/>
                    <label for="sizeYInput" class="inputLabel">Y</label>
                    <input type="number" value="0" id="sizeYInput" class="numberInput" oninput="onPropertyChanged(event)"/>
                </div>
                <label for="anchorInput" class="inputLabel">
                    Anchor
                </label>
                <select id="anchorInput" onchange="onPropertyChanged(event)">
                    
                </select>

                <label for="textInput" class="inputLabel" id="textLabel">
                    Text
                </label>
                <input type="text" id="textInput" style="margin-left:3%;width:90%;display:none;" onchange="onPropertyChanged(event)"/>
                <label for="imageInput" class="inputLabel" id="imageLabel">Image address</label>
                <input type="text" id="imageInput" style="margin-left:3%;width:90%;display:none;" onchange="onPropertyChanged(event)"/>
                <label for="linkInput" class="inputLabel" id="linkLabel">Link address</label>
                <input type="text" id="linkInput" style="margin-left:3%;width:90%;display:none;" onchange="onPropertyChanged(event)"/>
                <label for="displayInput" class="inputLabel">Display</label>
                <select id="displayInput" class="inputLabel" onchange="onPropertyChanged(event)">

                </select>
                <label for="backgroundColorInput" class="inputLabel">
                    Background color
                </label>
                <input type="color" value="#FFFFFD" id="backgroundColorInput" onchange="onPropertyChanged(event)"/>

                <input type="button" value="Delete" id="deleteBtn" style="margin:5%";/>
                
            </div>
        </div>

        <div id="editionPanel" ondragover="allowDrop(event)" ondrop="drop(event)">
            
            <div id="templateToEdit">

            </div>
            
        </div>
        <svg height="900" width="1800">
            
            </svg>
        <div id="status">

        </div>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
        <script src="Source/Widgets/Widget.js"></script>
        <script src="Source/Widgets/ButtonWidget.js"></script>
        <script src="Source/Widgets/ImageWidget.js"></script>
        <script src="Source/Widgets/LabelWidget.js"></script>
        <script src="Source/Widgets/LinkWidget.js"></script>
        <script src="Source/Selector.js"></script>
        <script src="Source/main.js"></script>
    </body>


</html>
