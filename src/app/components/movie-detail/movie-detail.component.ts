import { Component } from '@angular/core';
import { MovieDetail } from '../../models/movie-detail.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieServiceService } from '../../services/movie-service.service';
import { DurationPipe } from '../../pipes/duration.pipe';
import { DollarPipe } from '../../pipes/dollar.pipe';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [DurationPipe, DollarPipe],
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.css'
})
export class MovieDetailComponent {
  id: string = "";
  movieDetail!: MovieDetail;

  constructor(private route: ActivatedRoute, private service: MovieServiceService, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.service.getMovie(this.id).subscribe((response: MovieDetail) => {
        this.movieDetail = response;
      })
    });
  }

  navigateMovieList(): void {
    this.router.navigate(["movies"])
  }
}
