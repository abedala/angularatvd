import { Component } from '@angular/core';
import { LoginLayoutComponent } from '../../components/login-layout/login-layout.component';
import { Form, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { Router } from '@angular/router';
import { LoginServicesService } from '../../services/login-services.service';
import { ToastrService } from 'ngx-toastr';

interface loginForm{
email:FormControl,
password: FormControl
}

@Component({
  selector: 'app-login',
  standalone: true,

  imports: [
    LoginLayoutComponent,
    ReactiveFormsModule,
    PrimaryInputComponent
  ],

  providers: [ LoginServicesService],

  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  [x: string]: any;
loginForm!: FormGroup;
  
  constructor(
    private router: Router,
    private loginService: LoginServicesService,
    private  toastService: ToastrService
  ){
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])

    })

  }
  submit(){
    this.loginService.login(this.loginForm.value.email,  this.loginForm.value.password).subscribe({
      next: () => this['toastService'].success("Login feito com sucesso"),
      error: () =>this['toastService'].error("error inesperado! Tente novamente mais tarde")
    })
      
    
  }
  navigate(){
    this.router.navigate(["signup"])
  }
}

