import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss'],
})
export class UserLoginFormComponent implements OnInit {
  /**
   * @var userData
   * @desc holds the user login data such as username and password
   */
  @Input() userData = { Username: '', Password: '' };

  /**
   * @constructor
   * @param {UserRegistrationService} fetchApiData - instance of UserRegistrationService to make API calls
   * @param {MatDialogRef} dialogRef - instance of MatDialogRef to close the dialog on success
   * @param {MatSnackBar} snackBar - instance of MatSnackBar to display notifications to the user
   * @param {Router} router - instance of Router to navigate to different routes
   */
  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  /**
   * @desc this method is called when the component is being initiated
   * @returns void
   */
  ngOnInit(): void {}

  /**
   * @desc this method logs in the user and sets the user and token in localStorage
   * @returns void
   */
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe(
      (result) => {
        let user = result.user.Username;
        let token = result.token;
        localStorage.setItem('user', user);
        localStorage.setItem('token', token);
        this.dialogRef.close();
        this.router.navigate(['movies']);
        this.snackBar.open('log in successful', 'OK', {
          duration: 2000,
        });
      },
      (result) => {
        this.snackBar.open(result, 'OK', {
          duration: 2000,
        });
      }
    );
  }
}
