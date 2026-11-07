import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { inject } from '@vercel/analytics';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

// /_vercel/insights/script.js only exists on Vercel deployments, not on ng serve.
if (environment.production) inject({ mode: 'production' });

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
