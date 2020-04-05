import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CaptureimagePage } from './captureimage.page';

describe('CaptureimagePage', () => {
  let component: CaptureimagePage;
  let fixture: ComponentFixture<CaptureimagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaptureimagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CaptureimagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
