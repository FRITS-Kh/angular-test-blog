/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PopupComponent } from './popup.component';
import { PopupService } from '../../services/popup.service';

describe('PopupComponent', () => {
  let component: PopupComponent;
  let fixture: ComponentFixture<PopupComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PopupComponent],
      providers: [PopupService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
