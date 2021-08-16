import express from 'express';
import Server from 'socket.io';
import { createServer } from 'http';

const app = express();
const httpServer = createServer(app);

// socket stuff
const io = Server(httpServer, {origins: ["*:*"]});
io.use(require('socketio-wildcard')())

app.post('/socket.io/', function (req, res) {
    console.log(req.body)
    res.send("ok");
})

// 42,["ntp:client_sync", {"t0":1607830859388}]
io.of("/SpinFM_Easy_7_7").on('connection', (socket) => {
    console.log('a user connected');
    socket.emit("2probe")
    socket.on('ntp:client_sync', (d) => {
        console.log(d);
    });
    socket.on('username', (d) => {
        console.log(d);
    });
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.emit("2probe")
    socket.on('ntp:client_sync', (d) => {
        console.log(d);
    });
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

// http stuff

app.get('/api/stations', function (req, res) {
    res.send({"stations":[{"id":"SpinFM_Easy_7_7","name":"SpinFM Easy","players":100000000,"cover":"Cover-SpinFM1-Easy-Cruise","nextSongs":[{"name":"New Year","difficulty":"Easy","leaderboardKey":"New Year_Easy_11","startTime":1629020172084.9998,"topScore":22627},{"name":"Flight","difficulty":"Easy","leaderboardKey":"Flight_Easy_8","startTime":1629020303084.9998},{"name":"Inject","difficulty":"Easy","leaderboardKey":"Inject_Easy_9","startTime":1629020303084.9998}],"descriptionFallback":"","descriptionKey":""},{"id":"SpinFM_Normal_7_7","name":"SpinFM Normal","players":0,"cover":"Cover-SpinFM2-Normal-Chill","nextSongs":[{"name":"Heading East","difficulty":"Normal","leaderboardKey":"Heading East_Normal_7","startTime":1629020208095.2002,"topScore":31983},{"name":"Never Count On Me","difficulty":"Normal","leaderboardKey":"Never Count On Me_Normal_11","startTime":1629020373458.8003},{"name":"The Magician","difficulty":"Normal","leaderboardKey":"The Magician_Normal_11","startTime":1629020373458.8003}],"descriptionFallback":"","descriptionKey":""},{"id":"SpinFM_Hard_7_7","name":"SpinFM Hard","players":0,"cover":"Cover-SpinFM3-Hard-Heat","nextSongs":[{"name":"My Museum","difficulty":"Hard","leaderboardKey":"My Museum_Hard_15","startTime":1629020215530.0999,"topScore":93119},{"name":"Never Count On Me","difficulty":"Hard","leaderboardKey":"Never Count On Me_Hard_6","startTime":1629020432530.0999},{"name":"Hypersphere","difficulty":"Hard","leaderboardKey":"Hypersphere_Hard_11","startTime":1629020432530.0999}],"descriptionFallback":"","descriptionKey":""},{"id":"SpinFM_Expert_7_7","name":"SpinFM Expert","players":0,"cover":"Cover-SpinFM4-Expert-Heavy","nextSongs":[{"name":"New Year","difficulty":"Expert","leaderboardKey":"New Year_Expert_14","startTime":1629020036225.0994,"topScore":73310},{"name":"Go Outside","difficulty":"Expert","leaderboardKey":"Go Outside_Expert_15","startTime":1629020245225.0994},{"name":"Lovesick","difficulty":"Expert","leaderboardKey":"Lovesick_Expert_9","startTime":1629020245225.0994}],"descriptionFallback":"","descriptionKey":""},{"id":"SpinFM_XD_7_7","name":"SpinFM XD","players":2,"cover":"Cover-SpinFM5-XD-Crazy","nextSongs":[{"name":"Velours","difficulty":"XD","leaderboardKey":"Velours_XD_17","startTime":1629020025691.7002,"topScore":609207},{"name":"Believe","difficulty":"XD","leaderboardKey":"Believe_XD_47","startTime":1629020304264.8003},{"name":"Never Count On Me","difficulty":"XD","leaderboardKey":"Never Count On Me_XD_13","startTime":1629020304264.8003}],"descriptionFallback":"","descriptionKey":""}]});
})

app.all('/**', function (req, res) {
    console.log(req.url)
})

const port = 80;
httpServer.listen(port, () => {
  console.log(`Timezones by location application is running on port ${port}.`);
})



