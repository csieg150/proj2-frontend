import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Album } from '../models/Album';
// import { file-saver }

@Component({
  selector: 'app-user-cart',
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.css']
})
export class UserCartComponent implements OnInit {
  @Input() cart: Album[];
  totalPrice: number;
  items: string[];

  constructor() { }

  ngOnInit(): void {
  }

  deleteFromCart(id: number): void {
    const indexOfId = (album: Album) => album.album_Id === id; // Callback function for find index
    const albumIndex = this.cart.findIndex(indexOfId); // Perform the search
    const chosenAlbum = this.cart.splice(albumIndex - 1, 1);
    console.log(chosenAlbum);
    console.log(`${chosenAlbum[0].album_Title} removed to cart`);
    this.getTotalPrice();
  }

  getTotalPrice(): number{
    this.totalPrice = 0;
    for (const item of this.cart){
      this.totalPrice += item.price;
    }
    return this.totalPrice;
  }

  purchase(): void{
    this.items = [];
    if (this.cart.length === 0){
      alert('Must have items in cart to purchase!');
      return;
    }
    for (const item of this.cart){
      this.items.push(item.album_Title);
    }
    console.log(this.items);
    console.log(this.items.join('\n'));
    if (confirm('Do you wish to purchase: \n' + (this.items.join('\n')) + '\n for $' + this.totalPrice.toFixed(2) + '?') === true){
      this.cart.splice(0, this.cart.length);
      alert('Purchase confirmed!');
    } else{
      alert('Transaction cancelled');
    }
  }

}

