# AppleJavaScript

## Installation

```shell
npm install apple-java-script
```

## Usage

Use `AppleJavaScript` to run AppleScript in JavaScript language
straight from node.js.

All you have to do is to directly call it. And it will try to parse
the rutruning result.

```js
  // Getting iTunes Playlists

  var ajs = require('apple-java-script');

  var playlists = ajs(function() {
    var iTunes = Application('iTunes');
    return iTunes.playlists.name();
  });

  playlists;
  // =>
  //  ['Library', 'Music', 'Music Videos', 'Movies', 'Home Videos', 'TV Shows', 'Podcasts', 'iTunes U', 'Audiobooks', 'Books', 'PDFs', 'Audiobooks', 'Genius']
```

### Passing variables

Behind the scenes, AppleJavaScript converts function to the text and
runs it with shell command `osascript`. So the function itself
actually doesn't have acces to outside scope. And neither of global or
outside variables are accessible from the function. To pass vars to it
you have to pass them to function as an argument.

```js
  // Showing modal and passing message from outer script

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

### Running in a safer way

`AppleJavaScript` direct call could be dangerous because it uses
`eval` behind the scenes to parse returned AppleScript value. So you
better know what you are doing and control all inputs. If you are not
sure in that you can use `AppleJavaScript.runSafe`. It works the same
way, but doesn't try to parse returning value. So you'll have to do it
yourself.

```js
  var ajs = require('apple-java-script');

  var fn = function() {
    let app = Application.currentApplication();
    app.includeStandardAdditions = true;
    return app.doShellScript('echo Babylon');
  }

  ajs.runSafe(fn);
  // =>
  //  '"Babylon"'
  ajs(fn);
  // =>
  //  'Babylon'
```
