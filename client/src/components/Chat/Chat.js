import React, { useState, useEffect } from 'react';
import './chat.css';
import queryString from 'query-string';
import io from 'socket.io-client';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
    background: {
        margin: '1%',
        width: '60vh',
        height: '70vh',
        backgroundColor: '#c8d7d5',
    },
}));


let socket;

//use effect - zastepuje cyklezycie komponentu np. componentdidmount itp

const Chat = ({ location }) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const ENDPOINT = 'https://chat-application-react-n.herokuapp.com/';

    const classes = useStyles();

    useEffect(() => {
        const { name, room } = queryString.parse(location.search);

        socket = io(ENDPOINT);
        setName(name);
        setRoom(room);
        //polaczenie z server/index.js tutaj eventy np. join
        socket.emit('join', { name, room }, (error) => {
            if (error) {
                alert(error)
            }
        });

    }, [ENDPOINT, location.search]);
    //jesli sie zmieni ENDOPINT albo location.search to bedzie re render
    useEffect(() => {
        socket.on('message', message => {
            setMessages(messages => [...messages, message])
        });

        socket.on('roomData', ({ users }) => {
            setUsers(users);
        })


    }, []);
    //onUpdate
    //chcemy zeby wykonał się ten useEffect tylko wtedy gdy tablica massages sie zmieni
    const sendMessage = (event) => {
        event.preventDefault();
        if (message) {
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    }
    return (
        <div className="outerContainer">
            <div className={classes.background}>
                <Paper>
                    <InfoBar room={room} users={users} />
                    <Messages messages={messages} name={name} />
                    <Input className={classes.bottom} message={message} setMessage={setMessage} sendMessage={sendMessage} />
                </Paper>


            </div>
        </div>
    )
}
export default Chat;