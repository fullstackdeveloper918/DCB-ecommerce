import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
// import { authInterceptor } from './app/core/interceptors/auth-interceptor';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';


bootstrapApplication(App, {
  ...appConfig,
  providers: [
    provideAnimations(),
    provideToastr(),
    ...(appConfig.providers || [])
  ]
})
.catch((err) => console.error(err));
