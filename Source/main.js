var templatesAsString;
var templatesData;

var templatesDivs;

templatesAsString;



var editionPanel;
var templateToEdit;

templatesDivs=document.getElementsByClassName("template");
templatesAsString=window.sessionStorage.getItem("templates");
editionPanel=document.getElementById("editionPanel");
templateToEdit=document.getElementById("templateToEdit");

var widgetsPanel=document.getElementById("widgetsPanel");


window.onload=function(){
    
    if (templatesAsString!=null && templatesAsString!="" && templatesAsString!="null"){
        templatesData=JSON.parse(templatesAsString);
        
    }else{
        //load default templates contents
        for (var i=0,l=templatesDivs.length;i<l;i++){
            let div=templatesDivs[i];
            div.ondrop=drop;
            div.ondragover=allowDrop;
            
            $.getJSON("TemplatesDefaultContent/"+div.id+"_baseContent.json",function(data){
                for (const elementId in data.contents) {
                    console.log(elementId);
                    let element=document.getElementById(elementId);
    
                    for (const elementProperty in data.contents[elementId]){
                        let content=data.contents[elementId][elementProperty];
                        element[elementProperty]=content;
                        console.log(elementProperty+"["+elementId+"] = "+content);
    
                        element.style.pointerEvents="none";
                    }
                    
                    
                  }
                div.onclick=OpenPopup;
                
            });
            
        }
    }
}



var editingTemplate;
var draggingId="";
var spinner=document.getElementById("spinner");

function OpenPopup(event){
    spinner.style.visibility="visible";
    let templateElement=event.target;
    editingTemplate=templateElement;

    templateToEdit.innerHTML=templateElement.innerHTML;
    templateElement.innerHTML="";
    editionPanel.style.visibility="visible";
    widgetsPanel.style.visibility="visible";
    

    spinner.style.visibility="hidden";
}

function ClosePopup(){
    editionPanel.style.visibility="hidden";
    widgetsPanel.style.visibility="hidden";
    editingTemplate.innerHTML=templateToEdit.innerHTML;
    templateToEdit.innerHTML="";
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