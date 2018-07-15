import { Component } from '@angular/core';
import { DeviceService } from './device.service';
import { device } from '../models/device';
import { image } from '../models/image';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor( private deviceService:DeviceService){
    deviceService.getDevice();
  }


  postData(){
    let  _device :device =new device("hakljlkjad",new image("fafaf","fafafa"),["dadaf","fafaf"],"fafa",100,"fafeafe");

    this.deviceService.postDevice(_device);
  }
}
