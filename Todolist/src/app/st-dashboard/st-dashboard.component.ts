import { Component, OnInit } from '@angular/core';
import { FormBuilder , FormGroup} from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { stModel } from './st.model';

@Component({
  selector: 'app-st-dashboard',
  templateUrl: './st-dashboard.component.html',
  styleUrls: ['./st-dashboard.component.css']
})
export class stDashboardComponent implements OnInit {

  formValue!: FormGroup; 

  stobj: stModel = new stModel;

  allst: any;

  btnUpdateShow:boolean = false;

  btnSaveShow:boolean = true;


  constructor(private formBuilder:FormBuilder, private api:ApiService ) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name:[''],
      class:[''],
      email:[''],
      address:[''],
      city:[''],
      password:['']
    })
    this.Allst();
  }

  Addst(){
    this.stobj.address = this.formValue.value.address;
    this.stobj.city = this.formValue.value.city;
    this.stobj.name = this.formValue.value.name;
    this.stobj.email = this.formValue.value.email;
    this.stobj.password = this.formValue.value.password;
    this.stobj.class = this.formValue.value.class;

    this.api.postst(this.stobj).subscribe({
      next: (v) => {console.log(v)},
    error: (e) => {
      alert("Error")
      console.log(e)},
    complete: () => {
      console.log('complete')
      alert("Data Saved")
      this.Allst();
      this.formValue.reset();
    } })

  }

  Allst(){
    this.api.getst().subscribe(res => {
      this.allst = res;
    })
  }

  Editst(data:any){
    this.formValue.controls['name'].setValue(data.name);
    this.formValue.controls['city'].setValue(data.city);
    this.formValue.controls['address'].setValue(data.address);
    this.formValue.controls['email'].setValue(data.email);
    this.formValue.controls['class'].setValue(data.class);
    this.formValue.controls['password'].setValue(data.password);
    this.stobj.id = data.id;
    this.UpdateShowBtn();
  }

  Updatest(){
    this.stobj.address = this.formValue.value.address;
    this.stobj.city = this.formValue.value.city;
    this.stobj.name = this.formValue.value.name;
    this.stobj.email = this.formValue.value.email;
    this.stobj.password = this.formValue.value.password;
    this.stobj.class = this.formValue.value.class;
    this.api.putst(this.stobj,this.stobj.id).subscribe(res => {
      alert("Data Updated");
      this.Allst();
      this.SaveShowBtn();
    })


  }


  Deletest(data:any){
    this.api.deletest(data.id).subscribe(res => {
      alert("Record Deleted");
      this.Allst();
    })

  }

  UpdateShowBtn()
  {
    this.btnUpdateShow = true;
    this.btnSaveShow = false;
  }
  SaveShowBtn()
  {
    this.btnUpdateShow = false;
    this.btnSaveShow = true;
  }



}
