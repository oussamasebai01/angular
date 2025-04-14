import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ToastrModule } from 'ngx-toastr';
import { NgChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './templat/header/header.component';
import { LandingComponent } from './templat/landing/landing.component';
import { ArticlesComponent } from './templat/articles/articles.component';
import { GalleryComponent } from './templat/gallery/gallery.component';
import { FeaturesComponent } from './templat/features/features.component';
import { TestimonialsComponent } from './templat/testimonials/testimonials.component';
import { TeamComponent } from './templat/team/team.component';
import { ServicesComponent } from './templat/services/services.component';
import { SkillsComponent } from './templat/skills/skills.component';
import { WorkComponent } from './templat/work/work.component';
import { EventsComponent } from './templat/events/events.component';
import { PricingComponent } from './templat/pricing/pricing.component';
import { VideosComponent } from './templat/videos/videos.component';
import { StatsComponent } from './templat/stats/stats.component';
import { DiscountComponent } from './templat/discount/discount.component';
import { FooterComponent } from './templat/footer/footer.component';
import { TemplatComponent } from './templat/templat.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { DasbordIbtissemComponent } from './dashbord/dasbord-ibtissem/dasbord-ibtissem.component';
import { NavbarComponent } from './dashbord/dasbord-ibtissem/navbar/navbar.component';
import { UpdateComponent } from './dashbord/dasbord-ibtissem/update/update.component';
import { UpdateAxeComponent } from './dashbord/dasbord-ibtissem/update-axe/update-axe.component';
import { UpdateInducateurComponent } from './dashbord/dasbord-ibtissem/update-inducateur/update-inducateur.component';
import { UpdateNonConfComponent } from './dashbord/dasbord-ibtissem/update-non-conf/update-non-conf.component';
import { UpdateObjectifComponent } from './dashbord/dasbord-ibtissem/update-objectif/update-objectif.component';
import { MainComponent } from './dashbord/main/main.component';
import { ConformanceComponent } from './dashbord/conformance/conformance.component';
import { HrComponent } from './dashbord/hr/hr.component';
import { NavbarComponentWm } from './dashbord/navbar/navbar.component';

const routes: Routes = [
  { path: 'dashbordIb', component: DasbordIbtissemComponent },
  { path: 'update/:id', component: UpdateComponent },
  { path: 'updateN/:id', component: UpdateNonConfComponent },
  { path: 'updateO/:id', component: UpdateObjectifComponent },
  { path: 'updateA/:id', component: UpdateAxeComponent },
  { path: 'updates/:id', component: UpdateInducateurComponent },
  { path: 'dashbord', component: DashbordComponent },
  { path: '', component: TemplatComponent },
  { path: 'dashboardWm', component: MainComponent }, // Route pour MainComponent
  { path: 'conformance', component: ConformanceComponent }, // Route indépendante
  { path: 'hr', component: HrComponent }, // Route indépendante
  { path: '**', component: NotFoundComponent } // Redirection en cas d'URL incorrecte
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavbarComponentWm,
    LandingComponent,
    ArticlesComponent,
    GalleryComponent,
    FeaturesComponent,
    TestimonialsComponent,
    TeamComponent,
    ServicesComponent,
    SkillsComponent,
    WorkComponent,
    EventsComponent,
    PricingComponent,
    VideosComponent,
    NavbarComponent,
  UpdateComponent,
  UpdateAxeComponent,
  UpdateInducateurComponent,
  UpdateNonConfComponent,
  UpdateObjectifComponent,
    StatsComponent,
    DiscountComponent,
    FooterComponent,
    TemplatComponent,
    NotFoundComponent,
    DashbordComponent,
    DasbordIbtissemComponent,
    NavbarComponent,
    UpdateComponent,
    UpdateAxeComponent,
    UpdateInducateurComponent,
    UpdateNonConfComponent,
    UpdateObjectifComponent,
    MainComponent,
    ConformanceComponent, // Ajouté
    HrComponent // Ajouté
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule.forRoot(),
    ToastrModule.forRoot(),
    NgChartsModule,
    RouterModule.forRoot(routes),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}