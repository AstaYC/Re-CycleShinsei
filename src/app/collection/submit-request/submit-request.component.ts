import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-submit-request',
  templateUrl: './submit-request.component.html',
  styleUrls: ['./submit-request.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule
  ] // Add ReactiveFormsModule if needed
})
export class SubmitRequestComponent {
  requestForm: FormGroup;
  currentUser: any;

  constructor(private fb: FormBuilder) {
    this.requestForm = this.fb.group({
      wasteType: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]],
      address: ['', Validators.required],
      collectionDate: ['', Validators.required]
    });

    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  }

  onSubmit() {
    const pendingRequests = JSON.parse(localStorage.getItem('requests') || '[]')
      .filter((req: any) => req.email === this.currentUser.email && ['En attente', 'Occupée'].includes(req.status));

    const totalWeight = pendingRequests.reduce((sum: number, req: any) => sum + req.quantity, 0);

    if (pendingRequests.length >= 3) {
      alert('You can only have up to 3 pending requests.');
      return;
    }

    const newRequestWeight = this.requestForm.value.quantity;
    if (totalWeight + newRequestWeight > 10) {
      alert('The total weight of your pending requests cannot exceed 10kg.');
      return;
    }

    const request = {
      id: uuidv4(),
      name: `${this.currentUser.firstName} ${this.currentUser.lastName}`,
      email: this.currentUser.email,
      phone: this.currentUser.phone,
      wasteType: this.requestForm.value.wasteType,
      quantity: this.requestForm.value.quantity,
      address: this.requestForm.value.address,
      collectionDate: this.requestForm.value.collectionDate,
      status: 'En attente'
    };

    let requests = JSON.parse(localStorage.getItem('requests') || '[]');
    requests.push(request);
    localStorage.setItem('requests', JSON.stringify(requests));

    alert('Your collection request has been submitted successfully!');
    this.requestForm.reset();
  }
}
