import React from 'react'
import './Sidebar.css'
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import { Avatar, IconButton} from "@material-ui/core"
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import SidebarChat from './SidebarChat';

function Sidebar() {
    return (
        <div className='sidebar'>
            <div className="sidebar__header">
                <Avatar src="https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-1.2.
                1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=375&q=80"/>
                <div className="sidebar__headerRight">
                    <IconButton>
                    <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                    <ChatIcon />
                    </IconButton>
                    <IconButton>
                    <MoreVertIcon />
                    </IconButton>

                </div>
            </div>

        <div className="sidebar__search">
            <div className="sidebar__searchContainer">
                <SearchIcon />
                <input  placeholder="Search or start new chat" type='text' />

            </div>
        </div>

       <div className="sidebar__chats">
           <SidebarChat />
           <SidebarChat />

       </div>

        </div>
    )
}

export default Sidebar
