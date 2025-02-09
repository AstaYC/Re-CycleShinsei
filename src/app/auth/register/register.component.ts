import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required,]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', [Validators.required,]],
      birthDate: ['', Validators.required],
      profilePicture: ['']
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.registerForm.patchValue({ profilePicture: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    alert(`Form is valid: ${!this.registerForm.invalid}`);
    if (this.registerForm.valid) {
      const userData = { ...this.registerForm.value, role: 'particulier' };

      if (userData.email === 'collector@gmail.com') {
        userData.role = 'collecteur';
      }
      let users = JSON.parse(localStorage.getItem('users') || '[]');
      users.push(userData);
      localStorage.setItem('users', JSON.stringify(users));

      alert('Registration successful!');
      this.registerForm.reset();
    }
  }
}
