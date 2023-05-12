import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * API endpoint URL
 */
const apiUrl = 'https://dry-chamber-05388.herokuapp.com';

/**
 * Service for handling user registration, login and fetching data from the API
 */
@Injectable({
  providedIn: 'root',
})
export class UserRegistrationService {
  /**
   * Constructor for the UserRegistrationService
   * @param http HttpClient instance for making HTTP requests
   */
  constructor(private http: HttpClient) {}

  /**
   * Method for registering a new user
   * @param userDetails user details object
   * @returns Observable containing the response from the API
   */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(`${apiUrl}/users`, userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * Method for logging in a user
   * @param userDetails user details object
   * @returns Observable containing the response from the API
   */
  userLogin(userDetails: any): Observable<any> {
    return this.http
      .post(
        apiUrl +
          `/login?Username=${userDetails.Username}&Password=${userDetails.Password}`,
        userDetails
      )
      .pipe(catchError(this.handleError));
  }

  /**
   * Method for fetching all movies
   * @returns Observable containing the response from the API
   */
  getAllMovies(): Observable<any> {
    /**
     * Get the token from local storage
     */
    const token = localStorage.getItem('token');
    console.log('Token:', token);
    return this.http
      .get(`${apiUrl}/movies`, {
        /**
         * Add the authorization header
         */
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Method for fetching a movie by title
   * @param Title movie title
   * @returns Observable containing the response from the API
   */
  getMovie(Title: string): Observable<any> {
    /**
     * Get the token from local storage
     */
    const token = localStorage.getItem('token');
    return this.http
      .get(`${apiUrl}/movies/${Title}`, {
        /**
         * Add the authorization header
         */
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })

      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Get a list of movies by the given director name
   * @param directorName The name of the director
   * @returns An Observable with the response data
   */
  getDirector(directorName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(`${apiUrl}/movies/directors/${directorName}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Get a list of movies by the given genre name
   * @param genreName The name of the genre
   * @returns An Observable with the response data
   */
  getGenre(genreName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(`${apiUrl}movies/genre/${genreName}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Get the details of the currently logged in user
   * @returns An Observable with the response data
   */
  getUser(): Observable<any> {
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return this.http
      .get(`${apiUrl}/users/${username}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Get a list of favourite movies of the currently logged in user
   * @returns An Observable with the response data
   */
  getFavouriteMovies(): Observable<any> {
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return this.http
      .get(`${apiUrl}/users/${username}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // get a JSON object of a single movie by _id
  getMovieById(_id: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(`${apiUrl}/movies/${_id}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Add a movie to the list of favourite movies of the currently logged in user
   * @param MovieID The ID of the movie to be added
   * @returns An Observable with the response data
   */
  addMovie(MovieID: string): Observable<any> {
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return this.http
      .post(`${apiUrl}/users/${username}/movies/${MovieID}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  editUser(updatedUser: any): Observable<any> {
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return this.http
      .put(`${apiUrl}/users/${username}`, updatedUser, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Delete a user
   * @returns An Observable with the deleted user's data
   */
  deleteUser(): Observable<any> {
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return this.http
      .delete(`${apiUrl}/users/${username}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Delete a movie from a user's favorite movies list
   * @param MovieID - The ID of the movie to be deleted
   * @returns An Observable with the updated user's data
   */
  deleteMovie(MovieID: string): Observable<any> {
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return this.http
      .delete(`${apiUrl}/users/${username}/movies/${MovieID}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Handle errors from HTTP requests
   * @param error - The HTTP error response
   * @returns An observable with a error message
   */
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, `,
        'Error body is:',
        error.error
      );
    }
    return throwError('Something bad happened; please try again later.');
  }

  /**
   * Extract the response data from a HTTP response
   * @param res - The HTTP response
   * @returns The response data
   */
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }
}
