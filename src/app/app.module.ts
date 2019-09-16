import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { SharedModule } from 'shared/shared.module';
import { HttpModule } from '@angular/http';

import { environment } from '../environments/environment';
import { AdminModule } from './admin/admin.module';
import { AdminAuthGuard } from './admin/services/admin-auth-guard.service';
import { AppComponent } from './app.component';
import { LoginComponent } from './core/components/login/login.component';
import { CoreModule } from './core/core.module';
import { ProductsComponent } from './shopping/components/products/products.component';
import { ShoppingModule } from './shopping/shopping.module';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { TestComponent } from './test/test.component';
import { GoogleChartsModule } from 'angular-google-charts';
// import { SafeUrlPipe } from './app/shared/safe-url.pipe';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    // SafeUrlPipe,
  ],
  imports: [
    BrowserModule,
    AngularFontAwesomeModule,
    HttpModule,
    SharedModule,
    AdminModule,
    ShoppingModule,
    CoreModule,
    GoogleChartsModule,
    AngularFireModule.initializeApp(environment.firebase),
    RouterModule.forRoot([
      { path: '', component: ProductsComponent },
      { path: 'login', component: LoginComponent },
    ])
  ],
  providers: [
    AdminAuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
