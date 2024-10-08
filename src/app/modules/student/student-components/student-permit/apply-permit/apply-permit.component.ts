import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StudentService } from '../../student-service/student.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-apply-permit',
  templateUrl: './apply-permit.component.html',
  styleUrl: './apply-permit.component.scss'
})
export class ApplyPermitComponent {


  isSpinning =  false;
  validateForm! : FormGroup;

  constructor(
    private service: StudentService,
    private fb: FormBuilder,
    private snackBar:MatSnackBar,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      subject: ["", Validators.required],
      body: ["", Validators.required],
    });
  }

  applyPermit() {
    this.isSpinning = true;
    console.log(this.validateForm.value);
    this.service.applyPermit(this.validateForm.value).subscribe((res) => {
      console.log(res);
      this.isSpinning = false;
      if (res && res.id != null) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Permit submitted successfully",
          showConfirmButton: false,
          timer: 1500
       
        });
        this.router.navigateByUrl("/student/dashboard");
      } else {
        // this.snackBar.open("Something went wrong", "ERROR", { duration: 5000 });
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Something went wrong",
          showConfirmButton: false,
          timer: 1500
       
        });
      }
    }, (error) => {
      this.isSpinning = false;
      console.error("Error occurred while submitting permit:", error);
      // this.snackBar.open("Something went wrong", "ERROR", { duration: 5000 });
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Something went wrong",
        showConfirmButton: false,
        timer: 1500
     
      });
    });
  }
  
}
