# AppleJavaScript

## Installation

```shell
npm install apple-java-script
```

## Usage

```js
  var ajs = require('apple-java-script');

  // Return iTunes Playlists
  var playlists = ajs(function() {
    iTunes = Application('iTunes');
    return iTunes.playlists.name();
  });

  console.log(playlists)
  // =>
  //  ['Library', 'Music', 'Music Videos', 'Movies', 'Home Videos', 'TV Shows', 'Podcasts', 'iTunes U', 'Audiobooks', 'Books', 'PDFs', 'Audiobooks', 'Genius']
```

Pass variables to function
```js
  var ajs = require('apple-java-script');

  var message = 'Hello';

  var dialogResult = ajs(message, function(message) {
    app = Application.currentApplication();
    app.includeStandardAdditions = true;
    return app.displayDialog(message);
  });

  if (dialogResult.buttonReturned === 'OK') {
     console.log('You pushed Ok');
  } else {
     console.log('You pushed Cancel');
  }
```
