import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  code_student! : string;
  password!: string;
  rememberPassword: boolean = false;

  forgotpassword(){
    if (this.isValidForm()) {
      
      this.router.navigate(['/login']);
    }
  }

  isValidForm(): boolean {
    return this.code_student.trim() !== '' && this.password.trim() !== '';
  }

  constructor(private router: Router) {}
}
