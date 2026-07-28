import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { EnrollmentService } from '../../services/enrollment.service';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [],
  templateUrl: './course-card.html',
  styleUrls: ['./course-card.css']
})
export class CourseCard {

  @Input() course!: Course;

  constructor(
    public enrollmentService: EnrollmentService,
    private router: Router
  ) {}

  toggleEnrollment() {
    if (this.enrollmentService.isEnrolled(this.course.id)) {
      this.enrollmentService.unenroll(this.course.id);
    } else {
      this.enrollmentService.enroll(this.course.id);
    }
  }

  viewDetails() {
    this.router.navigate(['courses', this.course.id]);
  }

}