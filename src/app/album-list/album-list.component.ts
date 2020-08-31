import { Component, OnInit, EventEmitter, Output, AfterViewInit, Input, ɵALLOW_MULTIPLE_PLATFORMS } from '@angular/core';
import { AlbumServiceService } from '../services/album-service.service';
import { Album } from '../models/Album';
import { Artist } from '../models/Artist';
import { Genre } from '../models/Genre';

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
  artistList: Artist[]; // represents a list of all artists
  genreList: Genre[]; // represents a list of all genres
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
    this.searchGenre = -1;
    this.searchArtist = -1;
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
    this.albumList = this.albumList.filter(this.hasSearchGenre.bind(this));
    this.albumList = this.albumList.filter(this.hasSearchArtist.bind(this));
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

  // Used for Filter of Album list. If the genre of the album matches the given
  // genre id based on the given ID, it'll be included in our searched array.
  hasSearchGenre(element: Album, index, array): boolean{
    if (this.searchGenre === -1){
      return true;
    }
    const searchBy = this.searchGenre;
    if (element.genre_Id.genre_Id === this.searchGenre){
      return true;
    }
    return false;
  }

  // Used for Filter of Album list. If the artist of the album matches the given
  // artist id based on the given ID, it'll be included in our searched array.
  hasSearchArtist(element: Album, index, array): boolean{
    if (this.searchArtist === -1){
      return true;
    }
    const searchBy = this.searchArtist;
    if (element.artist_Id.artist_Id === this.searchArtist){
      return true;
    }
    return false;
  }

  // Fetches the entire Album list, as well as all Genres and Artists
  getAlbums(): Album[]{
    this.isClicked = true;
    this.wholeList = [];
    this.artistList = [];
    this.genreList = [];
    this.albumServ.getAlbums().subscribe(
      response => {
        for (const album of response){
          this.wholeList.push(album);
        }
        this.albumList = this.wholeList;
      }
    );
    this.albumServ.getArtists().subscribe(
      response => {
        this.artistList.push({
          artist_Id: -1,
          artist_Name: 'All',
          artist_Year: 0
        });
        for (const artist of response){
          this.artistList.push(artist);
        }
      }
    );
    this.albumServ.getGenres().subscribe(
      response => {
        this.genreList.push({
          genre_Id: -1,
          genre_Name: 'All'
        });
        for (const genre of response){
          this.genreList.push(genre);
        }
      }
    );
    console.log(this.genreList);
    this.loaded = true;
    return this.wholeList;
  }
}

