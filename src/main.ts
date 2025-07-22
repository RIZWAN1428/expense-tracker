import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { appRoutes } from './app/app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';

bootstrapApplication(App, {
  providers: [
    provideHttpClient(withFetch()),
    appRoutes
  ]
});
