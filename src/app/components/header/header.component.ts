import {Component, Input} from '@angular/core';
import {FirestoreService} from "../../services/firestore.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent   {
  @Input() titulo!: string;
  constructor(private  fireService: FirestoreService, private router: Router) { }




}
