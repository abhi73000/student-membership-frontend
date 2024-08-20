import { Component } from '@angular/core';
import { AdminService } from '../../../../auth/services/admin/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-student',
  templateUrl: './update-student.component.html',
  styleUrl: './update-student.component.scss'
})
export class UpdateStudentComponent {

  studentId:number = this.activatedRoute.snapshot.params["studentId"]

  CLASS: string[] = ["1st", "2nd", "3rd", "4th"];

  GENDER: string[] = ["Male", "Female", "Not Specified"];

  isSpinning:boolean;

  validateForm:FormGroup

  constructor(private service:AdminService,
    private fb:FormBuilder,
    private snackBar:MatSnackBar,
    private activatedRoute:ActivatedRoute,
    private router:Router,
  ){}

  ngOnInit(){

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
    this.service.getStudentById(this.studentId).subscribe((res)=>{
      const student = res.studentDto;
      this.validateForm.patchValue(student);
      console.log(res);
    })
  }


  updateStudent(){
    this.service.updateStudent(this.studentId,this.validateForm.value).subscribe((res)=>{
      console.log(res);
      if(res.id != null){
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Student attributes updated successfully!",
          showConfirmButton: false,
          timer: 1500       
        });
        this.router.navigateByUrl("/admin/students");
      }else{
        this.snackBar.open("Student not found","Close",{duration:5000})
      }
    })
  }


}
