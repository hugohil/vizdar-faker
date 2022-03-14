# fake data for [vizdar](https://github.com/hugohil/vizdar)

### installation

```
$ npm i
```

### usage

* run the server
```
node index.mjs
```

connect your client to the server

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <script src="http://127.0.0.1:3000/socket.io/socket.io.js"></script>
</head>
<body>
  <script type="text/javascript">
    const socket = io('http://127.0.0.1:3000');

    socket.on("connect", () => {
      socket.on("vizualidar", (e) => {
        /*
        e = [
          { x, y }, // person 1
          { x, y }, // person 2
          { x, y }, // person 3
          { x, y }, // person 4
        ]
        // with x and y normalized [0-1]
         */
      });
    });
  </script>
</body>
</html>
```

By default, the server will allow requests from `127.0.0.1:3000`, `localhost:3000`, `127.0.0.1:8080`, `localhost:3000`.
That means, if your client is served somewhere else, you'll have to add the location to the `origin` property of `io` in `index.mjs`.

For example, if you are using parcel for your client, you should probably add:

```
"http://127.0.0.1:1234",
"http://localhost:1234",
```

to the `origin` array of `io` in `index.mjs`
