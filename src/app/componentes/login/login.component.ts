import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Usuario } from 'src/app/modelo/usuario-modelo';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  @Input() error: string | null;
  usuario: Usuario = {} as Usuario;
  form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private autenticacionServicio: AutenticacionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.iniciarCamposFormulario();
  }

  iniciarCamposFormulario() {
    this.form = this.formBuilder.group({
      nombreusuario: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  enviar(): void {
    this.error = null;
    if (this.esFormularioValido()) {
      this.usuario.nombreusuario = this.form.get('nombreusuario').value;
      this.usuario.password = this.form.get('password').value;
      this.autenticacionServicio.iniciarSesion(this.usuario).subscribe(
        (respuestaAutenticacion) => {
          this.usuario.token = respuestaAutenticacion.jwt;
          this.router.navigate(['/home']);
        },
        (error) => {
          this.error = error.error;
        }
      );
    }
  }

  esFormularioValido() {
    return this.form.valid;
  }
}
