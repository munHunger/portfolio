import { Component, ViewChild, Input, ContentChild } from '@angular/core';

@Component({
  selector: 'expand-modal',
  templateUrl: './expandModal.component.html',
  styleUrls: ['./expandModal.component.css']
})
export class ExpandModalComponent
{
    @Input()
    offset:boolean = true;

    @ContentChild("content")
    content;

    @Input()
    imageURL: string;

    @ViewChild("container")
    container;

    openProgress: number = 0;
    currentWidth: number = 0;
    currentHeight: number = 0;
    @Input()
    closedWidth: number = 300;
    @Input()
    closedHeight: number = 200;

    openWidth: number = 900;
    openHeight: number = 900;

    startX: number;
    startY: number;
    targetX: number;
    targetY: number = 20;

    toggle()
    {
        this.startX = this.getX() + this.closedWidth - 10;
        this.startY = this.getY();
        this.targetX = window.innerWidth/2 - this.openWidth/2;
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
        if(this.container.nativeElement.children.length > 0)
            return this.getRelativeX(this.container.nativeElement.parentElement) + this.container.nativeElement.children[0].offsetLeft;
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