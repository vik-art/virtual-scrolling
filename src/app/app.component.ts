import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Image } from './common/interfaces/image.interface';
import { ImageService } from './services/image.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChildren('listItem', { read: ElementRef }) list: QueryList<ElementRef> | undefined;

  public images: Array<Image> = [];
  private page: number = 1;
  observer: any;
 

  constructor(private imageService: ImageService) { }
  ngAfterViewInit(): void {
    this.list?.changes.subscribe(d => {
      if (d.last) {
        this.observer.observe(d.last.nativeElement)
      }
    })
  }
  
  ngOnInit(): void {
    this.imageService.loadImages(this.page).subscribe(res => {     
      this.images = res;
      this.page++;
    })
    this.interceptorObserver();
  }

  interceptorObserver() {
    let options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5
    }
    this.observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        this.imageService.loadImages(this.page).subscribe(res => {
          this.images = [...this.images, ...res];
          this.page++;
        })
      }
    }, options)
  }
  
}
