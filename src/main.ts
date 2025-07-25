import { bootstrapApplication } from '@angular/platform-browser';
//Angular 15+ method to start a standalone app (no AppModule needed).
import { App } from './app/app';
//Root component of the app.
import { appRoutes } from './app/app.routes';
//Routing config
import { provideHttpClient, withFetch } from '@angular/common/http';
//Sets up Angular's HttpClient using Fetch API instead of XMLHttpRequest.

bootstrapApplication(App, {
  providers: [
    provideHttpClient(withFetch()),
    appRoutes
  ]
});
//Starts the app with:

//App as root component.

//provideHttpClient(...): Enables HTTP calls.

//appRoutes: Enables routing.

