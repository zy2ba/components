import {
  Component,
  Inject,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NgImageSliderService } from '../../services/ng-image-slider.service';
import { WINDOW } from '@ng-web-apis/common';
import { DOCUMENT } from '@angular/common';

const youtubeRegExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|\?v=)([^#&?]*).*/,
  validFileExtensions = ['jpeg', 'jpg', 'gif', 'png'],
  validVideoExtensions = ['mp4'];

@Component({
  selector: 'ng-image-slider-slide',
  templateUrl: './slide.component.html',
})
export class SlideComponent implements OnChanges {
  YOUTUBE = 'youtube';
  IMAGE = 'image';
  VIDEO = 'video';
  fileUrl: SafeResourceUrl = '';
  fileExtension = '';
  type = this.IMAGE;

  // @inputs
  @Input() showVideo: boolean = false;
  @Input() videoAutoPlay: boolean = false;
  @Input() showVideoControls: number = 1;
  @Input() currentImageIndex: number = 0;
  @Input() imageIndex?: number;
  @Input() speed: number = 1;
  @Input() imageUrl?: string;
  @Input() isVideo = false;
  @Input() alt: string = '';
  @Input() title: string = '';
  @Input() direction: string = 'ltr';
  @Input() ratio: boolean = false;
  @Input() loading: 'lazy' | null = null;

  constructor(
    public imageSliderService: NgImageSliderService,
    private sanitizer: DomSanitizer,
    @Inject(WINDOW) private readonly window: any,
    @Inject(DOCUMENT) private readonly document: any
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (
      this.imageUrl &&
      typeof this.imageUrl === 'string' &&
      ((changes.imageUrl && changes.imageUrl.firstChange) || this.videoAutoPlay)
    ) {
      this.setUrl();
    }
  }

  setUrl() {
    if (this.imageUrl === undefined) {
      return;
    }
    const url = this.imageUrl;
    this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    this.fileExtension = url.split('.').pop()?.split(/[#?]/)[0] ?? '';
    if (
      this.imageSliderService.base64FileExtension(url) &&
      (validFileExtensions.indexOf(
        this.imageSliderService.base64FileExtension(url).toLowerCase()
      ) > -1 ||
        validVideoExtensions.indexOf(
          this.imageSliderService.base64FileExtension(url).toLowerCase()
        ) > -1)
    ) {
      this.fileExtension = this.imageSliderService.base64FileExtension(url);
    }
    // verify for youtube url
    const match = url.match(youtubeRegExp);
    if (match && match[2].length === 11) {
      if (this.showVideo) {
        this.type = this.YOUTUBE;
        this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
          `${'https://www.youtube.com/embed/'}${match[2]}${
            this.videoAutoPlay
              ? '?autoplay=1&enablejsapi=1'
              : '?autoplay=0&enablejsapi=1'
          }${'&controls='}${this.showVideoControls}`
        );
      } else {
        this.type = this.IMAGE;
        this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
          `https://img.youtube.com/vi/${match[2]}/0.jpg`
        );
      }
    } else if (
      this.fileExtension &&
      validFileExtensions.indexOf(this.fileExtension.toLowerCase()) > -1
    ) {
      this.type = this.IMAGE;
    } else if (
      this.fileExtension &&
      validVideoExtensions.indexOf(this.fileExtension.toLowerCase()) > -1
    ) {
      this.type = this.VIDEO;
      if (
        this.videoAutoPlay &&
        this.document.getElementById(`video_${this.imageIndex}`)
      ) {
        const videoObj: any = this.document.getElementById(
          `video_${this.imageIndex}`
        );
        this.window.setTimeout(() => {
          videoObj.play();
        }, this.speed * 1000);
      }
    }
  }

  videoClickHandler(event: MouseEvent) {
    if (!event || this.showVideoControls) {
      return;
    }
    const target = (event.srcElement ??
      event.target) as HTMLVideoElement | null;
    if (!target) {
      return;
    }
    if (target.paused) {
      target.play();
    } else {
      target.pause();
    }
  }
}
