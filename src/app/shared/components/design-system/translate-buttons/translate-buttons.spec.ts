import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateButtons } from './translate-buttons';
import { By } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

class MockTranslateService {
  currentLang = 'en';
  getLangs(): string[] {
    return ['en', 'fr'];
  }
  use(lang: string) {
    this.currentLang = lang;
  }
}

describe('TranslateButtons Integration (standalone)', () => {
  let fixture: ComponentFixture<TranslateButtons>;
  let component: TranslateButtons;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateButtons],
      providers: [{ provide: TranslateService, useClass: MockTranslateService }],
    }).compileComponents();

    fixture = TestBed.createComponent(TranslateButtons);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should render EN and FR buttons', () => {
    const buttons = fixture.debugElement.queryAll(By.css('button'));
    expect(buttons.length).toBe(2);
    expect(buttons[0].nativeElement.textContent).toContain('EN');
    expect(buttons[1].nativeElement.textContent).toContain('FR');
  });

  it('should apply correct flex direction class', () => {
    component.direction = 'col';
    fixture.detectChanges();
    const container = fixture.debugElement.query(By.css('div'));
    expect(container.nativeElement.classList).toContain('flex-col');

    component.direction = 'row';
    fixture.detectChanges();
    expect(container.nativeElement.classList).toContain('flex-row');
  });

  it('should save language in localStorage and call switchLang', () => {
    const spySwitch = spyOn(component, 'switchLang');
    const buttons = fixture.debugElement.queryAll(By.css('button'));

    buttons[0].nativeElement.click();
    fixture.detectChanges();
    expect(localStorage.getItem('lang')).toBe('en');
    expect(spySwitch).toHaveBeenCalledWith('en');

    buttons[1].nativeElement.click();
    fixture.detectChanges();
    expect(localStorage.getItem('lang')).toBe('fr');
    expect(spySwitch).toHaveBeenCalledWith('fr');
  });

  it('should initialize with saved language from localStorage', () => {
    localStorage.setItem('lang', 'fr');
    const spySwitch = spyOn(component, 'switchLang');

    component.ngOnInit();
    fixture.detectChanges();

    expect(localStorage.getItem('lang')).toBe('fr');
    expect(spySwitch).toHaveBeenCalledWith('fr');
  });
});
