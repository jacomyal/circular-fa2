### Quick intro

This repository is just an experiment, to see how [Force Atlas 2](https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0098679) could behave, with the nodes forced to remain on concentric circles.

To play with it, you can adjust the random graph generation or some other parameters in `./index.js`, and how the nodes are restricted on the circles in the end of `./fa2/worker.js` (I shamelessly copied the generated files from `graphology-layout-forceatlas2`).

### How to test

1. Clone this project, and open a terminal in it
2. Run `npm install`
3. Run `npm run start`
4. Open http://localhost:3001/ in your favorite web browser