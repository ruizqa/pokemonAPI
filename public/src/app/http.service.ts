import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { 

    this.getMyPokemon();
  }

  getMyPokemon(){
    // our http response is an Observable, store it in a variable
    let squirtle = this._http.get('https://pokeapi.co/api/v2/pokemon/7/');
    // subscribe to the Observable and provide the code we would like to do with our data from the response
    squirtle.subscribe((data:any) => {
      //console.log(data);
      let name:any = data.forms[0].name;
      let abilities:any = data.abilities
      abilities = abilities.map((data:any) => {return data.ability.name})
      let abilities_string:String = abilities.join(', ')

      let pokemons = abilities.map((ability:String) => {
        let pokemons_req = this._http.get(`https://pokeapi.co/api/v2/ability/${ability}`)
        pokemons_req.subscribe((data:any) => {
          let pokemons = data.pokemon.length; 
          console.log(`The ability ${ability} is shared by: ${pokemons} pokemons`)});
        })
      console.log(`The pokemon ${name} has the following abilities: ${abilities_string}`)});
 }



}
