import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseService } from '../../services/course.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,RouterLink],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent {

  courses: any[] = [];

  constructor(private courseService: CourseService) {

  this.courseService.getCourses().subscribe({
  next: (courses) => {
    this.courses = courses;
  },
  error: (err) => {
    console.log(err);
  }
});

    console.log("HomeComponent initialised — courses loaded");
  }

}