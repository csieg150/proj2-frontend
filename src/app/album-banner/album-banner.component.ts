import { Component, OnInit } from '@angular/core';
import { Album } from '../models/Album';

@Component({
  selector: 'app-album-banner',
  templateUrl: './album-banner.component.html',
  styleUrls: ['./album-banner.component.css']
})
export class AlbumBannerComponent implements OnInit {

  cart: Album[];
  userLoggedIn: boolean;
  activeId: number;
  userName: string;

  constructor() {
    this.cart = []; // Needs to be initially empty to properly set up the HTML view
    this.userLoggedIn = false;
    this.activeId = 1;
   }

  ngOnInit(): void {
  }

  /** Below is the function that is triggered when 'app-album-list' outputs an event.
   *  It searches for the index of the album given from the event, and, if it doesn't
   *  exist in the current user's cart, it adds it. Otherwise, if it does exist in the
   *  cart, it won't be changed.
   */
  updateCart(givenAlbum: Album): void{
    const indexOfId = (album: Album) => album.album_Id === givenAlbum.album_Id; // Callback function for find index
    const albumIndex = this.cart.findIndex(indexOfId); // Perform the search
    if (albumIndex !== -1){
      // console.log(`${givenAlbum.album_Title} was already in the cart.`);
      return; // If we can find the an ID, it's already in the cart. No duplicates.
    }
    this.cart.push(givenAlbum);
    // console.log(`Yep, ${givenAlbum.album_Title} was added.`);
  }

  updateUser(signedIn: string): void{
    this.userLoggedIn = true;
    this.activeId = 1;
    this.userName = signedIn;
  }

}
