const WebSocket = require('ws');

const GATEWAY_URL = 'ws://localhost:18789';
const TOKEN = 'dace11160154eb6e62886878c411fd19c69c092f5e599af8';

const ws = new WebSocket(GATEWAY_URL, {
    headers: {
        'Origin': 'http://localhost:5173'
    }
});

ws.on('open', () => {
    console.log('Connected to gateway');
});

ws.on('message', (data) => {
    const msg = JSON.parse(data.toString());

    if (msg.type === 'event' && msg.event === 'connect.challenge') {
        const connectReq = {
            type: 'req',
            id: '1',
            method: 'connect',
            params: {
                minProtocol: 3,
                maxProtocol: 3,
                role: 'operator',
                client: {
                    id: 'openclaw-control-ui',
                    mode: 'ui',
                    version: '1.0.0',
                    platform: 'node'
                },
                auth: {
                    token: TOKEN
                },
                scopes: ['*']
            }
        };
        ws.send(JSON.stringify(connectReq));
    } else if (msg.type === 'res' && msg.id === '1') {
        if (msg.ok) {
            console.log('Handshake successful!');
            console.log('Granted Auth:', JSON.stringify(msg.payload.auth, null, 2));
            ws.close();
        } else {
            console.error('Handshake failed:', JSON.stringify(msg.error, null, 2));
            process.exit(1);
        }
    }
});
