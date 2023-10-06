import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  implements OnInit {

  loginModel = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthServiceService){}
 
 
  ngOnInit(): void {
    this.authService.LogIn;
    
  }

  isFormValid = false;

 
  isValidForm() {
    return (
      this.loginModel.email && 
      this.loginModel.password && 
      this.loginModel.email.includes('@') && 
      this.loginModel.password.length >= 5 
    );
  }


  onSubmit() {
    console.log(this.isValidForm());
    if (this.isValidForm()) {
      this.authService.LogIn(this.loginModel.email, this.loginModel.password);
    }
  }
}