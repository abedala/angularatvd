import { Component } from '@angular/core';
import { LoginLayoutComponent } from '../../components/login-layout/login-layout.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { Router } from '@angular/router';
import { LoginServicesService } from '../../services/login-services.service';
import { ToastrService } from 'ngx-toastr';

interface signupForm{
   name:FormControl,
   email: FormControl,
   password:FormControl,
   passwordConfirm: FormControl

}

@Component({
  selector: 'app-signup',
  imports: [
    LoginLayoutComponent,
    ReactiveFormsModule,
    PrimaryInputComponent
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class signupComponent {
signupForm: FormGroup<signupForm>;
  toastService: any;

  constructor(
    private router: Router,
    private loginService: LoginServicesService
  ){
    this.signupForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(6)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      passwordConfirm: new FormControl('', [Validators.required, Validators.minLength(6)])

    })

  }
  submit(){
    this.loginService.login(this.signupForm.value.email,  this.signupForm.value.password).subscribe({
      next: () => this.toastService.success("Login feito com sucesso"),
      error: () =>this.toastService.error("error inesperado! Tente novamente mais tarde")
    })
      
    
  }
  navigate(){
    this.router.navigate(["login"])
  }
}

