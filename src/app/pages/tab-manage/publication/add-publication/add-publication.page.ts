import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { ImagePickerComponent } from 'src/app/components/image-picker/image-picker.component';

@Component({
  selector: 'app-add-publication',
  templateUrl: './add-publication.page.html',
  styleUrls: ['./add-publication.page.scss'],
})
export class AddPublicationPage implements OnInit {
  publicationForm: FormGroup;
  photoUrl: string;
  @ViewChild('imgPicker') imgPicker: ImagePickerComponent;
  constructor(private formBuilder: FormBuilder, private navCtrl: NavController) {}

  ngOnInit() {
    this.buildForm();
  }

  private buildForm() {
    this.publicationForm = this.formBuilder.group({
      titulo: ['', Validators.required],
      description: ['', Validators.required],
      image: '',
    });
  }

  savePublication() {}

  /**
   * Method that navigate to the home page with a go back animation
   */
  goback() {
    this.navCtrl.navigateBack('/tabs/admin/mascotas');
  }
}
