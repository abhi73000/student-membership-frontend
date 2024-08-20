import { Component } from '@angular/core';
import { StudentService } from '../../student-service/student.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  student: any;

  constructor(
    private service: StudentService
  ) { }

  ngOnInit() {
    this.getStudentById();
  }

  getStudentById() {
    this.service.getStudentById().subscribe((res) => {
      console.log(res);
      this.student = res.studentDto
    })
  }



  notifications = [

    'You have 3 new assignments due.',
    'Your parent-teacher meeting is scheduled for tomorrow.'
  ];


}

