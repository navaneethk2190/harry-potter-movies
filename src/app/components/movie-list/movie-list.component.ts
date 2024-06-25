import { Component } from '@angular/core';
import { Movie } from '../../models/movie.model';
import { MovieServiceService } from '../../services/movie-service.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DurationPipe } from '../../pipes/duration.pipe';
import { DollarPipe } from '../../pipes/dollar.pipe';


@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, DurationPipe, DollarPipe, ReactiveFormsModule],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css'
})
export class MovieListComponent {
  allMovies: Array<Movie> = [];
  filteredMovies: Array<Movie> = [];
  movieFilterForm!: FormGroup;
  constructor(private service: MovieServiceService, private router: Router,private fb: FormBuilder) { 
    this.movieFilterForm = fb.group({
      mTitle: new FormControl(''),
      mReleaseYear: new FormControl('')
    })  
  }

  ngOnInit(): void {
    this.service.getAllMovies().subscribe((response: Movie[]) => {
      this.allMovies = response;
      this.filteredMovies = response;
    });  
    this.movieFilterForm.valueChanges.subscribe(change => {
      this.applyFilter(change);
    });  
  }
  applyFilter(filterParam: any) {
    let title = filterParam.mTitle.toLowerCase().trim();
    let releaseYear = filterParam.mReleaseYear;
    if(title || releaseYear){
      this.filteredMovies = this.allMovies.filter((movie) => 
        movie.title.toLowerCase().includes(title || "") &&
        movie.release_date.includes(releaseYear || "")
      );
    }else{
      this.filteredMovies = this.allMovies;
    }
  }
  viewMovieDetails(id: string): void {
    this.router.navigate(["movies/" + id])
  }
}
