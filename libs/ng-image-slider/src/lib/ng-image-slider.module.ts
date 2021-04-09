import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgImageSliderComponent } from './components/ng-image-slider';
import { SlideComponent } from './components/slide';
import { LightboxComponent } from './components/lightbox';
import { NgImageSliderService } from './services/ng-image-slider.service';

@NgModule({
  imports: [CommonModule],
  declarations: [NgImageSliderComponent, SlideComponent, LightboxComponent],
  providers: [NgImageSliderService],
  exports: [NgImageSliderComponent],
})
export class NgImageSliderModule {}
