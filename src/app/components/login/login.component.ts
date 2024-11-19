import { Component } from '@angular/core';
import { FormsModule, FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../core/services/authentication/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterOutlet],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {

  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      contraseña: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {

    const formValues = this.loginForm.value;

    if (this.loginForm.valid) {
      this.authService.login(formValues.email, formValues.contraseña).subscribe({
        next: (response) => {
          if (response.success) {
            this.authService.saveToken(response.token, response.usuario);
            this.router.navigate(['/home'])
          }
        }, error: (error) => {
          // Este bloque se ejecuta si la respuesta tiene un código 4xx o 5xx
          // Verificamos si el backend envió un mensaje de error
          if (error.error && error.error.message) {
            this.errorMessage = error.error.message; // Mostramos el mensaje del backend
          } else {
            this.errorMessage = 'Error de autenticación'; // Mensaje por defecto si no hay uno específico
          }
        }
      });

    } else {
      this.errorMessage = 'Ingrese usuario y contraseña'
    }
  }

}
