
//a link is basically a clickable label
class LinkWidget extends LabelWidget{
    constructor(){
        super();    
        this.value="link";
        this.htmlTagName="a";
        this.href="https://jcw87.github.io/c2-sans-fight/";

    }

    applyStyleToElement(){
        super.applyStyleToElement();
        let htmlElement=document.getElementById(this.htmlElementId);
        htmlElement.href=this.href;
    }

    fromElement(htmlElement){
        super.fromElement(htmlElement);
        this.href=htmlElement.href;
    }
}
