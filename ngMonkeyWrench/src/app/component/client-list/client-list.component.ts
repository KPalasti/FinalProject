import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Address } from 'src/app/models/address';
import { Business } from 'src/app/models/business';
import { Problem } from 'src/app/models/problem';
import { ServiceCall } from 'src/app/models/service-call';
import { User } from 'src/app/models/user';
import { AddressService } from 'src/app/services/address.service';
import { AuthService } from 'src/app/services/auth.service';
import { BusinessService } from 'src/app/services/business.service';
import { ProblemService } from 'src/app/services/problem.service';
import { ServiceCallService } from 'src/app/services/service-call.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {

  displayBusinessMessage : string = "Select Business"
  displayProblemMessage : string = "Problem"
  displayEstimateMessage : string = "Estimate"

  date : string = ""

  time : string = ""

  loggedInContractor : User = new User;

  selectedBusiness : Business = new Business;

  clientAddresses : Address[] = [];

  contractorsBusinesses : Business[] = [];

  serviceCallProblems: Problem[] = [];

  viewAddressForm : boolean = false;

  viewServiceCallForm : boolean = false;

  viewCustomer : User | null = null;

  selectedAddress : Address | null = null;

  newAddress : Address = new Address;

  newServiceCall : ServiceCall = new ServiceCall;

  business : Business = new Business;

  estimate : boolean = false;

  viewServiceHistory : boolean = false;

  clientList : User[] = [];

  serviceHistory : ServiceCall[] = [];

  firstNameSearch : string = "";

  lastNameSearch : string = "";

  phoneNumberSearch : string = "";

  selectedProblem : Problem = new Problem;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private addressService: AddressService,
    private problemService: ProblemService,
    private businessService: BusinessService,
    private serviceCallService: ServiceCallService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllCustomers();
    this.getAllProblems();
    this.getBusinessesByUserId();
  }

  getAllCustomers(){
    this.userService.index().subscribe({
      next: (customers) => {
        this.clientList = customers;
      },
      error: (fail) => {
        console.error("ClientListComponent.getAllCustomers(): failed to get customers")
      }
    });
  }

  getAddressesByUserId(client: User){
    this.viewCustomer = client;
    this.addressService.getAddressByUserId(client.id).subscribe({
      next: (addresses) => {
        this.clientAddresses = addresses;
      },
      error: (fail) => {
        console.error("ClientListComponent.getAddressesByUserId(): failed to get addresses")
      }
    })
  }

  addServiceCallToAddress(serviceCall: ServiceCall){
    if(this.selectedAddress){
      serviceCall.address = this.selectedAddress;
    }
    if(this.viewCustomer){
      serviceCall.user = this.viewCustomer;
    }

    serviceCall.problem = this.selectedProblem;
    serviceCall.estimate = this.estimate;
    serviceCall.business = this.selectedBusiness;
    console.log(serviceCall);


    this.serviceCallService.createServiceCall(serviceCall).subscribe({
      next: () => {
        this.router.navigateByUrl('contractor');
      },
      error: () => {
        console.error("ClientListComponent.addServiceCallToAddress(): failed to create service call")
      }
    })

  }

  createNewAddress(address: Address){
    this.viewAddressForm = false;
    if(this.viewCustomer !== null){
      address.user = this.viewCustomer;
    }
    console.log(address);

    this.addressService.createAddress(address).subscribe({
      next: (address) => {
        this.clientAddresses.push(address);
        if(this.viewCustomer !== null){
          this.getAddressesByUserId(this.viewCustomer);
        }

      },
      error: (fail) => {
        console.error('ClientListComponent.createNewAddress(): failed to create new address')
      }
    });
  }

  getAllProblems(){
    this.problemService.getProblems().subscribe({
      next: (problems) => {
        this.serviceCallProblems = problems;

      },
      error: (fail) => {
        console.error("ClientListComponent.getAllProblems(): failed to get problems")
      }
    })
  }

  serviceCallForm(address: Address) {
    this.selectedAddress = address;
    this.viewServiceHistory = false;
    this.viewServiceCallForm = true;
  }

  getBusinessesByUserId(){
    this.authService.doWithLoggedInUser((user : User) => {
      this.loggedInContractor = user;
      this.businessService.getBusinessesByUserId(user.id).subscribe({
        next: (businesses) => {
          this.contractorsBusinesses = businesses;
        },
        error: (fail) => {
          console.error("ClientListComponent.getBusinessesByUserId(): failed to get businesses");
        }
      })
    });
  }

  viewServiceRecord(address : Address){
    this.viewServiceHistory = true;
    this.viewServiceCallForm = false;
    this.selectedAddress = address;
    if(this.selectedAddress){
      this.serviceCallService.getServiceCallsByAddressId(this.selectedAddress.id).subscribe({
        next: (calls) => {
          this.serviceHistory = calls;
        },
        error: (fail) => {
          console.error("ClientListComponenet.viewServiceRecord(): failed to get service calls")
        }
      })
    }

  }

  setBusinessDisplayMessage(name : string | undefined) {
    if(name !== undefined) {
      this.displayBusinessMessage = name;
    }
  }

  setProblemDisplayMessage(name : string | undefined) {
    if(name !== undefined) {
      this.displayProblemMessage = name;
    }
  }

  setEstimateDisplayMessage() {
    if(this.estimate === false) {
      console.log(this.estimate);
      this.displayEstimateMessage = "Charged";
    }
    if(this.estimate === true) {
      console.log(this.estimate);
      this.displayEstimateMessage = "Estimate";
    }

  }


}
