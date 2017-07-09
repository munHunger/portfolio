import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'expand-modal',
  templateUrl: './expandModal.component.html',
  styleUrls: ['./expandModal.component.css']
})
export class ExpandModalComponent
{
    @ViewChild("container")
    container;

    openProgress: number = 0;
    currentWidth: number = 300;
    currentHeight: number = 200;
    closedWidth: number = 300;
    closedHeight: number = 200;

    openWidth: number = 900;
    openHeight: number = 600;

    startX: number;
    startY: number;
    targetX: number = 40;
    targetY: number = 200;

    toggle()
    {
        this.startX = this.getX() + this.closedWidth - 10;
        this.startY = this.getY();
        if(this.openProgress == 1)
            this.open(-0.05);
        else if(this.openProgress == 0)
            this.open(0.05);
    }

    open(scale)
    {
        this.currentHeight = this.closedHeight + (this.openHeight-this.closedHeight) * this.sigmoid(this.openProgress);
        this.currentWidth = this.closedWidth + (this.openWidth-this.closedWidth) * this.sigmoid(this.openProgress);
        this.openProgress += scale;
        if(this.openProgress > 1)
            this.openProgress = 1;
        else if(this.openProgress < 0)
            this.openProgress = 0;
        else
            setTimeout(() => { this.open(scale) }, 25);
    }

    getRelativeX(element)
    {
        if(!element)
            return 0;
        if(element.localName.toUpperCase() == "DIV")
            return element.offsetLeft;
        return this.getRelativeX(element.parentElement);
    }

    getLeft()
    {
        return this.startX + ((this.targetX-this.startX) * this.sigmoid(this.openProgress));
    }

    getTop()
    {
        if(this.startY > this.targetY)
            return this.startY + ((this.targetY-this.startY) * Math.pow(this.sigmoid(this.openProgress), 2));
        else
            return this.targetY - ((this.targetY-this.startY) * Math.pow(this.sigmoid(1-this.openProgress), 2));
    }

    getX()
    {
        return this.getRelativeX(this.container.nativeElement.parentElement);
    }

    getRelativeY(element)
    {
        if(!element)
            return 0;
        if(element.localName.toUpperCase() == "DIV")
            return element.offsetTop;
        return this.getRelativeY(element.parentElement);
    }

    getY()
    {
        let relativeY = this.getRelativeY(this.container.nativeElement.parentElement);
        let scroll = window.pageYOffset;
        return relativeY - scroll;
    }

    sigmoid(x): number
    {
        return 0.5 * (1 + Math.sin((x * Math.PI) - (Math.PI / 2)));
    }
}