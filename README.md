# AbeelhandoSudoku

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.1.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## RA - Start project

ng new abeelhando-sudoku
ng add @angular/material

Example:
https://www.nytimes.com/puzzles/sudoku/easy

(Mathematics of Sudoku)
https://en.wikipedia.org/wiki/Mathematics_of_Sudoku#:~:text=An%20ordinary%20puzzle%20with%20a,clues%20in%20the%2081%20cells.

Paper (Not so good!):
https://sites.math.washington.edu/~morrow/mcm/team2306.pdf

## Setup git credentials
git config --global user.email "eramboni@gmail.com"
git config --global user.name "Ricardo Amboni"

## Generate Angular ng code
ng g c Game
ng g c Board
ng g c Keyboard

ng g service Sudoku

ng g class models/Board
ng g class models/BoardPlay
ng g class models/Cell
ng g class models/Key


## Run single service test
ng test --include="**/sudoku.service.spec.ts"

## Demo Site:
https://amboni.github.io/abeelhando-sudoku/


## Deploy dist to Github website:
(Just once)
ng add angular-cli-ghpages

ng build --base-href "https://amboni.github.io/abeelhando-sudoku/"


(WORKS!!!)
npx angular-cli-ghpages --dir=dist/abeelhando-sudoku/browser

NOT WORKING!! npx angular-cli-ghpages --dir=dist/abeelhando-sudoku


## TODO
- Tab Settings: Keyboard Filter, Error Indicator, Number Hightlight
