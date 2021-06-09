import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForbiddenComponent } from './page/forbidden/forbidden.component';
import { HomeComponent } from './page/home/home.component';
import { LoginComponent } from './page/login/login.component';
import { MoreComponent } from './page/more/more.component';
import { UserEditComponent } from './page/user-edit/user-edit.component';
import { UsersComponent } from './page/users/users.component';
import { AuthGuardService } from './service/auth-guard.service';
import { RoleGuardService } from './service/role-guard.service';
import { MoreGuardService } from './service/more-guard.service';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        canActivate: [MoreGuardService, AuthGuardService]
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [MoreGuardService]
    },
    {
        path: 'users',
        component: UsersComponent,
        canActivate: [MoreGuardService, AuthGuardService, RoleGuardService],
        data: {
            expectedRole: 2
        }
    },
    {
        path: 'user/edit/:id',
        component: UserEditComponent,
        canActivate: [AuthGuardService, RoleGuardService],
        data: {
            expectedRole: 3
        }
    },
    {
        path: 'forbidden',
        component: ForbiddenComponent
    },
    {
        path: 'more',
        component: MoreComponent,
        canActivate: [MoreGuardService]
    },
    {
        path: '**',
        redirectTo: '',
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}