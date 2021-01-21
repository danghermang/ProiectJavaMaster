import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from "@angular/animations";

@Component({
  selector: 'yuso-photoviewer',
  templateUrl: './photoviewer.component.html',
  styleUrls: ['./photoviewer.component.css'],
  animations: [trigger('frameAnim', [state('hidden', style({ opacity: 0, transform: 'scale(0.9)'})),
						state('visible', style({ opacity: 1, transform: 'scale(1.0)'})),
						transition('hidden => visible', animate('150ms ease-in')),
						transition('visible => hidden', animate('150ms ease-out'))]),
				trigger('curtainAnim', [state('hidden', style({ opacity: 0 })),
						state('visible', style({ opacity: 0.2 })),
						transition('hidden => visible', animate('150ms ease-in')),
						transition('visible => hidden', animate('150ms ease-out'))])],
	host: { '(document:click)': 'onDocumentClick($event)'}
})

export class PhotoviewerComponent {

	visible: boolean = false;
	animState: string = 'hidden';
	documentClickCanDeactivate : boolean = false;
	imageUrl: string = 'assets/logo.svg';

	onCloseBtnClick(){
		this.toggleVisible(false);
	}

	onDocumentClick(event: any){
		if(this.documentClickCanDeactivate && event.target.id != 'frame' && event.target.id != 'container'
			&& event.target.id != 'image' && event.target.id != 'closebtn'){
			this.toggleVisible(false);
		}
	}

	public toggleVisible(toggle: boolean){
		if(toggle){
			this.visible = toggle;
			setTimeout(() => { this.animState = 'visible'; this.documentClickCanDeactivate = true }, 15);
		}
		else{
			this.animState = 'hidden';
			setTimeout(() => { this.visible = toggle; this.documentClickCanDeactivate = false }, 100);
		}
	}

	public setImage(url: string){
		this.imageUrl = url;
	}
}
