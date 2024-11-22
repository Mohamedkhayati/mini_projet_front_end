import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SupplementService } from '../services/supplement.service';
import { Supplement } from '../model/supplement.model';
import { Nutritional } from '../model/nutritional.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { emailValidator } from '../validators/email-validator';
import { NutritionalWrapper } from '../model/WrappedNutritional.model';

@Component({
  selector: 'app-update-supplement',
  templateUrl: './update-supplement.component.html',
  styleUrls: ['./update-supplement.component.css']
})
export class UpdateSupplementComponent implements OnInit {

  currentSupplement!: Supplement;
  nutritionals!: Nutritional[];
  updatedNutId!: number;
  updateSupplementForm!: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private supplementService: SupplementService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    // Fetch nutritional categories
    this.supplementService.listeNutritionals().subscribe(nutritionals => {
      this.nutritionals = nutritionals._embedded.nutritionals;
    });

    // Fetch the supplement details and initialize the form
    const supplementId = this.activatedRoute.snapshot.params['id'];
    this.supplementService.consulterSupplement(supplementId).subscribe(supplement => {
      this.currentSupplement = supplement;
      this.updatedNutId = this.currentSupplement.nutritional.idNut;

      // Initialize form after data is fetched
      this.initForm();
    });
  }

  initForm(): void {
    this.updateSupplementForm = this.formBuilder.group({
      idSupplement: [this.currentSupplement.idSupplement, [Validators.required]],
      nomSupplement: [this.currentSupplement.nomSupplement, [Validators.required, Validators.minLength(3)]],
      prixSupplement: [this.currentSupplement.prixSupplement, [Validators.required]],
      email: [this.currentSupplement.email, [Validators.required, emailValidator()]],
      dosageSupplement: [this.currentSupplement.dosageSupplement, [Validators.required]],
      dateCreation: [this.currentSupplement.dateCreation, [Validators.required]],
      idNut: [this.updatedNutId, [Validators.required]]
    });
  }

  updateSupplement(): void {
    // Update `currentSupplement` with form values
    const formValues = this.updateSupplementForm.value;
    this.currentSupplement = {
      ...this.currentSupplement,
      ...formValues,
      nutritional: this.nutritionals.find(nutritional => nutritional.idNut === formValues.idNut)!
    };

    // Call the service to update
    this.supplementService.updateSupplement(this.currentSupplement).subscribe(() => {
      this.router.navigate(['supplements']);
    });
  }

  emailInvalid(): boolean {
    const email = this.updateSupplementForm.get('email')?.value;
    return email && !(email.includes('@') && email.includes('.com'));
  }
}
