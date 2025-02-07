import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class EditProfileComponent implements OnInit {
  editForm: FormGroup;
  currentUser: any;

  constructor(private fb: FormBuilder, private router: Router) {
    this.editForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', [Validators.required]],
      birthDate: ['', Validators.required],
      profilePicture: ['']
    });
  }

  ngOnInit() {
    // Retrieve the logged-in user from localStorage
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');

    // Populate the form with current user data
    this.editForm.patchValue(this.currentUser);
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.editForm.patchValue({ profilePicture: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.editForm.valid) {
      const updatedUser = { ...this.currentUser, ...this.editForm.value };

      // Update user data in localStorage
      let users = JSON.parse(localStorage.getItem('users') || '[]');
      const userIndex = users.findIndex((u: any) => u.email === this.currentUser.email);
      if (userIndex !== -1) {
        users[userIndex] = updatedUser;
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));

        alert('Profile updated successfully!');
        this.router.navigate(['/profile']); // Redirect to profile page
      }
    }
  }
}
