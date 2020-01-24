
//handles all selection operations
class Selector{
    constructor(){
        //4 dots that are placed at each corner of an element when selected
        this.sizeDots=[];
        //current moving dot
        this.editingDot=null;
        this.selectedElement=null;

        //lines between the points
        this.lines=[];
    }

    createSizeDots(){
        for (var i=0;i<4;i++){
            let dot=document.createElement("span");
            dot.classList.add("dot");
            dot.id="dot"+i;
            dot.onclick=this.clickOnDot;
            document.body.appendChild(dot);
            this.sizeDots.push(dot);
        }

        for (var i=0;i<4;i++){
            let line=document.createElementNS('http://www.w3.org/2000/svg','line');
            
            svg.appendChild(line);
            this.lines.push(line);

        }
    }

    selectElement(target){
        document.getElementById("inspectorContent").style.visibility="visible";
        selectedElement=target;
        for (var i=0;i<4;i++){
            this.sizeDots[i].style.visibility="visible";
            this.lines[i].style.visibility="visible";
        }

        let rect=target.getBoundingClientRect();

        let left=rect.left;
        let top=rect.top;
        let right=rect.left+target.offsetWidth;
        let bot=rect.top+target.offsetHeight;

        //place all dots
        this.sizeDots[0].style.left=left-5+"px";
        this.sizeDots[0].style.top=top-5+"px";
        this.sizeDots[1].style.left=right-5+"px";
        this.sizeDots[1].style.top=top-5+"px";
        this.sizeDots[2].style.left=left-5+"px";
        this.sizeDots[2].style.top=bot-5+"px";
        this.sizeDots[3].style.left=right-5+"px";
        this.sizeDots[3].style.top=bot-5+"px";

        //place lines
        //top line
        this.lines[0].setAttribute("x1",left);
        this.lines[0].setAttribute("x2",right);
        this.lines[0].setAttribute("y1",top);
        this.lines[0].setAttribute("y2",top);


        //right line
        this.lines[1].setAttribute("x1",right);
        this.lines[1].setAttribute("x2",right);
        this.lines[1].setAttribute("y1",top);
        this.lines[1].setAttribute("y2",bot);

        //bot line
        this.lines[2].setAttribute("x1",right);
        this.lines[2].setAttribute("x2",left);
        this.lines[2].setAttribute("y1",bot);
        this.lines[2].setAttribute("y2",bot);

        //left line
        this.lines[3].setAttribute("x1",left);
        this.lines[3].setAttribute("x2",left);
        this.lines[3].setAttribute("y1",bot);
        this.lines[3].setAttribute("y2",top);


        //fill inspector values with selected element values
        let widget=widgets[selectedElement.id];

        positionXInput.value=widget.position.x;
        positionYInput.value=widget.position.y;
        sizeXInput.value=widget.size.x;
        sizeYInput.value=widget.size.y;
        anchorInput.value=widget.anchor;
        backgroundColorInput.value=widget.backgroundColor;
        displayInput.value=widget.display;

        if (selectedElement.tagName.toLowerCase()=="a"){
            linkInput.value=widget.href;
            linkLabel.style.display="block";
            linkInput.style.display="block";
        }else{
            linkLabel.style.display="none";
            linkInput.style.display="none";
        }

        if(selectedElement.tagName.toLowerCase()=="label" || selectedElement.tagName.toLowerCase()=="a"){
            textInput.style.display="block";
            textInput.value=widget.value;
            textLabel.style.display="block";
        }else{
            textInput.style.display="none";
            textLabel.style.display="none";
        }

        if (selectedElement.tagName.toLowerCase()=="img"){
            imageInput.style.display="block";
            imageInput.value=widget.src;
            imageLabel.style.display="block";
        }else{
            imageInput.style.display="none";
            imageLabel.style.display="none";
        }

    }

    deselect(){
        for (var i=0;i<4;i++){
            this.sizeDots[i].style.visibility="hidden";
            this.lines[i].style.visibility="hidden";
        }
        document.getElementById("inspectorContent").style.visibility="hidden";
    }

    clickOnDot(event){
        console.log("clicked on dot");
        //change size of widget
    }


    refreshSelector(){
        this.selectElement(selectedElement);
    }
}