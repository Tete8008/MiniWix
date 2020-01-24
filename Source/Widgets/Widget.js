//enum
const Anchor={"TopLeft":0,"TopRight":1,"TopCenter":2,"MiddleLeft":3,"MiddleCenter":4,"MiddleRight":5,"BottomLeft":6,"BottomCenter":7,"BottomRight":8};

const Display={"Block":0,"InlineBlock":1};

//base class for widgets
class Widget{
    constructor(){
        //base element is div
        this.htmlTagName="div";
        this.htmlElementId;
        this.size={x:50,y:50};//in px
        this.position={x:0,y:0};
        this.anchor=Anchor.TopLeft;
        this.backgroundColor="#FFFFFF";
        this.parent=null;
        this.display=Display.InlineBlock;
    }

    //if the html element is already present in the template but has not been created through this class
    fromElement(htmlElement){
        this.htmlTagName=htmlElement.tagName;
        this.htmlElementId=htmlElement.id;
        let rect=htmlElement.getBoundingClientRect();
        this.position={x:rect.left,y:rect.top};
        this.size={x:htmlElement.offsetWidth,y:htmlElement.offsetHeight};
        if (htmlElement.style.backgroundColor!=""){
            this.backgroundColor=htmlElement.style.backgroundColor;
        }
        this.anchor=Anchor.TopLeft;
        this.parent=htmlElement.parentElement;
        if (htmlElement.style.display!=""){
            this.display=htmlElement.style.display;
        }else{
            this.display=Display.InlineBlock;
        }
        widgets[this.htmlElementId]=this;
    }

    
    //creates the corresponding html element and adds it to the given parent
    createHTMLElement(parent){
        let htmlElement=document.createElement(this.htmlTagName);
        this.parent=parent;
        this.parent.appendChild(htmlElement);
        this.htmlElementId=getUniqueId(parent,this.htmlTagName);
        htmlElement.id=this.htmlElementId;
        this.applyStyleToElement();
        widgets[this.htmlElementId]=this;
    }

    //applies all parameters to the html element
    applyStyleToElement(){
        let htmlElement=document.getElementById(this.htmlElementId);
        switch(this.anchor){
            case Anchor.TopLeft:
                htmlElement.style.left=this.position.x+"px";
                htmlElement.style.top=this.position.y+"px";
            break;
            case Anchor.TopRight:
                htmlElement.style.right=this.position.x+"px";
                htmlElement.style.top=this.position.y+"px";
            break;
            case Anchor.TopCenter:
                htmlElement.style.left=this.position.x+this.parent.offsetWidth/2-this.size.x/2+"px";
                htmlElement.style.top=this.position.y+"px";
            break;
            case Anchor.MiddleLeft:
                htmlElement.style.left=this.position.x+"px";
                htmlElement.style.top=this.position.y+this.parent.offsetHeight/2-this.size.y/2+"px";
            break;
            case Anchor.MiddleCenter:
                htmlElement.style.left=this.position.x+this.parent.offsetWidth/2-this.size.x/2+"px";
                htmlElement.style.top=this.position.y+this.parent.offsetHeight/2-this.size.y/2+"px";
            break;
            case Anchor.MiddleRight:
                htmlElement.style.right=this.position.x+"px";
                htmlElement.style.top=this.position.y+this.parent.offsetHeight/2-this.size.y/2+"px";
            break;
            case Anchor.BottomLeft:
                htmlElement.style.left=this.position.x+"px";
                htmlElement.style.bottom=this.position.y+"px";
            break;
            case Anchor.BottomCenter:
                htmlElement.style.left=this.position.x+this.parent.offsetWidth/2-this.size.x/2+"px";
                htmlElement.style.bottom=this.position.y+"px";
            break;
            case Anchor.BottomRight:
                htmlElement.style.right=this.position.x+"px";
                htmlElement.style.bottom=this.position.y+"px";
            break;
        }
        htmlElement.style.width=this.size.x+"px";
        htmlElement.style.height=this.size.y+"px";
        htmlElement.style.backgroundColor=this.backgroundColor;
        htmlElement.style.position="relative";
        htmlElement.style.display=(this.display==Display.Block)?"block":"inline-block";
    }


}

