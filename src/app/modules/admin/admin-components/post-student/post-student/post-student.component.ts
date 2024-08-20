import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../../../../auth/services/admin/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-student',
  templateUrl: './post-student.component.html',
  styleUrl: './post-student.component.scss'
})
export class PostStudentComponent {

  CLASS: string[] = ["9th", "10th", "11th", "12th"];

  GENDER: string[] = ["Male", "Female", "Not Specified"];


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
    private service: AdminService,
    private fb: FormBuilder,
    private snackBar:MatSnackBar,
    private router:Router,
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: ["", Validators.required],
      name: ["", Validators.required],
      password: ["", Validators.required],
      checkPassword: ["", Validators.required,this.confirmationValidator],
      studentClass: ["", Validators.required],
      birthDate: ["", Validators.required],
      address: ["", Validators.required],
      gender: ["", Validators.required]
    })
  }

  postStudent() {
    console.log(this.validateForm.value);
    this.isSpinning = true;
    this.service.addStudent(this.validateForm.value).subscribe((res) =>{
      this.isSpinning = false;
      if(res.id != null){
        // this.snackBar.open("Student added successfully","Close",{duration:5000});
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Student added successfully",
          showConfirmButton: false,
          timer: 1500
       
        });
        this.router.navigateByUrl("/admin/students");
      }else{
        // this.snackBar.open("Student already exist","Close",{duration:5000})
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Student already exist",
          showConfirmButton: false,
          timer: 1500
       
        });
      }
    })
  }


}
