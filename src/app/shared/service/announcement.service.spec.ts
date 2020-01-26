import { TestBed } from '@angular/core/testing';

import { AnnouncementService } from './announcement.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('Announcement-Service', () => {
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    // Inject the http service and test controller for each test
    httpClient = TestBed.get(HttpClient);
  });

  it('should be created', () => {
    const service: AnnouncementService = TestBed.get(AnnouncementService);
    expect(service).toBeTruthy();
  });
});


