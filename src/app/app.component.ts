import { Component } from '@angular/core';
import { DatabaseService } from './services/database.service';
import { SplashScreen } from '@capacitor/splash-screen';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'fridgeApp';

  constructor(private database: DatabaseService) {
    this.initApp();
  }

  async initApp() {
    await this.database.initalizPlugin();
    SplashScreen.hide();
  } 

  public getHeight() {
    return window.innerHeight + 'px';
  }
  
  public getWidth() {
    return window.innerWidth + 'px';
  }
}
