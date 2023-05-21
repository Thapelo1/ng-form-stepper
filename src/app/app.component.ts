import { Component, OnInit } from '@angular/core';
import { AccountsService } from './services/accounts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  
  title = 'Form Stepper';
  activeStep: number = 1;

  users: any[] = [];
  filteredUsers: {id: number, name: string, email: string, allocatedAmount: number}[] = [];

  constructor(private accountService: AccountsService){}

  nextStep(step: number) {
    this.activeStep = step;
    console.log(this.activeStep);
  }
  

  ngOnInit(){
    this.accountService.getUsers().subscribe((res) => {
      this.users = res;
    })    
  }

  verifiedAllocations(){
    this.filteredUsers = this.users.filter((user) => {
      return user.allocatedAmount
    });

    this.nextStep(2);

    console.log(this.filteredUsers);
    
    
  }

 
}
