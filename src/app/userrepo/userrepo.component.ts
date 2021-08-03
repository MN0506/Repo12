import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { UserModel } from './userrepo.model';

@Component({
  selector: 'app-userrepo',
  templateUrl: './userrepo.component.html',
  styleUrls: ['./userrepo.component.css']
})
export class UserrepoComponent implements OnInit {


  formValue !: FormGroup; 
  usermodelobj : UserModel = new UserModel();
  repoData !:any;
  showAdd!: boolean;
  showUpdate!: boolean;
  isFormSubmitted = false;
  submitted!: boolean;


  constructor(private formbuilder: FormBuilder, private api : ApiService) { }

  ngOnInit(): void {
    


    const PAT_NAME = "^[a-zA-Z ]{2,20}$";
    const PAT_EMAIL = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[.][a-zA-Z]{2,4}$";

    this.formValue = this.formbuilder.group({
      name : ['',[Validators.required, Validators.pattern(PAT_NAME)]],
      label : ['',Validators.required],
      email : ['', [Validators.required, Validators.pattern(PAT_EMAIL)]],
      date : [''],
      modifieddate : [''],
  

    })
    this.getAllRepo();
  }

  submitRepo() {

    
    this.isFormSubmitted = true;

    
    if (this.formValue.invalid) {
      return;
    }

   
    console.log(this.formValue.value);
}

    onReset() {
        this.submitted = false;
        this.formValue.reset();
    }
  clickAddRepo(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

 postRepoDetails(){
   this.usermodelobj.name = this.formValue.value.name;
   this.usermodelobj.label = this.formValue.value.label;
   this.usermodelobj.email = this.formValue.value.email;

   
 let today = new Date().toISOString().slice(0, 10)
 this.usermodelobj.date=today;


   this.api.postRepo(this.usermodelobj)
   .subscribe(res=>{
     console.log(res);
     alert("User Added Successfully")
     let ref = document.getElementById('cancel')
     ref?.click();
     this.formValue.reset();
     this.getAllRepo();
    },
    _err=>{
      alert("Something Went Wrong");
    })
   }
   
   getAllRepo(){
     this.api.getRepo()
     .subscribe(res=>{
       this.repoData = res;
     })
    }
    
    deleteRepo(row: any){
      this.api.deleteRepo(row.id)
      .subscribe(res=>{
        alert("Deleted Successfully");
        this.getAllRepo();
      })
    }
    onEdit(row:any){
      this.showAdd=false;
      this.showUpdate=true;
      
      this.usermodelobj.id=row.id;
      this.formValue.controls['name'].setValue(row.name);
      this.formValue.controls['label'].setValue(row.label);
      this.formValue.controls['email'].setValue(row.email);

    }
    updateRepoDetails(){
      this.usermodelobj.name = this.formValue.value.name;
      this.usermodelobj.label = this.formValue.value.label;
      this.usermodelobj.email = this.formValue.value.email;

      let today = new Date().toISOString().slice(0, 10)
      this.usermodelobj.modifieddate=today;
  

      this.api.updateRepo(this.usermodelobj,this.usermodelobj.id)
      .subscribe(res=>{
        alert("Updated Successfully");

        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllRepo();
      })

    }
}
