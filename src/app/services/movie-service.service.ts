import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie.model';
import { MovieDetail } from '../models/movie-detail.model';

@Injectable({
  providedIn: 'root'
})
export class MovieServiceService {

  constructor(private http: HttpClient) { }
  getAllMovies():Observable<Movie[]>{
    return this.http.get<Movie[]>("movies");
  }

  getMovie(id:string):Observable<MovieDetail>{
    return this.http.get<MovieDetail>(`movies/${id}`);
  }
}
