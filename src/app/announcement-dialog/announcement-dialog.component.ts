import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Announcement } from '../shared/model/announcement';

@Component({
  selector: 'cr-announcement-dialog',
  templateUrl: './announcement-dialog.component.html',
  styleUrls: ['./announcement-dialog.component.css']
})
export class AnnouncementDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AnnouncementDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public announcement: Announcement) {
  }

  ngOnInit() {}


  close() {
    this.dialogRef.close();
  }
}
