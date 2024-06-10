import { isNgTemplate } from '@angular/compiler';
import { Component, ViewChild} from '@angular/core';
import{NgForm} from '@angular/forms';
import {MoviesDataService} from './services/movies-data.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-root',//determines how you can use the component in your HTML templates.
  templateUrl: './app.component.html',//points to an external HTML file that defines the component's structure.
  styleUrls: ['./app.component.css']//point to external CSS files that define the component's styling.
  
})
export class AppComponent {
  title = 'Movie Form';
  title1 = 'Movies';
  title2 = 'Updating Movie';
  userdata:any={};
  movies:any;
  @ViewChild('myForm') myForm!: NgForm;
  
  selectedMovie: any; // Property to hold the selected movie
  
  updatedMovieData: any = {}; 
// Object to hold updated movie date
  
  // Method to set the updatedMovieData based on the selected movie
  prepareUpdateData(movie: any) {
    this.selectedMovie = movie;
    this.updatedMovieData = { ...movie }; // Copy values from the selected movie
  //shallow copy of the selected movie. This keep the original movie data intact while allowing modifications to be made to the copied data.
  }
  constructor(private moviesData:  MoviesDataService,private http: HttpClient)
   {
    this.fetch();
   }
   //getData(data:NgForm)
 // {
   // console.log(data);
    //this.userdata=data;
 // }
  fetch() {
    this.moviesData.movies().subscribe((data) => {
      console.log("data", data);//retrieved data to the console.
      this.movies = data;
    });
  }
  addMovie(form:any) {
    if (form.valid) {
      const movieValue = form.value;
      this.http.post<any>('http://localhost:5001/api/movies', movieValue).subscribe({
        next: (response) => {
          console.log('Movie added:', response);
          //this.movies.push(response);
          form.resetForm();
          this.fetch();
        },
        error: (error) => {
          console.error('Error adding movie:', error);
        }
      });
    }
  }

  updateMovie() {
    if (this.selectedMovie) {
      const id = this.selectedMovie.id;
      
      this.http.put<any>(`http://localhost:5001/api/movies/${id}`, this.updatedMovieData)
        .subscribe({
          next: (response) => {
            console.log('Movie updated:', response);
            // Update movies list or perform any other action
            
            this.updatedMovieData = {}; // Clear updatedMovieData
            this.fetch();
          },
          error: (error) => {
            console.error('Error updating movie:', error);
          },
        });
    }
  }
  
  deleteMovie(id: string) {
    console.log("Deleting movie with ID:", id);
    this.http.delete(`http://localhost:5001/api/movies/${id}`).subscribe({
      next: () => {
        console.log('Movie deleted successfully');
        // Update the movies array after successful deletion
        this.fetch();
      },
      error: (error) => {
        console.error('Error deleting movie:', error);
      }
    });
  }
   
  
  // ... other methods ...
}

  

