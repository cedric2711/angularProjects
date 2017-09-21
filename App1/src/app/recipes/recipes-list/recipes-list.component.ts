import { Component, OnInit } from '@angular/core';
import {Recipes} from '../recipes.model';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit {
  recipes: Recipes[]=[
    new Recipes('A Test Recipe', 'description', 'http://maxpixel.freegreatpicture.com/static/photo/1x/Delicious-Recipes-Fruit-Ripe-Raspberries-Lean-Red-1519363.jpg'),
    new Recipes('A Test Recipe', 'description', 'http://maxpixel.freegreatpicture.com/static/photo/1x/Delicious-Recipes-Fruit-Ripe-Raspberries-Lean-Red-1519363.jpg'),
    new Recipes('A Test Recipe', 'description', 'http://maxpixel.freegreatpicture.com/static/photo/1x/Delicious-Recipes-Fruit-Ripe-Raspberries-Lean-Red-1519363.jpg')
  ];
  constructor() { }

  ngOnInit() {
  }

}
