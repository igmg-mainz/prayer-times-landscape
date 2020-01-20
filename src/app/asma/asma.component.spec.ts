import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsmaComponent } from './asma.component';

describe('AsmaComponent', () => {
  let component: AsmaComponent;
  let fixture: ComponentFixture<AsmaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsmaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsmaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
