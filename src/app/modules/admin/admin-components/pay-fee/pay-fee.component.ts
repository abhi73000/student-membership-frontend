import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../../../auth/services/admin/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pay-fee',
  templateUrl: './pay-fee.component.html',
  styleUrl: './pay-fee.component.scss'
})
export class PayFeeComponent {

  studentId: number = this.activatedRoute.snapshot.params["studentId"];
  validateForm: FormGroup;
  isSpinning: boolean = false;

  MONTH: string[] = [
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
  ];

  constructor(private service: AdminService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
  ) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      amount: [null, Validators.required],
      month: [null, Validators.required],
      givenBy: [null, Validators.required],
      description: [null, Validators.required],

    })
  }

  payFee() {

    this.service.payFee(this.studentId, this.validateForm.value).subscribe((res) => {
      console.log(res);
      if (res.id != null) {
        // this.snackBar.open("Fee paid successfully","Close",{duration:5000});
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Fee paid successfully',
          showConfirmButton: false,
          timer: 1500,
          width: '350px'
        })
        this.router.navigateByUrl("/admin/students");
      } else {
        this.snackBar.open("Something went wrong", "Close", { duration: 5000 });
      }
    })
  }

}
