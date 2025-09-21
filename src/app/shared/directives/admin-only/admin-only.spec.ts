import { TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { AdminOnlyDirective } from './admin-only.directive';
import { AuthServices } from '../../../features/auth/services/auth';

@Component({
  template: '<ng-template appAdminOnly>Admin content</ng-template>',
  standalone: true,
  imports: [AdminOnlyDirective],
})
class TestComponent {}

describe('AdminOnlyDirective', () => {
  let authService: AuthServices;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent],
      providers: [
        {
          provide: AuthServices,
          useValue: {
            isAdmin: () => false,
          },
        },
      ],
    }).compileComponents();

    authService = TestBed.inject(AuthServices);
  });

  it('should display content if user is admin', () => {
    spyOn(authService, 'isAdmin').and.returnValue(true);

    const fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Admin content');
  });

  it('should hide content if user is not admin', () => {
    spyOn(authService, 'isAdmin').and.returnValue(false);

    const fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).not.toContain('Admin content');
  });
});
