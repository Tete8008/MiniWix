//enum
const Anchor={"TopLeft":0,"TopRight":1,"TopCenter":2,"MiddleLeft":3,"MiddleCenter":4,"MiddleRight":5,"BottomLeft":6,"BottomCenter":7,"BottomRight":8};

//base class for widgets
class Widget{
    constructor(){
        //base element is div
        this.htmlTagName="div";
        this.htmlElement=null;
        this.size={x:50,y:50};//in px
        this.position={x:0,y:0};
        this.anchor=Anchor.MiddleCenter;
        this.backgroundColor="white";
        this.parent=null;
    }

    

    createHTMLElement(parent){
        this.htmlElement=document.createElement(this.htmlTagName);
        this.parent=parent;
        this.applyStyleToElement();
        this.parent.appendChild(this.htmlElement);
    }

    
    applyStyleToElement(){
        switch(this.anchor){
            case Anchor.TopLeft:
                this.htmlElement.style.left=this.position.x+"px";
                this.htmlElement.style.top=this.position.y+"px";
            break;
            case Anchor.TopRight:
                this.htmlElement.style.right=this.position.x+"px";
                this.htmlElement.style.top=this.position.y+"px";
            break;
            case Anchor.TopCenter:
                this.htmlElement.style.left=this.position.x+this.parent.offsetWidth/2-this.size.x/2+"px";
                this.htmlElement.style.top=this.position.y+"px";
            break;
            case Anchor.MiddleLeft:
                this.htmlElement.style.left=this.position.x+"px";
                this.htmlElement.style.top=this.position.y+this.parent.offsetHeight/2-this.size.y/2+"px";
            break;
            case Anchor.MiddleCenter:
                this.htmlElement.style.left=this.position.x+this.parent.offsetWidth/2-this.size.x/2+"px";
                this.htmlElement.style.top=this.position.y+this.parent.offsetHeight/2-this.size.y/2+"px";
            break;
            case Anchor.MiddleRight:
                this.htmlElement.style.right=this.position.x+"px";
                this.htmlElement.style.top=this.position.y+this.parent.offsetHeight/2-this.size.y/2+"px";
            break;
            case Anchor.BottomLeft:
                this.htmlElement.style.left=this.position.x+"px";
                this.htmlElement.style.bottom=this.position.y+"px";
            break;
            case Anchor.BottomCenter:
                this.htmlElement.style.left=this.position.x+this.parent.offsetWidth/2-this.size.x/2+"px";
                this.htmlElement.style.bottom=this.position.y+"px";
            break;
            case Anchor.BottomRight:
                this.htmlElement.style.right=this.position.x+"px";
                this.htmlElement.style.bottom=this.position.y+"px";
            break;
        }
        this.htmlElement.style.width=this.size.x+"px";
        this.htmlElement.style.height=this.size.y+"px";
        this.htmlElement.style.backgroundColor=this.backgroundColor;
        this.htmlElement.style.position="absolute";
    }


}