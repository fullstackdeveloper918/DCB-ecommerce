import { Component } from '@angular/core';
import { AboutService } from '../../../core/services/about.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.html',
  styleUrl: './about-us.scss',
  standalone : false
})
export class AboutUs {
  aboutData: any;
  loading = true;

  constructor(private aboutService: AboutService) {}

  ngOnInit(): void {
    this.aboutService.getAboutData().subscribe(response => {
      this.aboutData = response;
      this.loading = false;
    });
  }
}
