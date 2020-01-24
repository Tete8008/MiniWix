//enum
const FontFamily={"Georgia":0,"Palatino Linotype":1,"Times New Roman":2,"Arial":3,"Arial Black":4,"Comic Sans MS":5,"Impact":6,"Lucida Sans Unicode":7,"Tahoma":8,"Trebuchet MS":9,"Verdana":10,"Courier New":11,"Lucida Console":12};



class LabelWidget extends Widget{
    constructor(){
        super();    
        this.value="Label";
        this.htmlTagName="label";
        this.fontSize=10;
        this.size.x=200;    
        this.fontColor="black";
        this.font=FontFamily.Arial;
    }

    applyStyleToElement(){
        super.applyStyleToElement();
        let htmlElement=document.getElementById(this.htmlElementId);
        htmlElement.innerText=this.value;
        htmlElement.style.fontSize=this.fontSize;
        htmlElement.style.color=this.fontColor;
        htmlElement.style.fontFamily=this.font;
    }

    fromElement(htmlElement){
        super.fromElement(htmlElement);
        this.value=htmlElement.innerText;
        this.fontSize=htmlElement.style.fontSize;
        this.fontColor=htmlElement.style.fontColor;
        this.font=htmlElement.style.fontFamily;
    }
}
