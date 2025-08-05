import { Routes } from '@angular/router';

export const routes: Routes = [
    {
     path : '',
     redirectTo : 'auth',
     pathMatch : 'full'
    },
    {
        path : 'home',
        loadChildren: () => import('./features/layout-module').then(m => m.LayoutModule)
    },
    {
        path : 'auth',
        loadChildren : () => import('../app/features/auth/auth-module').then(m => m.AuthModule)
    }
];
