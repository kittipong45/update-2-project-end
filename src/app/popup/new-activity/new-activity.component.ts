import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { ApiUser } from 'src/app/API/api-user';
import { FormAsset, FormNewActiviy } from 'src/app/model/form';
import { ActivityModel } from '../../model/model';
import { Cookie } from 'src/app/Cookie/cookie';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-new-activity',
  templateUrl: './new-activity.component.html',
  styleUrls: ['./new-activity.component.css']
})
export class NewActivityComponent implements OnInit {
  constructor(private api: ApiUser,private cookie:Cookie){}
  @Input('is_update') is_update:boolean = false
  @Output('succeed') succeed = new EventEmitter()
  @Output('show') showPopup = new EventEmitter();
  @Output('alert') alert = new EventEmitter()
  @Input('data') form!:FormNewActiviy|ActivityModel 
  localhost = environment.localhost_back + '/asset/'
  urlFiles:any[] = []
  fileUpload:FormAsset[] = []
  id_delete:number[] = []

  warn = {
    id: false,
    nameActivity:false,
    location: false,
    details:false,
    participants:false,
    dateTimeStart:false,
    dateTimeEnd:false,
    addBy:false,
    type:false,
  }
  
  ngOnInit(): void {
    // console.log(this.cookie.get_code_student())
    if (!this.is_update){
      this.form = new FormNewActiviy("user",this.cookie.get_code_student())
    }
    else{
      this.api.get_activity_one(this.form.id).subscribe((data:ActivityModel)=>{
        this.form = data
      })
    }
    console.log(this.form.id)
  }

  closePopup() {
    this.form = new FormNewActiviy('user','')
    this.showPopup.emit()
  } 
  checkDateStartAndDateAnd():boolean{
    if (this.form.dateTimeEnd && this.form.dateTimeEnd.length>8){
      console.log(this.form.dateTimeEnd)
      let start = new Date(this.form.dateTimeStart)
      let end = new Date(this.form.dateTimeEnd)
      if (start.getTime() >= end.getTime()){
        return false
      }
    }
    else {
      // ทำเพื่อให้ผ่านการตรวจจับของหลังบ้าน
      this.form.dateTimeEnd = this.form.dateTimeStart
    }
    return true
  }
  addActivity() {
    let result = this.checkDateStartAndDateAnd()
    if (this.form.id <= 0 && result){
      // call api activity
      this.createActivity()
    }
    else if (result && this.form.id >= 0) {
      // call api
      this.updateActivity()
      
    }
  }
  showWarm(massege:string[]){
      for(let i of massege){
        if (i.includes('nameActivity')) this.warn.nameActivity = true
        else if (i.includes('dateTimeStart')) this.warn.dateTimeStart = true
        else if (i.includes('dateTimeEnd')) this.warn.dateTimeEnd= true
        else if (i.includes('location')) this.warn.location = true
        else if (i.includes('details')) this.warn.details = true
        else if (i.includes('participants')) this.warn.participants = true
      }
  }
  createActivity(){
    this.api.create_activity(this.form).subscribe((data:any)=>{
      let activity_id = data.id
      // call api asset
      if (this.fileUpload.length == 0){
        this.closePopup()
        return ;
      }
      console.log("asset")
      this.api.create_asset(this.fileUpload,activity_id).subscribe((data:any)=>{
        console.log("update file : ")
        console.log(data)
        this.closePopup()
      })
  
    },
    (error:any)=>{
      let massege:string[] = error.error.message
      this.showWarm(massege)
    }
    )
  }
  async updateActivity(){
    this.api.update_activity(this.form.id,this.form).subscribe((data:any)=>{
      console.log(data)
      // call api
      if (this.id_delete.length>0){
        console.log("-----------------")
        this.id_delete.forEach((id:any)=>{
          this.api.delete_asset(id,this.form.id).subscribe((data:any)=>{
            console.log("delete")
          })
        })
      }
      if (this.fileUpload.length <= 0 ){
        this.closePopup()
        return ;
      } else{
        this.api.update_asset(this.fileUpload,this.form.id).subscribe((data:any)=>{
          this.closePopup()
        })
      }

    },(error:any)=>{
      let massege:string[] = error.error.message
      this.showWarm(massege)
    })
  }

  onSelectFiles(event:any){
    let lenghtImg = 0
    let files = event.target.files
    if (files.length + this.urlFiles.length + this.form.asset.length > 6){
      this.alert.emit()
    }
    else{
      for(let file of event.target.files){
        this.readURL(file)
        if (lenghtImg>=4){
          break
        }
      }
    }
  }
  readURL(file: any): void {
    if (file) {
      this.fileUpload.push(new FormAsset(file,1))

      const reader = new FileReader();

      reader.onload = (e) => {
        let url = reader.result;
        this.urlFiles?.push(url)
      };

      reader.readAsDataURL(file);
    }
  }
  removePath(index:number){
    let x = this.form.asset.splice(index,1)
    console.log(x)
    this.id_delete.push(x[0].id)
  }
  removeUrlfile(index:number){
    this.urlFiles.splice(index,1)
  }
  isLinkImage(path:string){
    return path.includes('/images')
  }
}