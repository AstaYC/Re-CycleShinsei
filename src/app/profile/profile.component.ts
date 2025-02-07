import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router} from "@angular/router"; // Import CommonModule

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone: true,
  imports:[CommonModule]
})
export class ProfileComponent implements OnInit {
  currentUser: any;

  constructor(private router: Router) {}

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  }

  navigateToEditProfile() {
    this.router.navigate(['/profile/edit']);
  }

  deleteAccount() {
    if (confirm('Are you sure you want to delete your account?')) {
      // Remove the user from localStorage
      let users = JSON.parse(localStorage.getItem('users') || '[]');
      users = users.filter((u: any) => u.email !== this.currentUser.email);
      localStorage.setItem('users', JSON.stringify(users));

      // Clear the current user session
      localStorage.removeItem('currentUser');

      alert('Account deleted successfully!');
      this.router.navigate(['/auth/login']); // Redirect to login page
    }
  }
}
