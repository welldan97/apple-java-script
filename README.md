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
    var iTunes = Application('iTunes');
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

  try {
    ajs(message, function(message) {
      var app = Application.currentApplication();
      app.includeStandardAdditions = true;
      return app.displayDialog(message);
    });

    console.log('You pushed Ok');
  } catch (e) {
    console.log('You pushed Cancel');
  }
```

runSafe
```js
  var ajs = require('apple-java-script');

  var message = 'Hello';

  ajs.runSafe(message, function(message) {
    let app = Application.currentApplication();
    app.includeStandardAdditions = true;
    return app.doShellScript('echo Babylon');
  });
  // =>
  //  '"Babylon"'
  
```
