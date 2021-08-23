import express from 'express';
import Server from 'socket.io';
import { createServer } from 'http';

const app = express();
const httpServer = createServer(app);

// socket stuff
const io = Server(httpServer, {
    origins: ["*:*"],
    pingTimeout: 60000,
    pingInterval: 25000
});
io.use(require('socketio-wildcard')())

// 42,["ntp:client_sync", {"t0":1607830859388}]
io.of("/SpinFM_XD_7_7").on('connection', (socket) => {
    var leaderboardResp = null;
    let syncResp = {"t1":0,"t0":0}

    console.log('a user connected');
    socket.on('ntp:client_sync', (d) => {
        //server sync 
        syncResp = {"t1": Number(d["t0"] - 300), ...d};
        socket.emit("ntp:server_sync", syncResp)
        console.log("synced")
    });

    socket.on('username', (d) => {
        leaderboardResp = {"scores":[0],"names":[d["name"]],"ranks":[1],"playerIds":[d["id"]],"song":{"name":"This Is It","difficulty":"XD","leaderboardKey":"This Is It_XD_21","startTime":1629711092030.8003,"topScore":741650,"next":{"name":"Go Outside","difficulty":"XD","leaderboardKey":"Go Outside_XD_13","startTime":1629711442501.9001}},"totalScore":0,"maxRank":1,"totalPlayers":1,"aliveCount":1,"indexOfPlayer":0,"isAlive":true,"playerIdsToRegister":["76561198249679284"],"playerIdsToUnregister":[]}
        socket.emit("leaderboard", leaderboardResp)
        socket.emit("ntp:server_sync", syncResp)
    });

    socket.on('score', () => {
        console.log('scored');
        socket.emit("leaderboard", leaderboardResp)
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
    res.send({"stations":[{"id":"SpinFM_Easy_6_6","name":"SpinFM Easy","players":0,"cover":"Cover-SpinFM1-Easy-Cruise","nextSongs":[{"name":"Spin Cycle","difficulty":"Easy","leaderboardKey":"Spin Cycle_Easy_10","startTime":1607830792482.8599,"topScore":14210},{"name":"Lovesick","difficulty":"Easy","leaderboardKey":"Lovesick_Easy_10","startTime":1607830943965.6597},{"name":"VOLT","difficulty":"Easy","leaderboardKey":"VOLT_Easy_12","startTime":1607830943965.6597}],"descriptionFallback":"","descriptionKey":""},{"id":"SpinFM_Normal_6_6","name":"SpinFM Normal","players":0,"cover":"Cover-SpinFM2-Normal-Chill","nextSongs":[{"name":"Platform 9","difficulty":"Normal","leaderboardKey":"Platform 9_Normal_11","startTime":1607830780501.41,"topScore":30294},{"name":"BUBBLES","difficulty":"Normal","leaderboardKey":"BUBBLES_Normal_9","startTime":1607830925120.51},{"name":"My Museum","difficulty":"Normal","leaderboardKey":"My Museum_Normal_14","startTime":1607830925120.51}],"descriptionFallback":"","descriptionKey":""},{"id":"SpinFM_Hard_6_6","name":"SpinFM Hard","players":0,"cover":"Cover-SpinFM3-Hard-Heat","nextSongs":[{"name":"New Year","difficulty":"Hard","leaderboardKey":"New Year_Hard_13","startTime":1607830738246.8,"topScore":48075},{"name":"Checkpoint","difficulty":"Hard","leaderboardKey":"Checkpoint_Hard_10","startTime":1607830921106.8},{"name":"This Is It","difficulty":"Hard","leaderboardKey":"This Is It_Hard_10","startTime":1607830921106.8}],"descriptionFallback":"","descriptionKey":""},{"id":"SpinFM_Expert_6_6","name":"SpinFM Expert","players":0,"cover":"Cover-SpinFM4-Expert-Heavy","nextSongs":[{"name":"My Museum","difficulty":"Expert","leaderboardKey":"My Museum_Expert_17","startTime":1607830771730.1003,"topScore":49010},{"name":"Showdown","difficulty":"Expert","leaderboardKey":"Showdown_Expert_19","startTime":1607830988730.1003},{"name":"Platform 9","difficulty":"Expert","leaderboardKey":"Platform 9_Expert_11","startTime":1607830988730.1003}],"descriptionFallback":"","descriptionKey":""},{"id":"SpinFM_XD_7_7","name":"Custom Test","players":0,"cover":"Cover-SpinFM5-XD-Crazy","nextSongs":[{"name":"Go Outside","difficulty":"XD","leaderboardKey":"Go Outside_XD_13","startTime":1607830792329.7998,"topScore":570078},{"name":"Flight","difficulty":"XD","leaderboardKey":"Flight_XD_13","startTime":1607831006829.7998},{"name":"Razor Sharp","difficulty":"XD","leaderboardKey":"Razor Sharp_XD_19","startTime":1607831006829.7998}],"descriptionFallback":"","descriptionKey":""}]});
})

app.all('/**', function (req, res) {
    console.log(req.url)
})

const port = 80;
httpServer.listen(port, () => {
  console.log(`Timezones by location application is running on port ${port}.`);
})



