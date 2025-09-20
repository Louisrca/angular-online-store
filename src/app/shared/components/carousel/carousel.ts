import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.html',
})
export class Carousel implements OnInit, OnDestroy {
  images = [
    {
      img: 'https://brand.assets.adidas.com/image/upload/f_auto,q_auto:best,fl_lossy/if_w_gt_1920,w_1920/FR_MGLP_SUPERSTAR_Adaptation_Part_2_FW_25_Banner_Hero_GLP_Jules_Kounde_FR_Desktop_428953e249.jpg',
      promoTag: '40% OFF',
    },
    {
      img: 'https://image.adsoftheworld.com/m9pcf2mxbx20cpmv4oe120oelyk9',
      promoTag: '50% OFF',
    },
    {
      img: 'https://preview.thenewsmarket.com/Previews/NBAS/StillAssets/1920x1080/628593.jpg',
      promoTag: '30% OFF',
    },
  ];

  currentIndex = 0;
  intervalId!: NodeJS.Timeout;

  ngOnInit() {
    this.startAutoSlide();
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  startAutoSlide() {
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 8000);
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  }
}
