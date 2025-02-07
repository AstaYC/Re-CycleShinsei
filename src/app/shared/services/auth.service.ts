import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private STORAGE_KEY = 'users';

  constructor() {}

  // Save user data to localStorage
  registerUser(user: any): void {
    const users = this.getUsers();
    users.push(user);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(users));
  }

  // Retrieve all users from localStorage
  getUsers(): any[] {
    const users = localStorage.getItem(this.STORAGE_KEY);
    return users ? JSON.parse(users) : [];
  }

  // Check if a user exists by email
  getUserByEmail(email: string): any {
    const users = this.getUsers();
    return users.find((user: any) => user.email === email);
  }
}
