import { Component, OnInit, Input } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-auction",
  templateUrl: "./auction.component.html",
  styleUrls: ["./auction.component.css"]
})
export class AuctionComponent implements OnInit {
  @Input()
  id: number;

  name: string;
  icon: string;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // On va chercher les données de l'item sur le site de wowhead
    this.http
      .get("https://www.wowhead.com/tooltip/item/" + this.id)
      .subscribe((item: any) => {
        this.name = item.name;
        this.icon = item.icon;
      });
  }
}
