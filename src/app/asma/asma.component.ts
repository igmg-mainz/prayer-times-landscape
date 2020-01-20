import { Component, OnInit } from '@angular/core';
import { AsmaService } from '../shared/service/asma.service';
import { Asma } from '../shared/model/asma';
import { Observable } from 'rxjs';

@Component({
  selector: 'cr-asma',
  templateUrl: './asma.component.html',
  styleUrls: ['./asma.component.css']
})
export class AsmaComponent implements OnInit {

  asma$: Observable<Asma>;

  constructor(private asmaService: AsmaService) { }

  ngOnInit() {
    this.asma$ = this.asmaService.getRandomAsma();
  }

}
