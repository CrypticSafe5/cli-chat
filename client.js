const { Socket } = require('net');
const { createInterface } = require('readline');

const socket = new Socket();
const userId = 'Wesley';

console.clear();
socket.connect(8080, '127.0.0.1', () => {
    createInterface({
        input: process.stdin,
        output: process.stdout
    }).on('line', (message) => socket.write(message));
});

socket.on('close', () => {
    console.log('> Socket closed');
});

socket.on('connect', () => {
    console.log('[SYSTEM]> Connected to host');
    socket.setEncoding('utf8');
    socket.write(JSON.stringify({
        initial: true,
        userId
    }));
});

socket.on('data', (message) => console.log(message));

socket.on('error', (e) => {
    console.log('> Socket error: ', e);
});
