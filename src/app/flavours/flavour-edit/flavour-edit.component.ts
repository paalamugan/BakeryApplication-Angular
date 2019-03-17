import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Flavour } from '../../models/flavour';
import { FlavourService } from '../../services/flavour.service';

@Component({
  selector: 'app-flavour-edit',
  templateUrl: './flavour-edit.component.html',
  styleUrls: ['./flavour-edit.component.css']
})
export class FlavourEditComponent implements OnInit {

  constructor(private _formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<FlavourEditComponent>, private flavourService: FlavourService,

    @Inject(MAT_DIALOG_DATA) public data: Flavour) {}


  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }
  onSubmit() {
    this.flavourService.editFlavour(this.data)
      .subscribe(() => {
        this.dialogRef.close();
     });

  }
}
