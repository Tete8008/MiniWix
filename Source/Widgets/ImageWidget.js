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
        let htmlElement=document.getElementById(this.htmlElementId);
        htmlElement.alt=this.value;
        htmlElement.style.fontSize=this.fontSize;
        htmlElement.style.color=this.fontColor;
        htmlElement.style.fontFamily=this.font;
        htmlElement.src=this.src;
    }

    fromElement(htmlElement){
        super.fromElement(htmlElement);
        this.src=htmlElement.src;
        let rect=htmlElement.getBoundingClientRect();
        htmlElement.onload=function(){
            widgets[this.id].size={x:this.width,y:this.height};
        }
        this.size={x:rect.right-rect.left,y:rect.bottom-rect.top};
    }
}
