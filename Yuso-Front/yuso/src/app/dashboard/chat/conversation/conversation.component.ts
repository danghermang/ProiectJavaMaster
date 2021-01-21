import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { trigger, style, state, animate, transition } from '@angular/animations';

@Component({
  selector: 'yuso-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css'],
  animations: [
		trigger('boxAnim', [state('collapsed', style({ transform: 'none'})),
							state('expanded', style({ height: '400px'})),
							transition('collapsed => expanded', animate('250ms ease-in')),
							transition('expanded => collapsed', animate('250ms ease-out'))]),
		trigger('lastMsgAnim', [state('collapsed', style({ opacity: 1})),
								state('expanded', style({ opacity: 0})),
								transition('collapsed => expanded', animate('150ms ease-in')),
								transition('expanded => collapsed', animate('150ms ease-out'))]),
		trigger('chatboxAnim', [state('hidden', style({ opacity: 0})),
								state('visible', style({ opacity: 1})),
								transition('hidden => visible', animate('250ms ease-in')),
								transition('visible => hidden', animate('150ms ease-out'))])
	]
})
export class ConversationComponent implements OnInit {
  @ViewChild('chatbox') chatbox: ElementRef;

	state: string = 'collapsed';
	chatboxState: string = 'hidden';
	showchatbox: boolean = false;

	onClick(){
		if(this.state == 'collapsed') {
			this.showchatbox = true;
			this.state = 'expanded';
			setTimeout(() => { this.chatboxState = 'visible'; this.scrollChatboxDown() }, 50);
		}
		else {
			this.showchatbox = false;
			this.state = 'collapsed';
			setTimeout(() => { this.chatboxState = 'hidden' }, 15);
		}
	}

	onEvent(event: any){
		event.stopPropagation();
	}

	scrollChatboxDown(){
		try {
			this.chatbox.nativeElement.scrollTop = this.chatbox.nativeElement.scrollHeight;
		} catch(err) { }
	}
  constructor() { }

  ngOnInit() {
  }

}
