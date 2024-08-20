import { Component } from '@angular/core';
import { StudentService } from '../student-service/student.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-student',
  templateUrl: './update-student.component.html',
  styleUrl: './update-student.component.scss'
})
export class UpdateStudentComponent {
  CLASS: string[] = ["1st", "2nd", "3rd", "4th"];

  GENDER: string[] = ["Male", "Female", "Not Specified"];

  student:any;
  isSpinning: boolean;
  validateForm: FormGroup;


  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true }
    } else if (control.value !== this.validateForm.controls["password"].value) {
      return { confirm: true, error: true };
    }
    return {};
  }

  constructor(
    private service: StudentService,
    private fb: FormBuilder,
    private snackBar:MatSnackBar,
    private router:Router,
    
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: ["", Validators.required],
      name: ["", Validators.required],
      studentClass: ["", Validators.required],
      birthDate: ["", Validators.required],
      address: ["", Validators.required],
      gender: ["", Validators.required]
    })

    this.getStudentById();
  }

  getStudentById(){
    this.service.getStudentById().subscribe((res) =>{
      console.log(res);
      const student = res.studentDto;
      this.validateForm.patchValue(student);
    })
  }

  updateStudent(){
    this.isSpinning= true;
    this.service.updateStudent(this.validateForm.value).subscribe((res) =>{
      console.log(res);
      this.isSpinning = false;
      if(res.id != null){
        // this.snackBar.open("Record updated successfully","Close",{duration:5000})
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Record updated successfully',
          showConfirmButton: false,
          timer: 1500,
          width: '350px'
        })
        this.getStudentById();
        this.router.navigateByUrl("/student/dashboard");
      }else{
        this.snackBar.open("Student not found","Close",{duration:5000})

      }
    })
  }
}
