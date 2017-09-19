import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl:'./servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  allowNewServer=false;
  serverCreated=false;
  serverCreationStatus='No server was created';
  serverName="Test name";
  servers=['Test server', 'Test server 2'];

  constructor() {
    setTimeout(()=>{
      this.allowNewServer=true;
    }, 2000);
  }

  ngOnInit() {
  }
 onCreateServer(){
   this.servers.push(this.serverName);
   this.serverCreationStatus='Sever was created. The server name is '+this.serverName;
   this.serverCreated=true;
 }
 onUpdateServerName(event:any){
  console.log(event);
    this.serverName=(<HTMLInputElement>event.target).value;
 }
}
