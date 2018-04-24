import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../servicios/firebase.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public _fb:FirebaseService) { }

  ngOnInit() {
  }
  sesionIniciada():boolean{
    if(localStorage.getItem('usuario') == null){
      return false
    }else{
      return true;
    }
  }

}
