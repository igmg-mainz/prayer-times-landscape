/**
 *
 */
import { Announcement } from './announcement';

export interface AnnouncementWrapper {

  announcement: Announcement;
  interval: number;
  fixedRate: number;
  maxRepetition: number;
}
