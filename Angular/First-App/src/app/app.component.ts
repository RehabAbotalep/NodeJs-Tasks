import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name = "rehab ragab"
  color = "red"
  cName = "testClass"
  counter = 1
  test(){
    return "Hello"
  }
  user:any = {
    name:"Rehab",
    age:30
  }
  x="<h3>Hello from propert binding</h3>"

  handleClick(){
    this.counter++
    console.log("Hello")
  }
  data:any

  handleInput(event:any){
      console.log(event.target.value)
      this.data = event.target.value
  }
  data1:any=""
  z:any=""

}

