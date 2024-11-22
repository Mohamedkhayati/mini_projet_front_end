import { Component, OnInit } from '@angular/core';
import { Supplement } from '../model/supplement.model';
import { SupplementService } from '../services/supplement.service';

@Component({
  selector: 'app-recherche-par-nom',
  templateUrl: './recherche-par-nom.component.html',
})
export class RechercheParNomComponent implements OnInit {

  nomSupplement!: string;
  supplements!: Supplement[];
  allSupplements!: [];
  searchTerm!: string;

  constructor(private supplementService: SupplementService) { }

  ngOnInit(): void {
    this.supplementService.listeSupplement().subscribe(supplements => {console.log(supplements);
      this.supplements = supplements;
    });
  }
}
