/**
 *
 */
import { Announcement } from './announcement';
import { Prayer } from './prayer';

export interface AnnouncementWrapper {

  announcement: Announcement;
  interval: number;
  fixedRate: number;
  maxRepetition: number;
  prayer: Prayer;
}
