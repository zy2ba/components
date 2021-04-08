import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgImageSliderComponent } from './components/ng-image-slider';
import { SliderCustomImageComponent } from './components/slider-custom-image';
import { SliderLightboxComponent } from './components/slider-lightbox';
import { NgImageSliderService } from './services/ng-image-slider.service';

@NgModule({
  imports: [CommonModule],
  declarations: [
    NgImageSliderComponent,
    SliderCustomImageComponent,
    SliderLightboxComponent,
  ],
  providers: [NgImageSliderService],
  exports: [NgImageSliderComponent],
})
export class NgImageSliderModule {}
