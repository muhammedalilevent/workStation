import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MapComponent } from "./map/map.component";
import { VPlayerComponent } from "./v-player/v-player.component";
import { SafeURLPipe } from "./safe-url.pipe";
import { AgSplitterModule } from "@anka-geo/ag-splitter";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [AppComponent, MapComponent, VPlayerComponent, SafeURLPipe],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AgSplitterModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
