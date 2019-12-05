import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

@Component({
  selector: "app-wishes",
  template: `
    <div class="card shadow">
      <div class="card-header py-3">
        <h6 class="m-0 font-weight-bold text-primary">
          Mes souhaits
        </h6>
      </div>
      <div class="card-body">
        <table class="table">
          <thead>
            <tr>
              <th>Object</th>
              <th>Prix voulu</th>
              <th>Enchère moyenne</th>
              <th>Meilleure enchère</th>
              <th>Match ?</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let w of wishes">
              <td><app-auction [id]="w.wish.item"></app-auction></td>
              <td>{{ w.wish.wantedPrice }}</td>
              <td>{{ w.stats.averageBid }}</td>
              <td>
                {{ w.stats.bestAuction.bid }} ({{ w.stats.bestAuction.owner }})
              </td>
              <td>
                <span
                  [ngStyle]="{
                    color:
                      w.wish.wantedPrice > w.stats.bestAuction.bid
                        ? 'green'
                        : 'red'
                  }"
                >
                  {{
                    w.wish.wantedPrice > w.stats.bestAuction.bid
                      ? "MATCH"
                      : "NO MATCH"
                  }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: []
})
export class WishesComponent implements OnInit {
  wishes = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // On demande la liste des wishes au Symfony et on les stockes (sachant que ce qu'on reçoit c'est les wish + les stats d'enchères liées)
    this.http.get("http://localhost:3000/api/wishes").subscribe((w: any[]) => {
      this.wishes = w;
    });
  }
}
