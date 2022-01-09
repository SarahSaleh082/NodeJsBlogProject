import { FollowingComponent } from './components/following/following.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CreateBlogComponent } from './components/blogs/create-blog/create-blog.component';
import { BlogDetailsComponent } from './components/blogs/blog-details/blog-details.component';
import { EditBlogComponent } from './components/blogs/edit-blog/edit-blog.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  {path:'', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'create', component: CreateBlogComponent},
  {path: 'blog/:id', component: BlogDetailsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'following', component: FollowingComponent},
  {path: 'edit/:id', component: EditBlogComponent},
  {path: 'profile/:username', component: ProfileComponent},
  {path: 'profile', component: ProfileComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
