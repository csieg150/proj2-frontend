
import { Injectable } from '@angular/core';
import { Album } from '../models/Album';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Genre } from '../models/Genre';
import { Artist } from '../models/Artist';

@Injectable({
  providedIn: 'root'
})
export class AlbumServiceService {
  albumURL = environment.baseUrl + '/albums';
  genreURL = environment.baseUrl + '/genres';
  artistURL = environment.baseUrl + '/artists';

  constructor(private httpClient: HttpClient) { }

  getAlbums(): Observable<Album[]> {
    const httpHead = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*', // ABSOLUTELY necessary. Allows control from the API
      })
    };
    return this.httpClient.get<Album[]>(this.albumURL, httpHead);
  }

  getGenres(): Observable<Genre[]>{
    const httpHead = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*', // ABSOLUTELY necessary. Allows control from the API
      })
    };
    return this.httpClient.get<Genre[]>(this.genreURL, httpHead);
  }

  getArtists(): Observable<Artist[]>{
    const httpHead = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*', // ABSOLUTELY necessary. Allows control from the API
      })
    };
    return this.httpClient.get<Artist[]>(this.artistURL, httpHead);
  }

}

