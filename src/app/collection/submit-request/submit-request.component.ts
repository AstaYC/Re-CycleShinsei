import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';



@Component({
  selector: 'app-submit-request',
  templateUrl: './submit-request.component.html',
  styleUrls: ['./submit-request.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule]
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
    if (this.requestForm.valid) {
      const request = {
        id: uuidv4(),
        FirstName: this.currentUser.firstName,
        SecondName: this.currentUser.lastName,
        email: this.currentUser.email,
        phone: this.currentUser.phone,
        ...this.requestForm.value, status: 'pending' };

      let requests = JSON.parse(localStorage.getItem('requests') || '[]');
      requests.push(request);
      localStorage.setItem('requests', JSON.stringify(requests));

      alert('Request submitted successfully!');
      this.requestForm.reset();
    }
  }
}
