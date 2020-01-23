class ImageWidget extends Widget{
    constructor(){
        super();
        this.value="Image";
        this.htmlTagName="img";
        this.size.x=200;
        this.size.y=200;
        this.src="Images/sans.png";
    }

    applyStyleToElement(){
        super.applyStyleToElement();
        this.htmlElement.alt=this.value;
        this.htmlElement.style.fontSize=this.fontSize;
        this.htmlElement.style.color=this.fontColor;
        this.htmlElement.style.fontFamily=this.font;
        this.htmlElement.src=this.src;
    }
}
