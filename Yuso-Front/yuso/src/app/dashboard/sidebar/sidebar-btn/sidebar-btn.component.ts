import { Component, ViewChild, ElementRef, Input, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
	selector: 'yuso-sidebar-btn',
	templateUrl: './sidebar-btn.component.html',
	styleUrls: ['./sidebar-btn.component.css'],
	animations: [
		trigger('btnAnim', [state('inactive', style({ transform: 'none' })),
		state('active', style({ transform: 'translate3d(0, -50%, 0) rotate3d(1, 0, 0, 90deg)' })),
		transition('inactive => active', animate('150ms ease-in')),
		transition('active => inactive', animate('150ms ease-out'))]),
		trigger('btnAnimInversed', [state('inactive', style({ transform: 'translate3d(0, 100%, 0) rotate3d(1, 0, 0, -90deg)' })),
		state('active', style({ transform: 'none' })),
		transition('inactive => active', animate('150ms ease-in')),
		transition('active => inactive', animate('150ms ease-out'))])
	]
})
export class SidebarBtnComponent implements OnInit {
	@ViewChild('btn') btn: ElementRef;
	@Input() hoverColor: string;
	@Input() backgroundColor: string;
	@Input() icon: string;
	@Input() buttonName: string;
	@Input() anim: string;

	state: String = 'inactive';
	timer: any;

	ngOnInit() {
		this.btn.nativeElement.style.background = this.backgroundColor;
	}

	hoverIn() {
		this.btn.nativeElement.style.background = this.hoverColor;
		if (this.anim == 'true')
			this.timer = setTimeout(() => { this.state = 'active'; }, 700);
	}

	hoverOut() {
		this.btn.nativeElement.style.background = this.backgroundColor;
		if (this.anim == 'true') {
			this.state = 'inactive';
			clearTimeout(this.timer);
		}
	}

}
