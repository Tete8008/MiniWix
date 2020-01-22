var templatesAsString;
var templatesData;

var templatesDivs=document.getElementsByClassName("template");

templatesAsString=window.sessionStorage.getItem("templates");



var editionPanel=document.getElementById("editionPanel");
var templateToEdit=document.getElementById("templateToEdit");

console.log(templatesAsString);

if (templatesAsString!=null && templatesAsString!=""){
    templatesData=JSON.parse(templatesAsString);
    
}else{
    //load default templates contents
    for (var i=0,l=templatesDivs.length;i<l;i++){
        let div=templatesDivs[i];

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

var editingTemplate;

function OpenPopup(event){
    
    let templateElement=event.target;
    editingTemplate=templateElement;

    templateToEdit.innerHTML=templateElement.innerHTML;
    templateElement.innerHTML="";
    editionPanel.style.visibility="visible";

}

function ClosePopup(){
    editionPanel.style.visibility="hidden";
    editingTemplate.innerHTML=templateToEdit.innerHTML;
    templateToEdit.innerHTML="";
}