import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { AuctionComponent } from './auction/auction.component';
import { WishesComponent } from './wishes/wishes.component';
import { AuctionsListComponent } from './auctions-list/auctions-list.component';

@NgModule({
  declarations: [AppComponent, AuctionComponent, WishesComponent, AuctionsListComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
