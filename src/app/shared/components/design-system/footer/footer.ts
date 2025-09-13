import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { hugeInstagram, hugeNewTwitterRectangle, hugeYoutube } from '@ng-icons/huge-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.html',
  imports: [NgIcon],
  viewProviders: [provideIcons({ hugeInstagram, hugeNewTwitterRectangle, hugeYoutube })],
})
export class Footer {
  currentYear: number = new Date().getFullYear();
  hugeInstagram = 'hugeInstagram';
  hugeNewTwitterRectangle = 'hugeNewTwitterRectangle';
  hugeYoutube = 'hugeYoutube';
}
