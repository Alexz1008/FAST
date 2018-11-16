import React from 'react'
import { MessageSidebarButton } from './MessageSidebarButton/message_sidebar_button'
import './message_sidebar.css'


const images = ['https://i5.walmartimages.ca/images/Large/580/6_r/875806_R.jpg',
                'https://pmcvariety.files.wordpress.com/2018/07/bradybunchhouse_sc11.jpg?w=1000&h=563&crop=1'];
const ids = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const titles = ["Buy this Banana", "Buy this house", "empty"];

const getConversations = ids.map((id) =>
  <MessageSidebarButton image={images[id]} title={titles[id]} />
);

const MessageSidebar = () => (
  <div className="message-sidebar">
    {getConversations}
  </div>
)

export default MessageSidebar
