import React, {useEffect, useState} from 'react';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { ACCESS_TOKEN_NAME, API_BASE_URL } from '../../constants/apiConstants';
import './Home.css';
import axios from 'axios'
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { Element, scroller, animateScroll  } from 'react-scroll'
import moment from "moment";


function Home(props) {
    const [state , setState] = useState({
        isLoggedIn : false,
        value: '',
        usernameLogged: '',
        name: 'name',
        room: 'redValley'
    });
    const [messages, setMessages] = useState([]);
    const client = new W3CWebSocket('ws://127.0.0.1:8000/ws/chat/' + state.room + '/');
    function scrollToBottom() {
        scroller.scrollTo('myScrollToElement', {
            containerId: 'chat',
            offset: 10, // Scrolls to element + 50 pixels down the page
        })

    }
    const handleInputChange = (event) => {
        setState((prevProps) => ({
            ...prevProps,
            value: event.target.value
        }));
    };

    const onButtonClicked = (e) => {

        if (state.value.includes('/')) {
            axios.get(`https://api.giphy.com/v1/gifs/search?api_key=QvspAXa7ZvivFYsivTfWZBfid2Rf2cj3&q=${state.value}&limit=1&offset=0&rating=g&lang=en`, {headers: {}})
                .then(function (response) {
                    sendToClient(response.data.data[0].images.downsized_medium.url)
                })
                .catch(function (error) {
                    //redirectToLogin()
                    console.log(error)
                });
        } else {
            sendToClient(state.value);
        }

        setState({...state, value: ''});
        e.preventDefault();
    }

    const sendToClient = (msg) => {
        client.send(JSON.stringify({
            type: "message",
            message: msg,
            username: state.usernameLogged
        }));
    }

    useEffect(() => {

        axios.get(API_BASE_URL+'/api/messages', { headers: { }})
            .then(function (response) {
                if(response.status !== 200){
                    redirectToLogin()
                }
                setMessages(response.data);
                scrollToBottom();
            })
            .catch(function (error) {
                //redirectToLogin()
                console.log(error)
            });


        client.onopen = () => {
            console.log('WebSocket Client Connected');
        };
        state.usernameLogged = localStorage.getItem("username");

        client.onmessage = (message) => {
            const dataFromServer = JSON.parse(message.data);
            console.log('got reply! ', dataFromServer.type);
            if (dataFromServer) {
                setMessages((prevProps) => [...prevProps, dataFromServer]);
                scrollToBottom();
            }
        };

}, [setMessages]);

    function getDateTime(timestamp) {
        return moment(timestamp).format('LLL');
    }
    function redirectToLogin() {
    props.history.push('/login');
    }


    const renderMessage = (msg) => {
        if (msg.includes('https://media') && msg.includes('giphy.com') ) {

            return <img src={msg} style={{maxWidth: '200px'}}/>;
        } else {

            return msg
        }
    }

    return(
        <div className="tab-pane message-body active pb-3 pt-5">
            <div className="message-chat">

                <div className="chat-body" id={'chat'}>
<div>
                    {messages.map(message =>
                        <div  className={`message ${message.username === state.usernameLogged ? "my-message" : "info"}`} key={message.timestamp}>
                            <img alt="" className="img-circle medium-image" src="https://bootdey.com/img/Content/avatar/avatar1.png" />
                            <div className="message-body">
                                <div className="message-info">
                                    <h4> {message.username}  </h4>
                                    <h5> <i className="fa fa-clock-o" /> { getDateTime(message.timestamp)} </h5>
                                </div>
                                <hr />
                                <div className="message-text">

                                    {renderMessage(message.content_message)}
                                </div>
                            </div>
                            <br />

                        </div>

                    )}

                    </div>
                    <Element name="myScrollToElement"/>

                </div>

                <div className="chat-footer">
                    <textarea className="send-message-text" value={state.value} onChange={(e) => handleInputChange(e)} />

                    <button type="button" className="send-message-button btn-info" onClick={(event => onButtonClicked(event) )}> <FontAwesomeIcon icon={faPaperPlane} /> </button>
                </div>

            </div>
        </div>
    )
}

export default withRouter(Home);
