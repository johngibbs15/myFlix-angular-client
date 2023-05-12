import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-genre-view',
  templateUrl: './genre-view.component.html',
  styleUrls: ['./genre-view.component.scss'],
})
export class GenreComponent {
  public data: {
    Name: string;
    Description: string;
  };
  constructor(
    @Inject(MAT_DIALOG_DATA)
    data: {
      Name: string;
      Description: string;
    }
  ) {
    this.data = data;
  }
}
