import { Component } from '@angular/core';
import { AdminService } from '../../../../auth/services/admin/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-teacher',
  templateUrl: './post-teacher.component.html',
  styleUrl: './post-teacher.component.scss'
})
export class PostTeacherComponent {

  GENDER: string[] = ["Male", "Female", "Not Specified"];

  validateForm: FormGroup;
  isSpinning:boolean = false;

  constructor(private service:AdminService,
    private fb:FormBuilder,
    private snackBar:MatSnackBar,
    private router:Router,
  ){}

  ngOnInit(){
    this.validateForm = this.fb.group({
      name: ["", Validators.required],
      department: ["", Validators.required],
      qualification: ["", Validators.required],
      birthDate: ["", Validators.required],
      address: ["", Validators.required],
      gender: ["", Validators.required]
    })
  }

  postTeacher(){
    console.log(this.validateForm.value);
    this.isSpinning = true;
    this.service.addTeacher(this.validateForm.value).subscribe((res) =>{
      this.isSpinning = false;
      if(res.id != null){
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Teacher added successfully",
          showConfirmButton: false,
          timer: 1500
       
        });
        this.router.navigateByUrl("/admin/teachers");
      }else{
        this.snackBar.open("Teacher already exist","Close",{duration:5000})
      }
    })
  }

}
