import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }
  
  postRepo(data:any){
    return this.http.post<any>("http://localhost:3000/posts",data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  getRepo(){
    return this.http.get<any>("http://localhost:3000/posts")
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  updateRepo(data:any, id:number){
    return this.http.put<any>("http://localhost:3000/posts/"+id,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  deleteRepo(id: number){
    return this.http.delete<any>("http://localhost:3000/posts/"+id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  
  
  
  postBranch(data:any){
    return this.http.post<any>("http://localhost:3000/comments",data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  getBranch(){
    return this.http.get<any>("http://localhost:3000/comments")
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  updateBranch(data:any, id:number){
    return this.http.put<any>("http://localhost:3000/comments/"+id,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  deleteBranch(id: number){
    return this.http.delete<any>("http://localhost:3000/comments/"+id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
}
