import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePageComponent } from './create-page.component';
import { AlertService } from '../shared/services/alert.service';

describe('CreatePageComponent', () => {
  let component: CreatePageComponent;
  let fixture: ComponentFixture<CreatePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreatePageComponent],
      providers: [HttpClient, HttpHandler, AlertService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
