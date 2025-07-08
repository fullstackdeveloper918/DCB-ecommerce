import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './app/core/interceptors/auth-interceptor';
import { errorInterceptor } from './app/core/interceptors/error-interceptor';
import { provideToastr } from 'ngx-toastr';


bootstrapApplication(App, {
  ...appConfig,
  providers: [
    provideToastr(),
    provideHttpClient(
      withInterceptors([authInterceptor, errorInterceptor])
    ),
    ...(appConfig.providers || [])
  ]
})
.catch((err) => console.error(err));
