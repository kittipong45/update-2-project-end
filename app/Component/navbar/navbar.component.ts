import { Component, OnInit } from '@angular/core';
import { Cookie } from 'src/app/Cookie/cookie';
import { FormRegister } from 'src/app/model/form';
import { RegisterModel } from 'src/app/model/model';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  constructor(private cookie:Cookie){}

  profileImageSrc: string = '../../assets/image/profile.png';
  
  is_edit:boolean = true;
  form! : RegisterModel|FormRegister
  urlFile:any
  isDropdownOpen: boolean = false;

  ngOnInit(): void {
    this.profileImageSrc = this.cookie.get_profile()
    if (this.profileImageSrc){
      this.profileImageSrc = environment.localhost_back+"/asset/" + this.profileImageSrc
    }
    else {
      let profix = this.cookie.get_profix()
      if (profix=="นาย"){
        this.profileImageSrc = '../../assets/image/profile.png';
      }
      else if (profix=="นางสาว"){
        this.profileImageSrc = '../../assets/image/profile-girl.png'
      }
    }
      
  }
  setChangeIsEdit(){
    this.is_edit = false;
  }

  onSelectFiles(event:any){
    console.log("ddkdkdkdk")
    this.setChangeIsEdit()
    let lenghtImg = 0
    this.readURL(event.target.files[0])
    
    this.profileImageSrc = 'path_to_new_image.jpg';
  }
  readURL(file: any): void {
    if (file) {
      this.form.profile = file

      // this.fileUpload.push(new FormAsset(file,1))
      this.form.profile = file
      const reader = new FileReader();

      reader.onload = (e) => {
        let url = reader.result;
        this.urlFile = url
        this.profileImageSrc = url as string;
      };
    }
  }

  UserDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

}
