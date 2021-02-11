# Scribble Jam

This game is for the [Scribble Jam](https://itch.io/jam/scribble-jam). The game is using the Phaser game engine.

## Development

For developing run ```npm i``` to install the proper node packages. The scripts to build in the development mode is ```npm run dev``` and to watch is ```npm run watch```. To build in production mode run ```npm run prod```. This project is currently using the latest long term support version of node (14.15.1).

This project contains the index.html file to load the js built by webpack from the source javascript located in js/src/index.js and placed in js/dist/index.js. The webpack build uses the babel loader for more browser support.
