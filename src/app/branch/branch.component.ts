import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { branchModel } from './branch.model';

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.css']
})
export class BranchComponent implements OnInit {
  
  formValue !: FormGroup;
  branchModelObj:branchModel = new branchModel();
  branchData !: any;
  showAdd!: boolean;
  repoData !:any;
  showUpdate!: boolean;
  
  constructor(private formbuilder: FormBuilder, private api :ApiService) { }

  ngOnInit(): void { 
    this.formValue=this.formbuilder.group({
      branchname : [''],
      repositoryname : [''],
      branch : ['']
    })
    this.formValue = this.formbuilder.group({
      name : ['',[Validators.required]],
    })

    this.getAllBranch();
    this.getAllRepo();
  }
    getAllRepo(){
    this.api.getRepo()
    .subscribe(res=>{
      this.repoData = res;
    })
  }
  clickAddBranch(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
  postBranchdetails(){
    this.branchModelObj.branchname = this.formValue.value.branchname;
    this.branchModelObj.repositoryname = this.formValue.value.repositoryname;
    this.branchModelObj.branch = this.formValue.value.branch;


    this.api.postBranch(this.branchModelObj)
    .subscribe(res=>{
      console.log(res);
      alert("Branch Added Successfully")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllBranch();
    },
    err=>{
      alert("Something went wrong");
     })

  }
  getAllBranch(){
    this.api.getBranch()
    .subscribe(res=>{
      this.branchData =res;
    })
  }
  deleteBranch(row : any){
    this.api.deleteBranch(row.id)
    .subscribe(res=>{
      alert("Branch Deleted Successfully")
      this.getAllBranch();
    })
  }
  onEdit(row:any){

    this.showAdd = false;
    this.showUpdate = true;

    this.branchModelObj.id=row.id;

    this.formValue.controls['branchname'].setValue(row.branchname);
    this.formValue.controls['repositoryname'].setValue(row.repositoryname);
    this.formValue.controls['branch'].setValue(row.branch);
  }
  updateBranchdetails(){
    this.branchModelObj.branchname = this.formValue.value.branchname;
    this.branchModelObj.repositoryname = this.formValue.value.repositoryname;
    this.branchModelObj.branch = this.formValue.value.branch;

    this.api.updateBranch(this.branchModelObj,this.branchModelObj.id)
    .subscribe(res=>{
      alert("Branch Updated Successfully");

      let ref =document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllBranch();

    })

  }
}


