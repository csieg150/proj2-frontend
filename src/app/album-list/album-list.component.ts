import { Component, OnInit, EventEmitter, Output, AfterViewInit, Input } from '@angular/core';
import { AlbumServiceService } from '../services/album-service.service';
import { Album } from '../models/Album';

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.css']
})
export class AlbumListComponent implements AfterViewInit {
  // @Input() wholeList: Album[]; // Inputs keep returning null for some reason.
  // @Input() loaded: boolean; // Not sure why, so sticking to current method.
  @Output() toCart: EventEmitter<Album> = new EventEmitter();

  albumList: Album[]; // Represents list + any search values
  wholeList: Album[]; // Represents entire list of albums without search features
  searchTitle: string; // Represents Title to search by
  searchGenre: number; // Represents Genre to search by
  searchArtist: number; // Represents Artist to search by
  isClicked: boolean; // Changes when user clicks the load button
  loaded: boolean; // Detects when albums are loaded from API call


  constructor(private albumServ: AlbumServiceService) {
    // this.getAlbums();
    this.searchTitle = '';
    this.isClicked = false;
   }

  ngAfterViewInit(): void {

  }

  addToCart(id: number): void {
    const indexOfId = (album: Album) => album.album_Id === id; // Callback function for find index
    const albumIndex = this.albumList.findIndex(indexOfId); // Perform the search
    const chosenAlbum = this.albumList[albumIndex];
    this.toCart.emit(chosenAlbum);
  }

  search(): void {
    this.albumList = this.wholeList.filter(this.hasSearchTitle.bind(this));
    console.log(`Search title: ${this.searchTitle} - Search Genre: ${this.searchGenre} - Search Artist ${this.searchArtist}`);
  }

  // Used for Filter of Album List. If the title of the album matches the given
  // regular expression based on the input title, then it'll be included.
  hasSearchTitle(element: Album, index, array): boolean{
    const searchBy = this.searchTitle;
    const regex = '.*' + searchBy + '.*';
    const regex2 = new RegExp(regex, 'i');
    if (element.album_Title.search(regex2) !== -1){
      return true;
    }
    return false;
  }

  getAlbums(): Album[]{
    this.isClicked = true;
    this.wholeList = [];
    this.albumServ.getAlbums().subscribe(
      response => {
        console.log(response);
        for (const album of response){
          this.wholeList.push(album);
        }
        this.albumList = this.wholeList;
        this.loaded = true;
      }
    );
    return this.wholeList;
  }
}

