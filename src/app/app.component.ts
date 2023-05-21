import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountsService } from './services/accounts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  
  title = 'Form Stepper';
  activeStep: number = 1;
  totalAmount!:number;

  users: any[] = [];
  filteredUsers: any[] = [];
  filteredUsersTotal: {id: number, name: string, email: string, allocatedAmount: number}[] = [];
  fb!: FormGroup;

  constructor(private accountService: AccountsService, private formBuilder: FormBuilder){}

  nextStep(step: number) {
    this.activeStep = step;
  }
  

  ngOnInit(){
    this.accountService.getUsers().subscribe((res) => {
      this.users = res;
    }) 
    
    this.fb = this.formBuilder.group({
      allocate: [null, [Validators.required, Validators.min(0)]]
    });
  }

  verifiedAllocations(){
    this.filteredUsers = this.users.filter((user) => {
      return user.allocatedAmount
    });

    this.nextStep(2);    
    
  }

  submitAllocationsPayload() {
    const filteredPayload = this.filteredUsers.map(user => {
      return {
        accountNumber: user.address.zipcode,
        accountType: user.name,
        balance: user.email,
        allocation: user.allocatedAmount
      };
    });
  
    console.log(filteredPayload);
  }
  

  calculateTotal() {
    this.totalAmount = this.filteredUsers.reduce((currentTotal, user) => {
      return user.allocatedAmount + currentTotal;
    }, 0);
  }

  clearForm() {
    this.fb.reset();
  }


  // Filter API Response
  // private processResponse(response: Response): Response {
  //   return {
  //     results: response.results.map((user: any) => (<User>{
  //       uuid: user.login.uuid,
  //       firstName: user.name.first,
  //       lastName: user.name.last,
  //       email: user.email,
  //       username: user.login.username,
  //       gender: user.gender,
  //       address: `${user.location.street.number} ${user.location.street.name} ${user.location.city}, ${user.location.country}`,
  //       dateOfBirth: user.dob.date,
  //       phone: user.phone,
  //       imageUrl: user.picture.medium,
  //       coordinate: { latitude: +user.location.coordinates.latitude, longitude: +user.location.coordinates.longitude }
  //     }))
  //   };

 
}
