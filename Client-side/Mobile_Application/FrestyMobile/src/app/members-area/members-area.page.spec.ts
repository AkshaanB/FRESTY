import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MembersAreaPage } from './members-area.page';

describe('MembersAreaPage', () => {
  let component: MembersAreaPage;
  let fixture: ComponentFixture<MembersAreaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MembersAreaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MembersAreaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
