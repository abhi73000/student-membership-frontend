import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../../auth/services/admin/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-all-teachers',
  templateUrl: './all-teachers.component.html',
  styleUrls: ['./all-teachers.component.scss']
})
export class AllTeachersComponent implements OnInit {

  teachers = [];
  filteredTeachers = [];
  loading = false;
  error: string | null = null;

  constructor(private service: AdminService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.loadTeachers();
  }

  loadTeachers() {
    this.loading = true;
    this.service.getAllTeachers().subscribe(
      (data) => {
        this.teachers = data;
        this.filteredTeachers = [...this.teachers];
        this.loading = false;
      },
      (err) => {
        this.error = 'Failed to load teacher data.';
        this.loading = false;
      }
    );
  }

  applyFilter(event: Event) {
    const input = event.target as HTMLInputElement;
    const filterValue = input.value.trim().toLowerCase();
    this.filteredTeachers = this.teachers.filter(teacher =>
      teacher.name.toLowerCase().includes(filterValue)
    );
  }

  deleteTeacher(teacherId: number) {
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
        this.service.deleteTeacher(teacherId).subscribe(
          () => {
            this.loadTeachers(); // Refresh the list of teachers
            Swal.fire('Deleted!', 'The teacher has been deleted.', 'success');
          },
          (error) => {
            Swal.fire('Error!', 'There was an issue deleting the teacher. Please try again.', 'error');
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'The teacher is safe :)', 'error');
      }
    });
  }

  // contactTeacher(email: string) {
  //   window.location.href = `mailto:${email}`;
  // }
}
