import React from 'react';
import './input.css';



const Input = ({ message, sendMessage, setMessage }) => (
    <form className="form">
        <input
            className="input"
            type="text"
            placeholder="Write something... "
            value={message}
            onChange={({ target: { value } }) => setMessage(value)}
            onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
        />
        <button className="sendButton" onClick={(event) => sendMessage(event)}>Send</button>
    </form>
);

export default Input;