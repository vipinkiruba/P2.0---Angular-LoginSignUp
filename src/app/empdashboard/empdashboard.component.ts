import { Component, OnInit } from '@angular/core';
import { FormBuilder , FormGroup } from '@angular/forms';
import { EmployeeModel } from './empdashboard.model';
import { ApiService } from '../shared/api.service';


@Component({
  selector: 'app-empdashboard',
  templateUrl: './empdashboard.component.html',
  styleUrls: ['./empdashboard.component.css']
})
export class EmpdashboardComponent implements OnInit {

formvalue !: FormGroup;
printdata !: any;
showadd !: boolean;
showupdate !: boolean;

employeemodelobj : EmployeeModel = new EmployeeModel();
  

  constructor(private formbuilder : FormBuilder , private api : ApiService) { }

  ngOnInit(): void {
    this.formvalue = this.formbuilder.group({
      firstname : [''],
      lastname : [''],
      email : [''],
      mobilenumber : [''],
      salary : [''],
    })

    this.printEmpdetails();

  }

  addemp(){
    this.formvalue.reset();
    this.showadd = true;
    this.showupdate = false;
  }

postEmpdetails(){
  this.employeemodelobj.firstname = this.formvalue.value.firstname;
  this.employeemodelobj.lastname = this.formvalue.value.lastname;
  this.employeemodelobj.email = this.formvalue.value.email;
  this.employeemodelobj.mobile = this.formvalue.value.mobilenumber;
  this.employeemodelobj.salary = this.formvalue.value.salary;

  this.api.postemployee(this.employeemodelobj)
  .subscribe(res=>{
    console.log(res);
    alert("Employee Added Successfully");

   // let ref = document.getElementById('cancel')        // for closing automatically when submited
   // ref?.click();

    this.formvalue.reset();
    this.printEmpdetails()
  },
  err=>{
    console.log(err);
    alert("Something went Wrong");
  })
}

printEmpdetails(){
  this.api.getemployee()
  .subscribe(res=>{
    this.printdata = res;
  })
}

deleteEmpdetails(res: any){
  this.api.deleteemployee(res.id)
  .subscribe(res=>{

   // this.printEmpdetails();
    
  },
  err=>{
    alert("something went wrong");
   
  })
}

editEmpdetails(res : any){

  this.showadd = false;
    this.showupdate = true;

  this.employeemodelobj.id = res.id;
  this.formvalue.controls['firstname'].setValue(res.firstname);
  this.formvalue.controls['lastname'].setValue(res.lastname);
  this.formvalue.controls['email'].setValue(res.email);
  this.formvalue.controls['mobilenumber'].setValue(res.mobile);
  this.formvalue.controls['salary'].setValue(res.salary);
}
updateEmpdetails(){
  
  this.employeemodelobj.firstname = this.formvalue.value.firstname;
  this.employeemodelobj.lastname = this.formvalue.value.lastname;
  this.employeemodelobj.email = this.formvalue.value.email;
  this.employeemodelobj.mobile = this.formvalue.value.mobilenumber;
  this.employeemodelobj.salary = this.formvalue.value.salary;

  this.api.updateemployee(this.employeemodelobj , this.employeemodelobj.id)
  .subscribe(res=>{
    this.printEmpdetails();
    alert("Modified");
    this.formvalue.reset();
  })
}

} 
