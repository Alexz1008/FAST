import React from 'react'
import Header from '../Header/header'
import MessageSidebar from './MessageSidebar/message_sidebar'
import './messages.css'


const messageid = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const fromSender = [true, false, false, true, true, false, true, false, true, false]
const messages = ["Hello?","Hello!","Are you still interested in purchasing this banana?", "Yes I am.", "Where can we meet up?",
"How about we meet up in front of Geisel at 10 AM tomorrow?", "I can't make 10 AM, can you do 11 AM instead?", "Sure, that's fine!",
"Great, see you then!", "Yep, see youdfjasld;fjalsdjf;ladjfl;ajd;faj;ldfj;alsdjf;laj;flkasj;ldfjal;sdfj;lasdkjf;lakdjf;lajkdf;lasjdfl;aksjdf;lajdf;lajdf;ljdaf;lasjkdf;alsdkjf;aljdf!"];
const timestamps = ["3:02:21 PM", "3:02:28 PM", "3:02:48 PM", "3:03:12 PM", "3:03:16 PM", "3:03:44 PM", "3:05:10 PM", "3:05:25 PM",
"3:05:31 PM", "3:05:34 PM"];
const recipient = "John";
const user = "You";
const getMessages = messageid.map((id) =>
  <div>
    {(fromSender[id]) ? (
      <div className="messages-sent">
        <div className = "messages-sent-text">
          {messages[id]}
        </div>
        <div className="hover">
          [{timestamps[id]}]
        </div>
      </div>)
      :
      (<div className="messages-received">
        <div className = "messages-received-text">
        {messages[id]}
        </div>
        <div className="hover">
          [{timestamps[id]}]
        </div>
      </div>)}
  </div>
);

export class Messages extends React.Component {
  render() {
    return (
      <div className="messages">
        <Header />
        <div className="messages-content">
        <MessageSidebar />
          <div className="messages-messenger">
            <div className="messages-messages">
              {getMessages}
            </div>
            <div className="messages-messenger-container">
              <input className="messages-messenger-input"></input>
              <button className="messages-messenger-sender">Send</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}