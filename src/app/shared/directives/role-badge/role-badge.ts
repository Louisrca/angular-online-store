import { Directive, ElementRef, inject, Input, Renderer2, OnInit, OnChanges } from '@angular/core';

@Directive({
  selector: '[appRoleTag]',
})
export class RoleTagDirective implements OnInit, OnChanges {
  @Input() appRoleTag = 'user';

  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  ngOnInit() {
    this.updateRoleTag(this.appRoleTag);
  }

  ngOnChanges() {
    this.updateRoleTag(this.appRoleTag);
  }

  private updateRoleTag(role: string) {
    this.renderer.setStyle(this.el.nativeElement, 'padding', '1px 6px');
    this.renderer.setStyle(this.el.nativeElement, 'border', '1px solid');
    this.renderer.setStyle(this.el.nativeElement, 'borderColor', this.roleTagBorder(role));
    this.renderer.setStyle(this.el.nativeElement, 'borderRadius', '0.5rem');
    this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', this.roleTagBackground(role));
    this.renderer.setStyle(this.el.nativeElement, 'color', this.getRoleColor(role));
  }

  private getRoleColor(role: string): string {
    switch (role) {
      case 'admin':
        return '#b91c1b';
      case 'worker':
        return '#854d0e';
      case 'customer':
        return '#166534';
      default:
        return '#16810E';
    }
  }

  private roleTagBackground(role: string) {
    switch (role) {
      case 'admin':
        return '#fee2e2';
      case 'worker':
        return '#fef3c7';
      case 'customer':
        return '#dcfce7';
      default:
        return '#DCFBDA';
    }
  }

  private roleTagBorder(role: string) {
    switch (role) {
      case 'admin':
        return '#fca5a5';
      case 'worker':
        return '#fde68a';
      case 'customer':
        return '#86efac';
      default:
        return '#A6F4B1';
    }
  }
}
