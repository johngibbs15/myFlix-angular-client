// src/app/movie-card/movie-card.component.ts
import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';

import { GenreComponent } from '../genre-view/genre-view.component';
import { DirectorComponent } from '../director-view/director-view.component';
import { MovieDetailsComponent } from '../movie-details-view/movie-details-view.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent {
  movies: any[] = [];
  user: any = {};
  favoriteMovies: any[] = [];

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getMovies();
    this.getFavMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  getFavMovies(): void {
    this.fetchApiData.getUser().subscribe((res: any) => {
      this.favoriteMovies = res.FavoriteMovies;
      console.log('getFavMovies():', res.FavoriteMovies);
      return this.favoriteMovies;
    });
  }

  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreComponent, {
      data: {
        Name: name,
        Description: description,
      },
    });
  }

  openDirectorDialog(name: string, bio: string): void {
    this.dialog.open(DirectorComponent, {
      data: {
        Name: name,
        Bio: bio,
      },
    });
  }

  openMovieDetailsDialog(name: string, bio: string): void {
    this.dialog.open(MovieDetailsComponent, {
      data: {
        Name: name,
        Synopsis: bio,
      },
    });
  }
}
