import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmailVerificationDialogComponent } from 'src/app/email-verification-dialog/email-verification-dialog.component';
import { AuthServiceService } from 'src/app/services/auth-service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  [x: string]: any;
  signupModel = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  };

  constructor(
    private authService: AuthServiceService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.authService.signUp;
  }


  isValidForm() {
    return (
      this.signupModel.firstName.length >= 5 &&
      this.signupModel.lastName.length >= 5 &&
      this.signupModel.email &&
      this.signupModel.password &&
      this.signupModel.email.includes('@') &&
      this.signupModel.password.length >= 5
    );
  }

  onSignup() {
    this.authService.signUp(this.signupModel.email, this.signupModel.password);
    this.openVerificationDialog();
  }
  openVerificationDialog(): void {
    const dialogRef = this['dialog'].open(EmailVerificationDialogComponent, {
      width: '600px',
      height: '300px'
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('The dialog was closed');
    });
  }
}
