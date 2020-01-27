/**
 *
 */
import { Prayer } from './prayer';
import { Announcement } from './announcement';

export interface AnnouncementHistory {

  date: Date;
  prayer: Prayer;
  announcement: Announcement;
  repetition: number;
}
