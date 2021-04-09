import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Inject,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ArrowClickEvent } from '../../const/arrow-click.const';
import { NisSlide } from '../../type/img.type';

@Component({
  selector: 'ng-image-slider-lightbox',
  templateUrl: './lightbox.component.html',
})
export class LightboxComponent implements OnDestroy {
  // for swipe event
  private swipeLightboxImgCoord?: [number, number];
  private swipeLightboxImgTime?: number;

  totalImages = 0;
  popupWidth = 1200;
  marginLeft = 0;
  imageFullscreenView = false;
  lightboxPrevDisable = false;
  lightboxNextDisable = false;
  showLoading = true;
  effectStyle = 'none';
  speed = 1; // default speed in second
  title = '';
  currentImageIndex = 0;

  // @Inputs
  @Input() images: NisSlide[] = [];
  @Input() videoAutoPlay = false;
  @Input() direction = 'ltr';
  @Input() paginationShow = false;
  @Input() infinite = false;
  @Input() arrowKeyMove = true;
  @Input() showVideoControls = true;

  // @Output
  @Output() closeClick = new EventEmitter<void>();
  @Output() arrowClick = new EventEmitter<ArrowClickEvent>();

  constructor(
    private readonly elRef: ElementRef,
    // gets building error with Document type
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    @Inject(DOCUMENT) private readonly document: any,
    @Inject(Window) private readonly window: Window
  ) {}

  @Input()
  set imageIndex(index: number) {
    if (index !== undefined && index > -1 && index < this.images.length) {
      this.currentImageIndex = index;
    }
    this.nextPrevDisable();
  }

  @Input()
  set show(visiableFlag: boolean) {
    this.imageFullscreenView = visiableFlag;
    this.elRef.nativeElement.ownerDocument.body.style.overflow = '';
    if (visiableFlag) {
      this.elRef.nativeElement.ownerDocument.body.style.overflow = 'hidden';
      // this.getImageData();
      this.setPopupSliderWidth();
    }
  }

  @Input()
  set animationSpeed(data: number) {
    if (data &&  data >= 0.1 && data <= 5) {
      this.speed = data;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.effectStyle = 'none';
    this.setPopupSliderWidth();
  }

  @HostListener('document:keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event && event.key && this.arrowKeyMove) {
      if (event.key.toLowerCase() === 'arrowright') {
        this.nextImageLightbox();
      }

      if (event.key.toLowerCase() === 'arrowleft') {
        this.prevImageLightbox();
      }

      if (event.key.toLowerCase() === 'escape') {
        this.closeLightbox();
      }
    }
  }

  ngOnDestroy() {
    this.resetState();
  }

  setPopupSliderWidth() {
    if (this.window && this.window.innerWidth) {
      this.popupWidth = this.window.innerWidth;
      this.totalImages = this.images.length;
      if (this.currentImageIndex !== undefined) {
        this.marginLeft = -1 * this.popupWidth * this.currentImageIndex;
        this.getImageData();
        this.nextPrevDisable();
        this.window.setTimeout(() => {
          this.showLoading = false;
        }, 500);
      }
    }
  }

  closeLightbox() {
    this.closeClick.emit();
  }

  prevImageLightbox() {
    this.effectStyle = `all ${this.speed}s ease-in-out`;
    if (this.currentImageIndex > 0 && !this.lightboxPrevDisable) {
      this.currentImageIndex--;
      this.arrowClick.emit(ArrowClickEvent.PREV);
      this.marginLeft = -1 * this.popupWidth * this.currentImageIndex;
      this.getImageData();
      this.nextPrevDisable();
    }
  }

  nextImageLightbox() {
    this.effectStyle = `all ${this.speed}s ease-in-out`;
    if (
      this.currentImageIndex < this.images.length - 1 &&
      !this.lightboxNextDisable
    ) {
      this.currentImageIndex++;
      this.arrowClick.emit(ArrowClickEvent.NEXT);
      this.marginLeft = -1 * this.popupWidth * this.currentImageIndex;
      this.getImageData();
      this.nextPrevDisable();
    }
  }

  nextPrevDisable() {
    this.lightboxNextDisable = true;
    this.lightboxPrevDisable = true;
    this.window.setTimeout(() => {
      this.applyButtonDisableCondition();
    }, this.speed * 1000);
  }

  applyButtonDisableCondition() {
    this.lightboxNextDisable = false;
    this.lightboxPrevDisable = false;
    if (!this.infinite && this.currentImageIndex >= this.images.length - 1) {
      this.lightboxNextDisable = true;
    }
    if (!this.infinite && this.currentImageIndex <= 0) {
      this.lightboxPrevDisable = true;
    }
  }

  getImageData() {
    if (
      this.images?.length &&
      this.images[this.currentImageIndex] &&
      (this.images[this.currentImageIndex].image ||
        this.images[this.currentImageIndex].video)
    ) {
      this.title = this.images[this.currentImageIndex].title ?? '';
      this.totalImages = this.images.length;
      for (const iframeI in this.document.getElementsByTagName('iframe')) {
        this.document
          .getElementsByTagName('iframe')
          [iframeI]?.contentWindow?.postMessage?.(
            '{"event":"command","func":"pauseVideo","args":""}',
            '*'
          );
      }
      for (const videoI in this.document.getElementsByTagName('video')) {
        this.document.getElementsByTagName('video')[videoI]?.pause?.();
      }
    }
  }

  resetState() {
    this.images = [];
  }

  /**
   * Swipe event handler
   * Reference from https://stackoverflow.com/a/44511007/2067646
   */
  swipeLightboxImg(e: TouchEvent, when: 'start' | 'end'): void {
    const coordinates: [number, number] = [
      e.changedTouches[0].pageX,
      e.changedTouches[0].pageY,
    ];
    const time = new Date().getTime();

    if (when === 'start') {
      this.swipeLightboxImgCoord = coordinates;
      this.swipeLightboxImgTime = time;
      return;
    }
    if (
      when !== 'end' ||
      this.swipeLightboxImgCoord === undefined ||
      this.swipeLightboxImgTime === undefined
    ) {
      return;
    }
    const direction = [
      coordinates[0] - this.swipeLightboxImgCoord[0],
      coordinates[1] - this.swipeLightboxImgCoord[1],
    ];
    const duration = time - this.swipeLightboxImgTime;

    if (
      duration < 1000 && //
      Math.abs(direction[0]) > 30 && // Long enough
      Math.abs(direction[0]) > Math.abs(direction[1] * 3)
    ) {
      // Horizontal enough
      if (direction[0] < 0) {
        this.nextImageLightbox();
      } else {
        this.prevImageLightbox();
      }
    }
  }
}
