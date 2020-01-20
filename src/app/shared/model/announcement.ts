/**
 *
 *
 */
import { Image } from './image';
import { Text } from './text';
import { Scheduler } from './scheduler';

export interface Announcement {

  announcementId: string;
  image: Image;
  text: Text;
  scheduler: Scheduler;
  created?: Date;
  isShown?: boolean;
}
