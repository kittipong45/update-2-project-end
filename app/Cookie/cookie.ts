
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
    providedIn:"root"
})

export class Cookie {
  constructor(private cookieService: CookieService) {

  }
  set_data(code_student:string,profile:string,profix:string){
    console.log(code_student,profile)
    this.cookieService.set('code_student',code_student)
    this.cookieService.set('profile',profile)
    this.cookieService.set('profix',profix)
  }

  set_token(token:string){
    this.cookieService.set('my_token',token)
  }
  remember_password(code_student : string , password : string){
    this.cookieService.set('code_student',code_student)
    this.cookieService.set('password',password)

  }
  get_token(){
    return "bearer "+ this.cookieService.get('my_token')
  }

  get_code_student(){
    return this.cookieService.get("code_student")
  }

  get_profile(){
    return this.cookieService.get("profile")
  }
  get_profix(){
    return this.cookieService.get("profix")
  }
}