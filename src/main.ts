import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
// import { authInterceptor } from './app/core/interceptors/auth-interceptor';
import { errorInterceptor } from './app/core/interceptors/error-interceptor';
import { provideToastr } from 'ngx-toastr';
import { loaderInterceptor } from './app/core/interceptors/loader-interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';


bootstrapApplication(App, {
  ...appConfig,
  providers: [
    provideAnimations(),
    provideToastr(),
    provideHttpClient(
      withInterceptors([errorInterceptor, loaderInterceptor])
    ),
    ...(appConfig.providers || [])
  ]
})
.catch((err) => console.error(err));
