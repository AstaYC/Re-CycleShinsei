import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone: true,
  imports: [] // Add CommonModule if needed
})
export class ProfileComponent {
  currentUser: any;
  redeemedVouchers: number = 0;

  constructor() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');

    const vouchers = JSON.parse(localStorage.getItem('vouchers') || '{}');
    this.redeemedVouchers = vouchers[this.currentUser.email] || 0;
  }

  redeemPoints(voucherType: string) {
    const vouchers = {
      '100': 100,
      '200': 200,
      '500': 500
    };

    const requiredPoints = vouchers[voucherType];

    if (this.currentUser.points >= requiredPoints) {
      this.currentUser.points -= requiredPoints;

      let users = JSON.parse(localStorage.getItem('users') || '[]');
      const userIndex =
