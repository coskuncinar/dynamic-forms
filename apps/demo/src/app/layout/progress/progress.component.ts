import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { PROGRESS, Progress } from '../../state/progress/progress.model';

@Component({
  standalone: true,
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss'],
  imports: [CommonModule, MatProgressBarModule],
})
export class ProgressComponent {
  @Select(PROGRESS)
  progress$: Observable<Progress>;
}
