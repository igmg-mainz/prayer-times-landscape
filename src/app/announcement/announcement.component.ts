import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Announcement } from '../shared/model/announcement';

@Component({
  selector: 'cr-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.css']
})
export class AnnouncementComponent implements OnInit {

  private announcement$: Observable<Announcement>;
  private interval;
  private pastTime = 0;

  constructor(private activatedRoute: ActivatedRoute,
              private route: Router) {
  }

  ngOnInit() {

    this.activatedRoute.params.subscribe(params => {

      const announcementId = params.id;
      // get announcement from server

      this.interval = setInterval(() => {
        this.pastTime++;
        if (this.pastTime === 5) {
          clearInterval(this.interval);
          this.pastTime = 0;
          console.log('here');
          this.route.navigateByUrl('');
        }
      }, 1000);

    });


  }

}
