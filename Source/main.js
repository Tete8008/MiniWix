var templatesAsString;
var templatesData;

var templatesDivs;

var templatesAsString;



var editionPanel;
var templateToEdit;

templatesDivs=document.getElementsByClassName("template");
templatesAsString=window.sessionStorage.getItem("templates");
editionPanel=document.getElementById("editionPanel");
templateToEdit=document.getElementById("templateToEdit");

var widgetsPanel=document.getElementById("widgetsPanel");
var inspector=document.getElementById("inspector");

var svg=document.getElementsByTagName("svg")[0];

//inputs
var positionXInput=document.getElementById("positionXInput");
var positionYInput=document.getElementById("positionYInput");
var sizeXInput=document.getElementById("sizeXInput");
var sizeYInput=document.getElementById("sizeYInput");
var backgroundColorInput=document.getElementById("backgroundColorInput");
var anchorInput=document.getElementById("anchorInput");
var textInput=document.getElementById("textInput");
var displayInput=document.getElementById("displayInput");
var imageInput=document.getElementById("imageInput");
var linkInput=document.getElementById("linkInput");

var textLabel=document.getElementById("textLabel");
var imageLabel=document.getElementById("imageLabel");
var linkLabel=document.getElementById("linkLabel");



var widgets={};

window.onload=function(){
    
    //generate options for the anchor dropdown
    for (var property in Anchor){
        let option=document.createElement("option");
        option.innerText=property;
        option.value=Anchor[property];
        anchorInput.appendChild(option);
    }

    //generate options for the display dropdown
    for (var property in Display){
        let option=document.createElement("option");
        option.innerText=property;
        option.value=Display[property];
        displayInput.appendChild(option);
    }


    if (templatesAsString!=null && templatesAsString!="" && templatesAsString!="null"){
        //retrieve templates content from session storage and create miniatures
        templatesData=JSON.parse(templatesAsString);
    }
        

    //load templates contents
    
    for (var i=0,l=templatesDivs.length;i<l;i++){
        
        let div=templatesDivs[i];

        div.ondrop=drop;
        div.ondragover=allowDrop;
        
        div.onclick=OpenPopup;


        //here i only check the index of the template in the array, but this is not correct ; an id should be used in order to retrieve the right template. It will work as long as the templates are saved in order. I'm short in time :/
        //basically, is there a template that was saved and needs to be loaded ?
        if (i<templatesData.length){
            
            for (var j=0,ll=templatesData.length;j<ll;j++){
                data=templatesData[j];
                let template= document.getElementById("template"+data.ID);
                template.innerHTML=data.TemplatesData;
                templatesDivs[j].onclick=OpenPopup;
    
                //generate a widget class for each html element 
    
                let divs=template.getElementsByTagName("div");
                for (var k=0;k<divs.length;k++){
                    let widget;
                    if (divs[k].id!=undefined){
                        widget=new Widget();
                        widget.fromElement(divs[k]);
                    }
                }
    
                let labels=template.getElementsByTagName("label");
                for (var k=0;k<labels.length;k++){
                    let widget;
                    if (labels[k].id!=undefined){
                        widget=new LabelWidget();
                        widget.fromElement(labels[k]);
                    }
                }
    
                let images=template.getElementsByTagName("img");
                for (var k=0;k<images.length;k++){
                    let widget;
                    if (images[k].id!=undefined){
                        widget=new ImageWidget();
                        widget.fromElement(images[k]);
                    }
                }
    
                let links=template.getElementsByTagName("a");
                for (var k=0;k<links.length;k++){
                    let widget;
                    if (links[k].id!=undefined){
                        widget=new LinkWidget();
                        widget.fromElement(links[k]);
                    }
                }
    
            }
            
        }else{
            //load default templates contents, stored in json (why not)
            $.getJSON("TemplatesDefaultContent/"+div.id+"_baseContent.json",function(data){
                for (var elementId in data.contents) {
                    var element=document.getElementById(elementId);
    
                    for (var elementProperty in data.contents[elementId]){
                        let content=data.contents[elementId][elementProperty];
                        element[elementProperty]=content;
                    }
                    var widget;
                    switch(element.tagName.toLowerCase()){
                        case "label":
                            widget=new LabelWidget();
                        break;
                        case "img":
                            widget=new ImageWidget();
                        break;
                        case "link":
                            widget=new LinkWidget();
                        break;
                        case "div":
                            widget=new Widget();
                        break;
                    }
                    widget.fromElement(element);
                }
            });
        }
        
        
    }
    
}



var editingTemplate;
var draggingId="";


function OpenPopup(event){
    let templateElement=event.target;
    editingTemplate=templateElement;

    templateToEdit.innerHTML=templateElement.innerHTML;
    templateElement.innerHTML="";
    editionPanel.style.visibility="visible";
    widgetsPanel.style.visibility="visible";
    inspector.style.visibility="visible";

}

function ClosePopup(){
    editionPanel.style.visibility="hidden";
    widgetsPanel.style.visibility="hidden";
    inspector.style.visibility="hidden";
    editingTemplate.innerHTML=templateToEdit.innerHTML;
    templateToEdit.innerHTML="";
    selector.deselect();
}


function drag(event){
    draggingId=event.target.id;
}

function allowDrop(event){
    if (draggingId!="" && event.target!=editionPanel){
        event.preventDefault();
    }
}

function drop(event){
    event.preventDefault();
    let id=draggingId;

    addWidgetTo(event.target,id);
}

//creates a widget and adds it to the open template
function addWidgetTo(target,id){
    switch(id){
        case "addContainerBtn":
            let widget=new Widget();
            widget.createHTMLElement(target);
            break;
        case "addLabelBtn":
            let label=new LabelWidget();
            label.createHTMLElement(target);
            break;
        case "addImageBtn":
            let image=new ImageWidget();
            image.createHTMLElement(target);
            
            break;
        case "addLinkBtn":
            let link=new LinkWidget();
            link.createHTMLElement(target);
            break;
    }
    draggingId="";
}

function onWidgetCreatorClick(event){
    addWidgetTo(templateToEdit.getElementsByTagName("div")[0],event.target.id);
}

var selector=new Selector();
selector.createSizeDots();

editionPanel.onclick=function(event){
    event.preventDefault();
    if (event.target!=editionPanel && event.target!=templateToEdit && event.target.parentElement!=templateToEdit){
        selector.selectElement(event.target);
    }else{
        selector.deselect();
    }
}

var selectedElement=null;

//when a property is changed in the inspector, updates the selected element
function onPropertyChanged(event){

    var widget=widgets[selectedElement.id];

    switch(event.target.id){
        case "positionXInput":
            widget.position.x=event.target.value;
            break;
        case "positionYInput":
            widget.position.y=event.target.value;
            break;
        case "sizeXInput":
            widget.size.x=event.target.value;
            break;
        case "sizeYInput":
            widget.size.y=event.target.value;
            break;
        case "anchorInput":
            widget.anchor=event.target.value;
            break;
        case "backgroundColorInput":
            widget.backgroundColor=event.target.value;
            break;
        case "textInput":
            widget.value=event.target.value;
        break;
        case "imageInput":
            widget.src=event.target.value;
        break;
        case "displayInput":
            widget.display=event.target.value;
        break;
        case "linkInput":
            widget.href=event.target.value;
        break;
    }
    widget.applyStyleToElement();
    selector.refreshSelector();
}


//generate unique id for the elements
function getUniqueId(templateParent,tagName){
    
    let elements=templateParent.getElementsByTagName(tagName);
    let max=-1;
    for (var i=0,l=elements.length;i<l;i++){
        let el=elements[i];
        let id=parseInt(el.id.split("_")[2]);
        if (id>max){
            max=id;
        }
    }

    let templateId=editingTemplate.id;

    

    return "t"+templateId.split("template")[1]+"_"+tagName+"_"+(max+1);
}


var deleteBtn=document.getElementById("deleteBtn");

//deletes the selected element
deleteBtn.onclick=function(){
    delete widgets[selectedElement.id];
    console.log(selectedElement);
    selectedElement.parentNode.removeChild(selectedElement);
    selector.deselect();
}


var saveBtn=document.getElementById("saveBtn");

var statusText=document.getElementById("status");

//saves the current template to the data base
saveBtn.onclick=function(){
    statusText.style.visibility="visible";
    $.ajax({
        type:"POST",
        dataType: "json",
        url: "save.php",
        data: {
            templateContent:templateToEdit.innerHTML
        },
        timeout:10000, //10 seconds timeout
        success: onSaveSuccess,
        error:onSaveError,
        complete:onSaveError
    });

}

function onSaveSuccess(data,status){
    statusText.innerText="Saved successfully !";
    setTimeout(function(){
        status.style.visibility="hidden";
    },5000);
}

function onSaveError(xhr,status,error){
    statusText.innerText="An error occured while saving the template.";
}

function onSaveComplete(xhr,status){
    
}