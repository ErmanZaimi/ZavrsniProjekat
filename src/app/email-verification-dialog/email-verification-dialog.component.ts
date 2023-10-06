import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
@Component({
  selector: 'app-email-verification-dialog',
  templateUrl: './email-verification-dialog.component.html',
  styleUrls: ['./email-verification-dialog.component.css']
})
export class EmailVerificationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<EmailVerificationDialogComponent>,
    private router: Router
  ) { }

  resendEmail() { 
    this.dialogRef.close();
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
    this.dialogRef.close();
  }

}
