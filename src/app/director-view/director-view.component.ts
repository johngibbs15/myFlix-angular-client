import { Component, Inject, Output, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-director-view',
  templateUrl: './director-view.component.html',
  styleUrls: ['./director-view.component.scss'],
})
export class DirectorComponent {
  @Output() close = new EventEmitter();

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Name: string;
      Bio: string;
    }
  ) {}

  onClose() {
    this.close.emit();
  }
}
