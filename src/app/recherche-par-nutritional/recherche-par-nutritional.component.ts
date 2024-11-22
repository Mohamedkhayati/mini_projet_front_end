import { Component } from '@angular/core';
import { Nutritional } from '../model/nutritional.model';
import { Supplement } from '../model/supplement.model';
import { SupplementService } from '../services/supplement.service';

@Component({
  selector: 'app-recherche-par-nutritional',
  templateUrl: './recherche-par-nutritional.component.html',
  
})
export class RechercheParNutritionalComponent {
supprimerSupplement(_t27: Supplement) {
throw new Error('Method not implemented.');
}


  supplements!: Supplement[];
  nutritionals!: Nutritional[];
  IdGenre!: number;

  constructor(private supplementService: SupplementService) { }

  ngOnInit(): void {
    
    this.supplementService.listeNutritionals().
      subscribe(nutritionals => {
        this.nutritionals = nutritionals._embedded.nutritionals;
        console.log(nutritionals);
      });
  }

  onChange() {
    this.supplementService.rechercherParNutritional(this.IdGenre).
      subscribe(supplements => { this.supplements = supplements });
  }
  


}
