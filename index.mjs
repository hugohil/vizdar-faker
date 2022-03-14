import SimplexNoise from 'simplex-noise';

import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: [
      "http://127.0.0.1:3000",
      "http://localhost:3000",
      "http://127.0.0.1:8080",
      "http://localhost:8080",
    ]
  }
});

app.use(express.static('app'));

const s1 = new SimplexNoise(Math.round(Math.random() * 1000));
const s2 = new SimplexNoise(Math.round(Math.random() * 1000));
const s3 = new SimplexNoise(Math.round(Math.random() * 1000));
const s4 = new SimplexNoise(Math.round(Math.random() * 1000));

let p1 = { x: 0, y: 0 };
let p2 = { x: 0, y: 0 };
let p3 = { x: 0, y: 0 };
let p4 = { x: 0, y: 0 };

function update (t) {
  const tt = (t / 10000);

  p1.x = ((s1.noise2D(1, tt) * 0.5) + 0.5);
  p1.y = ((s1.noise2D(2, tt) * 0.5) + 0.5);

  p2.x = ((s2.noise2D(2, tt) * 0.5) + 0.5);
  p2.y = ((s2.noise2D(3, tt) * 0.5) + 0.5);

  p3.x = ((s3.noise2D(3, tt) * 0.5) + 0.5);
  p3.y = ((s3.noise2D(4, tt) * 0.5) + 0.5);

  p4.x = ((s4.noise2D(4, tt) * 0.5) + 0.5);
  p4.y = ((s4.noise2D(5, tt) * 0.5) + 0.5);
}

io.on("connection", (socket) => {
  console.log('connection', socket.id);

  function sendVizdar () {
    update(performance.now());

    socket.broadcast.emit('vizualidar', [p1, p2, p3, p4]);
    setTimeout(sendVizdar, 16.5);
  }

  sendVizdar();
});

httpServer.listen(3000);
