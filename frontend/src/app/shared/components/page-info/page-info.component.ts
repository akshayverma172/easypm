import { Component, OnInit, InputDecorator, Input } from '@angular/core';

@Component({
  selector: 'app-page-info',
  templateUrl: './page-info.component.html',
  styleUrls: ['./page-info.component.css']
})
export class PageInfoComponent {
  @Input() info: string;
}
