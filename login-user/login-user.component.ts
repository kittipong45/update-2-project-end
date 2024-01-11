// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { ApiUser } from '../API/api-user';
// import { Cookie } from '../Cookie/cookie';

// @Component({
//   selector: 'app-login-user',
//   templateUrl: './login-user.component.html',
//   styleUrls: ['./login-user.component.css']
// })
// export class LoginUserComponent {

//   constructor(private router : Router , private Api : ApiUser , private cookie : Cookie) {}

//   code_student : string = "" ;
//   password : string = "" ;

//   error_code_student: boolean = false;
//   error_password : boolean = false;

//   rememberPassword: boolean = true;

//   login() {
//     this.cookie.get_code_student()
//     console.log(this.cookie.get_code_student())
//     this.error_code_student = false
//     this.error_password = false

//     if(this.code_student.length != 8){
//       this.error_code_student = true
//       console.log("ooo")
//     }
//     if(this.password.length != 8){
//       this.error_password = true
//     } 
//     console.log(1)

//     console.log(this.error_code_student,this.error_password)

//     if (!this.error_code_student && !this.error_password){
//       this.Api.loginUser({code_student : this.code_student , password : this.password}).subscribe(
//         (next:any) => {                           //Next callback
//           console.log('response received')
//           console.log(next)

//           if (next.code_student){
//             if (this.rememberPassword == true){
//               console.log(next)
//               this.cookie.remember_password(next.code_student , next.password);
//             }
//             this.router.navigate(['/home']);
//           }
//           else if (next.status === 404){
//             // this.error_code_student = true
//             this.error_password = true
//             this.password = ""
//             console.log(2)
//           }
//           else if(next.status === 406){
//             // console.log("dkdkdk")
//             this.error_password = true
//             console.log(3)
//           }
//           next = null
//         }
  
//       )
//     }
//     console.log(`Username: ${this.code_student}, Password: ${this.password}`);
//   }
  
//   isValidForm(): boolean {
//     return this.code_student.length === 8 && this.password.trim() !== '';
//     // return this.code_student.length <= 8 && this.password.length >= 0;
//   }

//   navigateToLogin() {
//     this.router.navigate(['/login']);
//   }
// }
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiUser } from '../API/api-user';
import { Cookie } from '../Cookie/cookie';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent {

  constructor(private router : Router , private Api : ApiUser , private cookie : Cookie) {}

  code_student : string = "64021700" ;
  password : string = "Tub@0885591425" ;

  error_code_student: boolean = false;
  error_password : boolean = false;

  rememberPassword: boolean = true;

  login() {
    this.cookie.get_code_student()
    // console.log(this.cookie.get_code_student())
    this.error_code_student = false
    this.error_password = false

    if(this.code_student.length != 8){
      this.error_code_student = true
      // console.log("ooo")
    }
    if(this.password.length < 8){
      this.error_password = true
    } 
    // console.log(1)

    console.log(this.error_code_student,this.error_password)

    if (!this.error_code_student && !this.error_password){
      console.log("jion")
      this.Api.login_user({code_student : this.code_student , password : this.password}).subscribe(
        (next:any) => {                           //Next callback
          // console.log('response received')
          // console.log(next.status)

          if (next.accessToken){
            // if (this.rememberPassword == true){
            //   // console.log(next)
            //   // this.cookie.remember_password(next.code_student , next.password);
            // }
            this.cookie.set_token(next.accessToken)
            this.router.navigate(['/home']);
          }
        },
        (error:any)=>{
          console.log("error")
          console.log(error)
          if (error.error.message == "Invalid email"){
            this.error_code_student = true
            this.error_password = true
            this.password = ""
            this.code_student = ""
          }
          else if (error.error.message == "Invalid password"){
            this.password = ""
            this.error_password = true
          }
        }
  
      )
    }

    console.log(`Username: ${this.code_student}, Password: ${this.password}`);
  }
  
  isValidForm(): boolean {
    return this.code_student.length === 8 && this.password.trim() !== '';
    // return this.code_student.length <= 8 && this.password.length >= 0;
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}