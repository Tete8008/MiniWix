class ButtonWidget extends Widget{
    constructor(){
        super();    //bah super, hein
        this.value="Button";
        this.htmlTagName="button";
        this.fontSize=10;
        this.size.x=200;    //a button usually has greater width than height
        this.fontColor="black";
        this.font=FontFamily.Arial;
    }


    applyStyleToElement(){
        super.applyStyleToElement();
        this.htmlElement.value=this.value;
        this.htmlElement.style.fontSize=this.fontSize;
        this.htmlElement.style.color=this.fontColor;
        this.htmlElement.style.fontFamily=this.font;
    }
}