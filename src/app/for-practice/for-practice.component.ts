import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-for-practice',
  templateUrl: './for-practice.component.html',
  styleUrls: ['./for-practice.component.css']
})
export class ForPracticeComponent {
  imageData:any = '';
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const imageUrl: string | ArrayBuffer | null = e.target?.result ?? null;
      console.log(imageUrl);
      this.imageData = imageUrl;

      if (this.isImageFile(file)) {
        // Perform additional actions if it is an image file
        // For example, display the image on the screen
      }
    };

    reader.readAsDataURL(file);
  }

  imageIsUploaded(){
    return this.imageData.length>0;
    }

  isImageFile(file: File): boolean {
    return file.type.startsWith('image/');
  }

  
}