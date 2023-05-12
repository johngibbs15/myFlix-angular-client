import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenreComponent } from '../genre-view/genre-view.component';
import { DirectorComponent } from '../director-view/director-view.component';
import { MovieDetailsComponent } from '../movie-details-view/movie-details-view.component';

/**
 * Component to display the list of favorite movies of the currently logged in user
 */
@Component({
  selector: 'app-favorite-movies',
  templateUrl: './favorite-movies.component.html',
  styleUrls: ['./favorite-movies.component.scss'],
})
export class FavoriteMoviesComponent implements OnInit {
  movies: any[] = [];
  user: any = {};
  favoriteMovies: any[] = [];
  favoriteMovieList: any[] = [];

  /**
   * Constructor for the FavoriteMoviesComponent
   * @param fetchApiData Service for handling data from the API
   * @param dialog Material dialog instance
   * @param snackBar Material snackbar instance
   */
  constructor(
    public fetchApiData: UserRegistrationService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  /**
   * Angular lifecycle hook to get the favorite movies of the currently logged in user on component initialization
   */
  ngOnInit(): void {
    this.getFavMovies();
    this.getMovies();
  }

  /**
   * Get all movies from the API
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
    });
  }

  /**
   * Add a movie to the favorite movies of the currently logged in user
   * @param id The ID of the movie to be added
   */
  addToFavorites(id: string): void {
    this.fetchApiData.addMovie(id).subscribe((result) => {
      this.snackBar.open('Movie added to favorites', 'OK', {
        duration: 2000,
      });
      this.getFavMovies();
    });
  }

  /**
   * Remove a movie from the favorite movies of the currently logged in user
   * @param id The ID of the movie to be removed
   */
  removeFavorites(id: string): void {
    this.fetchApiData.deleteMovie(id).subscribe((result) => {
      this.snackBar.open('Movie deleted', 'OK', {
        duration: 2000,
      });
      this.getFavMovies();
    });
  }

  /**
   * This method is used to get the favorite movies of the user
   */
  getFavMovies(): void {
    this.fetchApiData.getUser().subscribe((res: any) => {
      this.favoriteMovies = res.FavoriteMovies;
      this.favoriteMovieList = this.movies.filter((movie) =>
        this.favoriteMovies.includes(movie._id)
      );
    });
  }

  /**
   * This method is used to open the genre dialog
   * @param name - name of the genre
   * @param description - description of the genre
   */
  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreComponent, {
      data: {
        Name: name,
        Description: description,
      },
    });
  }

  /**
   * This method is used to open the director dialog
   * @param name - name of the director
   * @param bio - bio of the director
   */
  openDirectorDialog(name: string, bio: string): void {
    this.dialog.open(DirectorComponent, {
      data: {
        Name: name,
        Bio: bio,
      },
    });
  }

  /**
   * This method is used to open the movie details dialog
   * @param name - name of the movie
   * @param bio - synopsis of the movie
   */
  openMovieDetailsDialog(name: string, bio: string): void {
    this.dialog.open(MovieDetailsComponent, {
      data: {
        Name: name,
        Synopsis: bio,
      },
    });
  }
}
