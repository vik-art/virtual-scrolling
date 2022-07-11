import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ImageService } from 'src/app/services/image.service';

import { Image } from '../../common/interfaces/image.interface';

@Component({
  selector: 'app-image-page',
  templateUrl: './image-page.component.html',
  styleUrls: ['./image-page.component.scss'],
})
export class ImagePageComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren('listItem', { read: ElementRef }) list:
    | QueryList<ElementRef>
    | undefined;

  public images: Array<Image> = [];
  private page: number = 1;
  private totalPages: number = 0;
  private observer: IntersectionObserver | undefined;
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private imageService: ImageService) {}

  ngOnInit(): void {
    this.imageService
      .loadImages(this.page)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        this.images = res.hits;
        this.totalPages = res.totalHits;
        this.page++;
      });
    this.setInterceptorObserver();
  }

  ngAfterViewInit(): void {
    this.list?.changes.pipe(takeUntil(this.destroy$)).subscribe((d) => {
      if (d.last) {
        this.observer?.observe(d.last.nativeElement);
      }
    });
  }

  private setInterceptorObserver(): void {
    let options = {
      root: null,
      threshold: 0.7,
    };
    this.observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        if (this.page < this.totalPages) {
          this.imageService
            .loadImages(this.page)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res) => {
              this.images = [...this.images, ...res.hits];
              this.page++;
            });
        }
      }
    }, options);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
