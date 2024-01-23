import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ClipboardService } from 'ngx-clipboard';
import { last } from 'rxjs';
import { ApiUser } from 'src/app/API/api-user';
import { ActivityModel } from 'src/app/model/model';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-card-join-activity',
  templateUrl: './card-join-activity.component.html',
  styleUrls: ['./card-join-activity.component.css']
})
export class CardJoinActivityComponent implements OnInit{
  constructor(private api:ApiUser, private clipboardService:ClipboardService){
  }
  @Input('index_array') index!:number 
  @Input('activity') activity!: ActivityModel
  @Output('updated') updated = new EventEmitter();
  @Output('update') event_btn = new EventEmitter<number>()

  localhost = environment.localhost_back+'/asset/'

  showPopup: boolean = false;
  status:boolean = false;

  ngOnInit(): void {
      let date = new Date()
      let even_activity = new Date(this.activity.dateTimeStart)

      if(date.getTime()<even_activity.getTime()){
        this.status = true
      }
  }
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
  share(){
    this.clipboardService.copyFromContent(environment.localhost_font+"/join-activity/"+this.activity.id)
  }
}
