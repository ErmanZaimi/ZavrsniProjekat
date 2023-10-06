import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  images = [
    {
      path: "assets/images/Resursi/flower1.jpeg",
      text: "Fiesta Bouquet",
      price: "$60"
    },
    {
      path: "assets/images/Resursi/flower2.jpeg",
      text: "Alluring Elegance Bouquet",
      price: "$72"
    },
    {
      path: "assets/images/Resursi/flower3.jpeg",
      text: "Beyond Blue Bouquet",
      price: "$55"
    },
    {
      path: "assets/images/Resursi/flower4.jpeg",
      text: "Mixed Roses",
      price: "$35"
    },
    {
      path: "assets/images/Resursi/flower5.jpeg",
      text: "Belle of the Ball Bouquet",
      price: "$45"
    },
    {
      path: "assets/images/Resursi/flower6.jpeg",
      text: "Rainbow Garden",
      price: "$50"
    },
    {
      path: "assets/images/Resursi/flower7.jpeg",
      text: "Best Day Bouquet",
      price: "$61"
    },
    {
      path: "assets/images/Resursi/flower8.jpeg",
      text: "Smiles & Sunshine",
      price: "$45"
    },
  ]
    imagePaths = Object.values(this.images);
   
    onSubmit() {
      console.log("Submit successful")
    }
}
