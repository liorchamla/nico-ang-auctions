import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuctionsListComponent } from "./auctions-list/auctions-list.component";
import { WishesComponent } from "./wishes/wishes.component";

const routes: Routes = [
  { path: "", component: AuctionsListComponent },
  { path: "wishes", component: WishesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
