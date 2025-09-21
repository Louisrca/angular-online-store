import { TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { WorkerOnlyDirective } from './worker-only.directive';
import { AuthServices } from '../../../features/auth/services/auth';

@Component({
  template: '<ng-template appWorkerOnly>Worker content</ng-template>',
  standalone: true,
  imports: [WorkerOnlyDirective],
})
class TestComponent {}

describe('WorkerOnlyDirective', () => {
  let authService: AuthServices;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent],
      providers: [
        {
          provide: AuthServices,
          useValue: {
            isWorker: () => false,
          },
        },
      ],
    }).compileComponents();

    authService = TestBed.inject(AuthServices);
  });

  it('should display content if user is worker/admin', () => {
    spyOn(authService, 'isWorker').and.returnValue(true);

    const fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Worker content');
  });

  it('should hide content if user is not worker/admin', () => {
    spyOn(authService, 'isWorker').and.returnValue(false);

    const fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).not.toContain('Worker content');
  });
});
