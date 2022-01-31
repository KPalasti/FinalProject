import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { HomeComponent } from './component/home/home.component';
import { NavBarComponent } from './component/nav-bar/nav-bar.component';
import { ContractorLoginComponent } from './component/contractor-login/contractor-login.component';
import { ContractorSidebarComponent } from './component/contractor-sidebar/contractor-sidebar.component';
import { BusinessComponent } from './component/business/business.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserComponent } from './component/user/user.component';
import { FormsModule } from '@angular/forms';
import { BusinessService } from './services/business.service';
import { ContactComponent } from './component/contact/contact.component';
import { ClientListComponent } from './component/client-list/client-list.component';
import { UserDashboardComponent } from './component/user-dashboard/user-dashboard.component';
import { UserAddressesPipe } from './pipes/user-addresses.pipe';
import { UserSidebarComponent } from './component/user-sidebar/user-sidebar.component';
import { UserBusinessesPipe } from './pipes/user-businesses.pipe';
import { BusinessServiceTypesStringPipe } from './pipes/business-service-types-string.pipe';
import { ActiveCallsPipe } from './pipes/active-calls.pipe';
import { SearchByUsernamePipe } from './pipes/search-by-username.pipe';
import { OrderByPipe } from './pipes/order-by.pipe';
import { SearchByServicetypeNamePipe } from './pipes/search-by-servicetype-name.pipe';
import { SearchByBusinessNamePipe } from './search-by-business-name.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    ContractorLoginComponent,
    ContractorSidebarComponent,
    BusinessComponent,
    UserComponent,
    ContactComponent,
    ClientListComponent,
    UserDashboardComponent,
    UserAddressesPipe,
    UserSidebarComponent,
    UserBusinessesPipe,
    ActiveCallsPipe,
    BusinessServiceTypesStringPipe,
    SearchByUsernamePipe,
    OrderByPipe,
    SearchByServicetypeNamePipe,
    SearchByBusinessNamePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule
  ],
  providers: [
    AuthService,
  	BusinessService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
