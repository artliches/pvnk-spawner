import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { PvnkAbilitiesComponent } from './pvnk-abilities/pvnk-abilities.component';
import { PvnkIdentityComponent } from './pvnk-identity/pvnk-identity.component';
import { SafeHtmlPipe } from './safepipe.module';
import { PvnkDetailsComponent } from './pvnk-details/pvnk-details.component';
import { PvnkEquipmentComponent } from './pvnk-equipment/pvnk-equipment.component';
import { PvnkCybertechComponent } from './pvnk-cybertech/pvnk-cybertech.component';
import { PvnkNanoComponent } from './pvnk-nano/pvnk-nano.component';

@NgModule({
  declarations: [
    SafeHtmlPipe,
    AppComponent,
    PvnkAbilitiesComponent,
    PvnkIdentityComponent,
    PvnkDetailsComponent,
    PvnkEquipmentComponent,
    PvnkCybertechComponent,
    PvnkNanoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
