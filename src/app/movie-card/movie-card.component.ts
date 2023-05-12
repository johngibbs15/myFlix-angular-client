import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenreComponent } from '../genre-view/genre-view.component';
import { DirectorComponent } from '../director-view/director-view.component';
import { MovieDetailsComponent } from '../movie-details-view/movie-details-view.component';

/**
 * Component to display movie cards
 */
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  user: any = {};
  favoriteMovies: any[] = [];

  /**
   * Constructor for the movie card component
   * @param fetchApiData - Service for fetching movie data
   * @param dialog - Material dialog for opening different movie related dialogs
   * @param snackBar - Material snackbar for displaying snackbar messages
   */
  constructor(
    public fetchApiData: UserRegistrationService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  /**
   * OnInit life cycle hook implementation to get movies and favorite movies
   */
  ngOnInit(): void {
    this.getMovies();
    this.getFavMovies();
  }

  /**
   * Method to get all movies
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  /**
   * Method to add movie to favorite list
   * @param id - id of the movie to be added to favorite list
   */
  addToFavorites(id: string): void {
    console.log(id);
    this.fetchApiData.addMovie(id).subscribe((result) => {
      this.snackBar.open('Movie added to favorites', 'OK', {
        duration: 2000,
      });
      this.ngOnInit();
    });
  }

  /**
   * Method to get all favorite movies of the user
   */
  getFavMovies(): void {
    this.fetchApiData.getUser().subscribe((res: any) => {
      this.favoriteMovies = res.FavoriteMovies;
      console.log('getFavMovies():', res.FavoriteMovies);
      return this.favoriteMovies;
    });
  }

  getFavorites(): void {}

  /**
   * Opens the genre dialog and displays the name and description of the genre.
   *
   * @param name The name of the genre to display.
   * @param description The description of the genre to display.
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
   * Opens the director dialog and displays the name and bio of the director.
   *
   * @param name The name of the director to display.
   * @param bio The bio of the director to display.
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
   * Opens the movie details dialog and displays the name and synopsis of the movie.
   *
   * @param name The name of the movie to display.
   * @param bio The synopsis of the movie to display.
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
