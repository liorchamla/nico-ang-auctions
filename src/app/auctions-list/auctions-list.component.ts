import { Component, OnInit } from "@angular/core";
import { map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-auctions-list",
  template: `
    <div class="card shadow">
      <div class="card-header py-3">
        <h6 class="m-0 font-weight-bold text-primary">
          Enchères actuelles sur Dalaran
        </h6>
      </div>
      <div class="card-body">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>Object</th>
              <th>Propriétaire</th>
              <th>Quantité</th>
              <th>Enchère</th>
              <th>Prix</th>
              <th>Durée</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr
              *ngFor="
                let auction of auctions
                  | slice
                    : (currentPage - 1) * itemsPerPage
                    : currentPage * itemsPerPage
              "
            >
              <td>
                <app-auction [id]="auction.item"></app-auction>
              </td>
              <td>{{ auction.owner }}</td>
              <td>{{ auction.quantity }}</td>
              <td>{{ auction.bid / 100 | currency: "EUR" }}</td>
              <td>{{ auction.buyout / 100 | currency: "EUR" }}</td>
              <td>{{ auction.timeLeft }}</td>
              <td>
                <a href="#" class="btn btn-light btn-icon-split btn-sm">
                  <span class="icon text-white-50">
                    <i class="fas fa-plus"></i>
                  </span>
                  <span class="text">Ajouter</span>
                </a>
              </td>
            </tr>
          </tbody>
        </table>

        <button (click)="handlePage(currentPage - 1)">&lt;</button>
        Page {{ currentPage }} / {{ pagesCount }}
        <button (click)="handlePage(currentPage + 1)">&gt;</button>
      </div>
    </div>
  `,
  styles: []
})
export class AuctionsListComponent implements OnInit {
  // La liste de toutes les auctions (aucun intérêt selon moi)
  auctions: any[] = [];
  // Page actuelle (1 par défaut)
  currentPage = 1;
  // Nombre de pages au total (genre 2500 pages ...)
  pagesCount: number;
  // Nombre d'auctions à afficher par page
  itemsPerPage = 20;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // On requête le Symfony qui a tout ce qu'il faut pour nous sortir les auctions
    this.http
      .get("http://localhost:3000/api/auctions")
      .subscribe((a: any[]) => {
        // On stocke la liste des auctions qu'on a reçu de Symfony
        this.auctions = a;
        // On calcule le nombre de pages
        this.pagesCount = Math.ceil(this.auctions.length / this.itemsPerPage);
      });
  }

  handlePage(page: number) {
    this.currentPage = page;
  }
}
