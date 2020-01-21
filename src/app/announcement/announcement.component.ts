import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { timer } from 'rxjs';
import { AnnouncementService } from '../shared/service/announcement.service';
import { templateJitUrl } from '@angular/compiler';

@Component({
  selector: 'cr-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.css']
})
export class AnnouncementComponent implements OnInit {

  private interval;
  private pastTime = 0;
  private timerSubscription;
  data: string;
  content: string;

  constructor(private activatedRoute: ActivatedRoute,
              private route: Router,
              private announcementService: AnnouncementService) {
  }

  ngOnInit() {

    this.activatedRoute.params.subscribe(params => {

      const announcementId = params.id;
      const announcement = this.announcementService.history.get(announcementId).announcement;

      if (announcement.image !== null && announcement.image !== undefined) {
        this.announcementService.downloadImage(announcement.image.name).subscribe(response => {
          this.data = response;
        });
      }


      if (announcement.text !== null && announcement.text !== undefined) {
        this.content = announcement.text.content;
      }

      const boundedTimer = timer(0, 1000);
      this.timerSubscription = boundedTimer.subscribe(() => {
        this.pastTime++;

        if (this.pastTime === 30) {
          clearInterval(this.interval);
          this.pastTime = 0;
          this.timerSubscription.unsubscribe();
          this.route.navigateByUrl('');
        }
      });
    });
  }

}
