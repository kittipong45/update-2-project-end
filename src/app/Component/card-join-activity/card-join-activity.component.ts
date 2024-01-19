import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ApiUser } from 'src/app/API/api-user';
import { ActivityModel } from 'src/app/model/model';

@Component({
  selector: 'app-card-join-activity',
  templateUrl: './card-join-activity.component.html',
  styleUrls: ['./card-join-activity.component.css']
})
export class CardJoinActivityComponent {
  constructor(private api:ApiUser){

  }
  @Input('index_array') index!:number 
  @Input('activity') activity!: ActivityModel
  @Output('updated') updated = new EventEmitter();
  @Output('update') event_btn = new EventEmitter<number>()
  localhost = 'https://80db-58-10-56-72.ngrok-free.app/asset/'
  showPopup: boolean = false;
  togglePopup() {
    this.showPopup = !this.showPopup;
    console.log(this.showPopup)
  }
  editPost() {
    this.event_btn.emit(this.index)
  }
  deletePost() {
    this.api.delete_activity(this.activity.id).subscribe((data:any)=>{
      console.log(data)
      this.updated.emit()
    })
  }
  shar(textToCopy:string){

  }
}
