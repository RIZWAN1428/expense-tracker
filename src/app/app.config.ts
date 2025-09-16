import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { jwtInterceptor } from './jwt-interceptor';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';


export const appConfig: ApplicationConfig = {
providers: [
provideHttpClient(
      withFetch(),
      withInterceptors([jwtInterceptor])
    ),
    provideRouter(appRoutes)
  ]
};
