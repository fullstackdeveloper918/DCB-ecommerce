import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path : '',
        loadChildren: () => import('./features/layout-module').then(m => m.LayoutModule)
    },
    {
        path : 'auth',
        loadChildren : () => import('../app/features/auth/auth-module').then(m => m.AuthModule)
    }
];
