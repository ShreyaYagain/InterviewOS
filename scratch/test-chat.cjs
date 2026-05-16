const WebSocket = require('ws');

const GATEWAY_URL = 'ws://localhost:18789';
const TOKEN = 'dace11160154eb6e62886878c411fd19c69c092f5e599af8';

const ws = new WebSocket(GATEWAY_URL, {
    headers: {
        'Origin': 'http://localhost:5173'
    }
});

let output = '';

ws.on('open', () => {
    console.log('Connected to gateway');
});

ws.on('message', (data) => {
    const msg = JSON.parse(data.toString());

    if (msg.type === 'event' && msg.event === 'connect.challenge') {
        ws.send(JSON.stringify({
            type: 'req', id: 'handshake', method: 'connect',
            params: {
                minProtocol: 3, maxProtocol: 3, role: 'operator',
                client: { id: 'openclaw-control-ui', mode: 'ui', version: '1.0.0', platform: 'node' },
                auth: { token: TOKEN },
                scopes: ['operator.admin']
            }
        }));
    } else if (msg.id === 'handshake') {
        if (msg.ok) {
            console.log('Handshake successful!');
            ws.send(JSON.stringify({
                type: 'req', id: 'chat', method: 'chat.send',
                params: {
                    sessionKey: 'compiler-test-final',
                    message: 'Hello, can you run print("Test Success") and show me the output?',
                    idempotencyKey: 'test-' + Date.now()
                }
            }));
        } else {
            console.error('Handshake failed:', msg.error);
            process.exit(1);
        }
    } else if (msg.type === 'event' && (msg.event === 'chat' || msg.event === 'session.message')) {
        const payload = msg.payload;
        if (payload.state === 'delta') {
            const rawDelta = payload.message?.content || payload.message?.text || '';
            const delta = typeof rawDelta === 'string' ? rawDelta : JSON.stringify(rawDelta);
            output += delta;
            process.stdout.write(delta);
        } else if (payload.state === 'final') {
            console.log('\n--- FINAL OUTPUT ---');
            console.log(output);
            ws.close();
        }
    } else if (msg.id === 'chat' && !msg.ok) {
        console.error('Chat request failed:', JSON.stringify(msg.error, null, 2));
        ws.close();
    }
});
