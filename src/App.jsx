import React from "react";
import "./App.css";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import Cookies from "universal-cookie";

import { ChannelListContainer, ChannelContainer, Auth } from "./components";

const cookies = new Cookies();

const apiKey = "6ztxqx9dwpg4";
const authToken = cookies.get("token");

const client = StreamChat.getInstance(apiKey);

if (authToken) {
  client.connectUser(
    {
      id: cookies.get("userID"),
      name: cookies.get("username"),
      fullname: cookies.get("fullname"),
      hashedPassword: cookies.get("hashedPassword"),
      phoneNumber: cookies.get("phoneNumber"),
      image: cookies.get("avatarUrl"),
    },
    authToken
  );
}
const App = () => {
  if (!authToken) return <Auth />;
  return (
    <div className="app__wrapper">
      <Chat client={client} theme="team light">
        <ChannelListContainer />

        <ChannelContainer />
      </Chat>
    </div>
  );
};

export default App;
