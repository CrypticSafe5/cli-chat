const { Server } = require('net');

const server = new Server();
let users = {};

console.clear();
server.on('connection', (e) => {
    let userId = 'DEFAULT';
    e.setEncoding('utf8');
    e.on('data', (message) => {
        const userList = Object.keys(users);
        try {
            const config = JSON.parse(message);
            console.log('TEST: ', config);
            const oldUserId = userId;
            userId = (config.hasOwnProperty('userId')) ? config.userId : userId;
            if (userList.includes(config.userId)) {
                e.write(`[SYSTEM]> Unable to connect, that name is already in use, please choose something other than ${JSON.stringify(userList)}`);
            } else if (!config.initial) {
                let newUsers = {};
                userList.forEach((e) => {
                    if (e !== config.userId) {
                        
                    }
                });
                e.write(`[${oldUserId}]> Updated their settings`);
            } else {
                console.log(`> "${userId}" joined`);
                e.write(`[${userId}]> Welcome to the chat!`);
            }
        } catch(err) {
            console.log("in the catch, ", userList);
            let removeList = [];
            userList.forEach((user) => {
                console.log('test: ', users[user].destroyed);
                if (users[user].destroyed) {
                    removeList.push(user);
                } else {
                    users[user].write(`[${userId}]> ${message}`);
                }
            });
            console.log('after the userList check');
            if (removeList.length) {
                console.log('in the if statement');
                let newUsers = {};
                userList.forEach((e) => {
                    if (!userList.includes(e)) {
                        newUsers[e] = users[e];
                    }
                });
            }
        }
    });

    e.on('error', (e) => {
        if (e.code === 'ECONNRESET') {
            console.log(`[SYSTEM]> "${userId}" disconnected`);
        } else {
            console.log('[SYSTEM]> Socket connection error: ', e);
        }
    });
});

server.on('close', () => {
    console.log('[SYSTEM]> Connection closed');
});

server.on('error', () => {
    console.log('[SYSTEM]> Connection errored');
});

server.listen(8080, () => {
    console.log('[SYSTEM]> Process listening');
});
