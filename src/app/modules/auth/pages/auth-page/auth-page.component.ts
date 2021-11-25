import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@modules/auth/services/auth.service';


@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css']
})
export class AuthPageComponent implements OnInit {

  formLogin: FormGroup = new FormGroup({});
  errorSesion: boolean = false;
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.formLogin = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('',[
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(13)
      ])
    })
  }

  enviarLogin(){
    const { email, password } = this.formLogin.value;

    this.authService.sendCredentials(email, password)
      .subscribe(
        (resp)=>{
          this.errorSesion = false; 
          console.log('✔✔✔', resp )
          this.router.navigate(['/','tracks'])
        }, 
        (error)=> {
          this.errorSesion = true; 
          console.log('❌🟡🟠 => Tus credenciales no son validas, porfavor Verificalas', error)
        }
      );
    
  }

}
