import { boolean, number, object, text } from '@storybook/addon-knobs';
import { NgImageSliderComponent } from './ng-image-slider.component';
import { SlideComponent } from '../slide';
import { LightboxComponent } from '../lightbox';
import { NgImageSliderService } from '../../services/ng-image-slider.service';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

export default {
  title: 'ng-image-slider',
  decorators: [
    moduleMetadata({
      //👇 Imports both components to allow component composition with storybook
      declarations: [SlideComponent, LightboxComponent],
      providers: [NgImageSliderService],
      imports: [CommonModule],
    }),
  ],
  component: NgImageSliderComponent,
  subcomponents: { SlideComponent, LightboxComponent },
  providers: { NgImageSliderService },
};

export const common = () => ({
  moduleMetadata: {
    imports: [],
  },
  props: {
    animationSpeed: number('animationSpeed', 0.5),
    imageSize: object('imageSize', {
      width: '250px',
      height: '200px',
      space: 0,
    }),
    infinite: boolean('infinite', true),
    autoSlide: number('autoSlide', 5),
    showArrow: boolean('showArrow', true),

    imagePopup: boolean('imagePopup', true),
    direction: text('direction', 'ltr'),
    slideImage: number('slideImage', 0),
    videoAutoPlay: boolean('videoAutoPlay', false),
    paginationShow: boolean('paginationShow', true),
    arrowKeyMove: boolean('arrowKeyMove', true),
    manageImageRatio: boolean('manageImageRatio', false),
    showVideoControls: boolean('showVideoControls', true),

    images: object('images', [
      {
        video: 'https://www.youtube.com/watch?v=hY7m5jjJ9mM',
        alt: `CATS will make you LAUGH YOUR HEAD OFF - Funny CAT compilation`,
      },
      {
        image:
          'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/5.jpg',
        thumbImage:
          'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/5.jpg',
        title: 'Hummingbirds are amazing creatures',
      },
      {
        image:
          'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/9.jpg',
        thumbImage:
          'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/9.jpg',
      },
      {
        image:
          'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/4.jpg',
        thumbImage:
          'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/4.jpg',
        title: 'Example with title.',
      },
      {
        image:
          'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/7.jpg',
        thumbImage:
          'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/7.jpg',
        title: 'Hummingbirds are amazing creatures',
      },
      {
        image:
          'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/1.jpg',
        thumbImage:
          'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/1.jpg',
      },
      {
        image:
          'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/2.jpg',
        thumbImage:
          'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/2.jpg',
        title: 'Example two with title.',
      },
    ]),
  },
});
