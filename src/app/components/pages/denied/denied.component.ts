import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-denied',
  standalone: true,
  imports: [],
  templateUrl: './denied.component.html',
  styleUrl: './denied.component.css'
})
export class DeniedComponent {
  constructor(private router: Router){}
 volver(){
  this.router.navigate(['/home']);
 }
}
