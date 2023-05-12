import { Component, Input, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  /**
   * Holds the user's data
   */
  user: any = {};

  /**
   * Holds the user's data for when it is being updated
   */
  @Input() updatedUser = {
    Username: '',
    Password: '',
    Email: '',
    Birthday: '',
  };

  /**
   * Holds the user's favorite movies
   */
  favorites: any = [];

  /**
   * Creates an instance of ProfileComponent.
   *
   * @param fetchApiData The UserRegistrationService used to fetch and modify the user data
   * @param snackBar The MatSnackBar used to display notifications to the user
   * @param router The Router used to navigate to other pages in the application
   */
  constructor(
    public fetchApiData: UserRegistrationService,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

  /**
   * Runs when the component is initialized.
   *
   * Calls the `getUserInfo` method to fetch the user's data.
   */
  ngOnInit(): void {
    this.getUserInfo();
  }

  /**
   * Fetches the user's information from the API.
   */
  getUserInfo(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.user = resp;
      this.updatedUser.Username = this.user.Username;
      this.updatedUser.Email = this.user.Email;
      this.updatedUser.Birthday = formatDate(
        this.user.Birthday,
        'yyyy-MM-dd',
        'en-US',
        'UTC+0'
      );
      this.favorites = this.user.FavoriteMovies;
      return this.user;
    });
  }

  /**
   * Calls the `editUser` method from `UserRegistrationService` to update the user information, such as username, password, email, or birthday.
   */
  updateUserInfo(): void {
    this.fetchApiData.editUser(this.updatedUser).subscribe((result) => {
      console.log(result);
      if (
        this.user.Username !== result.Username ||
        this.user.Password !== result.Password
      ) {
        localStorage.clear();
        this.router.navigate(['welcome']);
        this.snackBar.open(
          'Credentials updated! Please login using your new credentials',
          'OK',
          {
            duration: 2000,
          }
        );
      } else {
        this.snackBar.open('User information has been updated!', 'OK', {
          duration: 2000,
        });
      }
    });
  }

  /**
   * Deletes the user data for the user that is logged in. Confirms with the user before deleting the account.
   */
  deleteAccount(): void {
    if (confirm('All your data will be lost - this cannnot be undone!')) {
      this.router.navigate(['welcome']).then(() => {
        this.snackBar.open(
          'You have successfully deleted your account - we are sorry to see you go!',
          'OK',
          {
            duration: 2000,
          }
        );
      });
      this.fetchApiData.deleteUser().subscribe((result) => {
        console.log(result);
        localStorage.clear();
      });
    }
  }
}
