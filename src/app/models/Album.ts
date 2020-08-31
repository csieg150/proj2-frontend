import {Artist} from 'src/app/models/Artist';
import {Genre} from 'src/app/models/Genre';

export interface Album{
    // This will be our Album model to catch all data from our backend.
    // Formatted to match the returned data
    description: string; // Album Description
    album_Id: number; // album id
    price: number; // Cost of the album
    album_Title: string; // Album's Name
    album_Art: string; // URL to Cover Art of the album
    year_Released: number; // yyyy-mm-dd hh:mm:ss-ms ? Comes back as a long number from Postgres
    artist_Id: Artist; // Artist who produced the albums
    genre_Id: Genre; // Main genre of music
}
