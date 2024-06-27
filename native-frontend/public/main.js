const esp32CamStreamUrl = 'http://192.168.234.49:81/stream';
const esp32CamWebSocketUrl = 'ws://192.168.234.49:81/';

let ws = null;

window.onload = function () {
    document.getElementById('timestamp').innerText = new Date().toLocaleString();
    connectWebSocket();
    setInterval(() => {
        autoCapture()
    }, 30000)
};

function connectWebSocket() {
    ws = new WebSocket(esp32CamWebSocketUrl);
    ws.onopen = () => console.log('WebSocket connected');
    ws.onmessage = event => console.log('Message from server:', event.data);
    ws.onclose = () => console.log('WebSocket disconnected');
    ws.onerror = error => console.error('WebSocket error:', error);
}

async function autoCapture() {
    const video = document.getElementById('stream');
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    const dataUrl = canvas.toDataURL('image/png');
    console.log({ context: context });
    console.log({ dataUrl: dataUrl });
    const trimDataUrl = dataUrl.substring(0, 14);

    try {
        const response = await fetch('http://localhost:8080/api/cctv', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ classs: 'image', label: trimDataUrl }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const result = await response.json();
        console.log('Image posted successfully:', result);
    } catch (error) {
        console.error('Error posting image:', error);
    }
}