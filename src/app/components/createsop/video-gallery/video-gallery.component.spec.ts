import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CookieService } from "ngx-cookie-service";
import { CreatesopModule } from "../createsop.module";
import { VideoGalleryComponent } from "./video-gallery.component";

describe("VideoGalleryComponent", () => {
  let component: VideoGalleryComponent;
  let fixture: ComponentFixture<VideoGalleryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CreatesopModule],
      providers: [CookieService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
