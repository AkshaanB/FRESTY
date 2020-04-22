import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'signup', pathMatch: 'full' },

  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  {
    path: 'signin',
    loadChildren: () => import('./signin/signin.module').then( m => m.SigninPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'guestlogin',
    loadChildren: () => import('./guestlogin/guestlogin.module').then( m => m.GuestloginPageModule)
  },
  {
    path: 'captureimage',
    loadChildren: () => import('./captureimage/captureimage.module').then( m => m.CaptureimagePageModule)
  },
  {
    path: 'google-login',
    loadChildren: () => import('./google-login/google-login.module').then( m => m.GoogleLoginPageModule)
  },
  {
    path: 'members-area',
    loadChildren: () => import('./members-area/members-area.module').then( m => m.MembersAreaPageModule),
    canActivate: [AuthGuardService]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
