import React,{ useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { ACCESS_TOKEN_NAME, API_BASE_URL } from '../../constants/apiConstants';
import './Home.css';
import axios from 'axios'
function Home(props) {
    useEffect(() => {
        /*axios.get(API_BASE_URL+'/user/me', { headers: { 'token': localStorage.getItem(ACCESS_TOKEN_NAME) }})
        .then(function (response) {
            if(response.status !== 200){
              redirectToLogin()
            }
        })
        .catch(function (error) {
          redirectToLogin()
        });*/
      })
    function redirectToLogin() {
    props.history.push('/login');
    }
    return(
        <div className="tab-pane message-body active pb-3 pt-5">

            <div className="message-chat">
                <div className="chat-body">
                    <div className="message info">
                        <img alt="" className="img-circle medium-image" src="https://bootdey.com/img/Content/avatar/avatar1.png" />
                        <div className="message-body">
                            <div className="message-info">
                                <h4> Elon Musk </h4>
                                <h5> <i className="fa fa-clock-o" /> 2:25 PM </h5>
                            </div>
                            <hr />
                            <div className="message-text">
                                I've seen your new template, Dauphin, it's amazing !
                            </div>
                        </div>
                        <br />
                    </div>
                    <div className="message my-message">
                        <img alt="" className="img-circle medium-image" src="https://bootdey.com/img/Content/avatar/avatar1.png" />
                        <div className="message-body">
                            <div className="message-body-inner">
                                <div className="message-info">
                                    <h4> Dennis Novac </h4>
                                    <h5> <i className="fa fa-clock-o" /> 2:28 PM </h5>
                                </div>
                                <hr />
                                <div className="message-text">
                                    Thanks, I think I will use this for my next dashboard system.
                                </div>
                            </div>
                        </div>
                        <br />
                    </div>
                    <div className="message info">
                        <img alt="" className="img-circle medium-image" src="https://bootdey.com/img/Content/avatar/avatar1.png" />
                        <div className="message-body">
                            <div className="message-info">
                                <h4> Elon Musk </h4>
                                <h5> <i className="fa fa-clock-o" /> 2:32 PM </h5>
                            </div>
                            <hr />
                            <div className="message-text">
                                Hah, too late, I already bought it and my team is impleting the new design right now.
                            </div>
                        </div>
                        <br />
                    </div>
                </div>
                <div className="chat-footer">
                    <textarea className="send-message-text" defaultValue={""} />
                    <label className="upload-file">
                        <input type="file" required />
                        <i className="fa fa-paperclip" />
                    </label>
                    <button type="button" className="send-message-button btn-info"> <FontAwesomeIcon icon={faPaperPlane} /> </button>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Home);
