import React, { useEffect, useState, useRef } from 'react';
import { Client } from '@stomp/stompjs';

const WebSocketDemo = () => {
    const [serverMessage, setServerMessage] = useState('');
    const [clientMessage, setClientMessage] = useState('');
    const clientRef = useRef(null); // Use a ref to store the client

    useEffect(() => {
        const client = new Client({
            brokerURL: 'ws://localhost:8080/ws',
            onConnect: () => {
                console.log('Connected to WebSocket');
                client.subscribe('/topic/response', (message) => {
                    setServerMessage(message.body);
                });
            },
            onStompError: (frame) => {
                console.error('Broker reported error: ' + frame.headers['message']);
                console.error('Additional details: ' + frame.body);
            },
            reconnectDelay: 5000, // Automatically reconnect after 5 seconds
        });

        client.activate();
        clientRef.current = client; // Store the client in the ref

        return () => {
            client.deactivate();
        };
    }, []);

    const sendMessage = () => {
        if (clientRef.current && clientRef.current.connected) {
            clientRef.current.publish({
                destination: '/app/message',
                body: clientMessage,
            });
        } else {
            console.error('WebSocket client not connected');
            alert('WebSocket client not connected');
        }
    };

    return (
        <div>
            <h1>WebSocket Demo</h1>
            <input
                type="text"
                value={clientMessage}
                onChange={(e) => setClientMessage(e.target.value)}
                placeholder="Type a message"
            />
            <button onClick={sendMessage}>Send Message</button>
            <p>Response from Server: {serverMessage}</p>
        </div>
    );
};

export default WebSocketDemo;