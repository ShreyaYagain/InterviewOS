import WebSocket from 'ws';

const wsUrl = `ws://127.0.0.1:18789`;

const prompt = `mode: run
language: python

code:
print("hello from openclaw")`;

console.log('Connecting to OpenClaw...');
const ws = new WebSocket(wsUrl);

ws.on('open', () => {
  console.log('Connected. Sending message immediately...');
  ws.send(JSON.stringify({
    type: 'message',
    text: prompt,
    skill: 'atom-code-reviewer'
  }));
});

ws.on('message', (data) => {
  const msg = JSON.parse(data.toString());
  console.log('Received type:', msg.type || msg.event);
  
  if (msg.type === 'message' || msg.type === 'response' || msg.type === 'chunk') {
    if (msg.text || msg.content) {
      console.log('Output:', msg.text || msg.content);
    }
  }

  if (msg.type === 'done' || msg.done === true) {
    console.log('Execution finished.');
    ws.close();
    process.exit(0);
  }
});

ws.on('error', (err) => {
  console.error('WebSocket Error:', err.message);
  process.exit(1);
});

setTimeout(() => {
  console.error('Timed out after 20s');
  ws.close();
  process.exit(1);
}, 20000);
