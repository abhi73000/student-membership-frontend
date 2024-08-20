import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../../auth/services/admin/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-all-students',
  templateUrl: './all-students.component.html',
  styleUrls: ['./all-students.component.scss']
})
export class AllStudentsComponent implements OnInit {

  students: any[] = [];
  filteredStudents: any[] = [];
  totalStudents: number = 0;
  pageSize: number = 10;
  loading: boolean = false;
  error: string | null = null;

  constructor(
    private service: AdminService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.loadStudents();
  }

  loadStudents() {
    this.loading = true;
    this.service.getAllStudents().subscribe(
      data => {
        this.students = data;
        this.filteredStudents = data;
        this.totalStudents = data.length;
        this.loading = false;
      },
      err => {
        this.error = 'Failed to load student data.';
        this.loading = false;
      }
    );
  }

  applyFilter(event: Event) {
    const input = event.target as HTMLInputElement;
    const filterValue = input.value.trim().toLowerCase();
    this.filteredStudents = this.students.filter(student =>
      student.name.toLowerCase().includes(filterValue)
    );
  }

  onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.filteredStudents = this.students.slice(startIndex, endIndex);
  }

  deleteStudent(studentId: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deleteStudent(studentId).subscribe(
          (res) => {
            this.loadStudents(); // Refresh the student list
            Swal.fire(
              'Deleted!',
              'The student has been deleted.',
              'success'
            );
          },
          (error) => {
            Swal.fire(
              'Error!',
              'There was an issue deleting the student. Please try again.',
              'error'
            );
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'The student is safe :)',
          'error'
        );
      }
    });
  }
}
