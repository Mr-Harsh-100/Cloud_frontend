import { Component } from '@angular/core';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { ContentComponent } from "../content/content.component";
import { PopupComponent } from "../popup/popup.component";

@Component({
  selector: 'app-main',
  imports: [SidebarComponent, ContentComponent, PopupComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
