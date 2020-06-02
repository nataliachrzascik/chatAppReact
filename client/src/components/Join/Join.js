import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './join.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: '3%',
            textDecoration: 'none',
        },

    },
    button: {
        background: "#93aaa7",
        '&:hover': {
            background: "#a4bdba",
        }
    },
    input: {
        background: "#93aaa7",
        '&:active': {
            background: "#a4bdba",
        }
    }

}));

const Join = () => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const classes = useStyles();

    return (
        <div id="mainContainer">
            <div id="fotoRight"></div>
            <div className="joinOuterContainer">
                <div className="joinInnerContainer">

                    <h1 className="heading">Get Started</h1>
                    <form className={classes.root} className={classes.root} noValidate autoComplete="off">
                        <div><TextField classes={{ underline: classes.greenUnderline }} label="Nick" placeholder="" className="joinInput" type="text" onChange={(event) => setName(event.target.value)} /></div>
                        <div><TextField className={classes.input} label="Room" placeholder="" className="joinInput mt-20" type="text" onChange={(event) => setRoom(event.target.value)} /></div>
                        <Link onClick={event => (!name || !room) ? event.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
                            <Button className={classes.button} variant="contained" type="submit">Sign In</Button>
                        </Link>
                    </form>

                </div>

            </div>
        </div>
    )
}
export default Join;