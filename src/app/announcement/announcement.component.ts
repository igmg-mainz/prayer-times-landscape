import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {timer} from 'rxjs';
import {AnnouncementService} from '../shared/service/announcement.service';
import {Text} from '../shared/model/text';

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
  text: Text;

  constructor(private activatedRoute: ActivatedRoute,
              private route: Router,
              private announcementService: AnnouncementService) {
  }

  ngOnInit() {

    this.activatedRoute.params.subscribe(params => {
      this.announcementService.viewIsBlocked = true;

      const announcementId = params.id;
      const history = this.announcementService.history.get(announcementId);
      const announcement = history !== undefined ? history.announcement : null;

      if (announcement) {
        if (announcement.image !== null && announcement.image !== undefined) {
          this.announcementService.downloadImage(announcement.image.name).subscribe(response => {
            this.data = response;
          });
        }

        if (announcement.text !== null && announcement.text !== undefined) {
          this.text = announcement.text;
        }

        const boundedTimer = timer(0, 1000);
        this.timerSubscription = boundedTimer.subscribe(() => {
          this.pastTime++;

          if (this.pastTime === 15) {
            clearInterval(this.interval);
            this.pastTime = 0;
            this.timerSubscription.unsubscribe();
            this.route.navigateByUrl('');
            this.announcementService.announcemendShown.next(announcement);
            this.announcementService.viewIsBlocked = false;
          }
        });
      } else {
        this.route.navigateByUrl('');
      }

    });
  }

}
