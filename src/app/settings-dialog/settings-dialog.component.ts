import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatTabGroup, MatTabsModule } from '@angular/material/tabs';


@Component({
  selector: 'app-settings-dialog',
  standalone: true,
  //imports: [CommonModule, MatButtonModule, MatIconModule, MatTabsModule, MatDialogModule, MatInputModule, MatSelectModule, ReactiveFormsModule, MatListModule, BrowserAnimationsModule ],  
  imports: [CommonModule, MatButtonModule, MatIconModule, MatTabsModule, MatDialogModule, MatInputModule, MatSelectModule, ReactiveFormsModule, MatListModule, MatCheckboxModule, MatTabGroup],
  templateUrl: './settings-dialog.component.html',
  styleUrl: './settings-dialog.component.scss'
})
export class SettingsDialogComponent {




  title = "Sudoku";
  settingsForm = new FormGroup({
    // startPos: new FormControl(0),
    // endPos: new FormControl(100),
    // allRecords: new FormControl(true),
    removeKeyboardWrongOptions: new FormControl(false),
    highlightNumbers: new FormControl(false),
    // ignoreEmpty: new FormControl(true),
    //training: new FormControl(false),
    // mode: new FormControl("Spell"),
    // letter: new FormControl(""),
  });


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<SettingsDialogComponent>
  ) {

    this.settingsForm.patchValue(this.data.settings);

  }

  confirm() {
    this.dialogRef.close({ success: true, settings: this.settingsForm.value });
  }



}
