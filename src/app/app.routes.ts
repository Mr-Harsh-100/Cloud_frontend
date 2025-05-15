import { Routes } from '@angular/router';
import { MainComponent } from './comp/main/main.component';
import { LoginComponent } from './comp/login/login.component';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '**',
        component: MainComponent
    }
];
