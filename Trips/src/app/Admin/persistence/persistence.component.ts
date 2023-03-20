import { Component, OnInit } from '@angular/core';
import { PersistanceService } from 'src/app/service/persistence-service/persistance.service';

@Component({
  selector: 'app-persistence',
  templateUrl: './persistence.component.html',
  styleUrls: ['./persistence.component.css']
})
export class PersistenceComponent implements OnInit {
  persistence = "";

  constructor(public persServ: PersistanceService) {
  }

  ngOnInit(): void {
    this.persServ.persistence.subscribe(elem => {
      this.persistence = elem;
    })
  }
}
