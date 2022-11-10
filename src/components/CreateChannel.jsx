import React, { useState } from "react";
import { useChatContext } from "stream-chat-react";

import { CloseCreateChannel } from "../asset";
import UserList from "./UserList";

const ChannelNameInput = ({ channelName = "", setChannelName }) => {
  const handleChange = (e) => {
    e.preventDefault();
    setChannelName(e.target.value);
  };
  return (
    <div className="channel-name-input__wraprer">
      <p>Name</p>
      <input
        value={channelName}
        onChange={handleChange}
        placeholder="channel-name (no-spaces)!"
      />
    </div>
  );
};

const CreateChannel = ({ createType, setIsCreating }) => {
  const { client, setActiveChannel } = useChatContext();
  const [channelName, setChannelName] = useState("second");
  const [selectedUser, setSelectedUser] = useState([client.userID || ""]);

  const createChannel = async (e) => {
    e.preventDefault();

    try {
      const newChannel = await client.channel(createType, channelName, {
        name: channelName,
        members: selectedUser,
      });
      await newChannel.watch();

      setChannelName("");
      setIsCreating(false);
      setSelectedUser([client.userID]);
      setActiveChannel(newChannel);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="create-channel__container">
      <div className="create-channel__header">
        <p>
          {createType === "team"
            ? "Create a new Channel"
            : " Send a Direct Message"}
        </p>
        <CloseCreateChannel setIsCreating={setIsCreating} />
      </div>
      {createType === "team" && (
        <ChannelNameInput
          channelName={channelName}
          setChannelName={setChannelName}
        />
      )}
      <UserList setSelectedUser={setSelectedUser} />
      <div className="create-channel__button-wrapper" onClick={createChannel}>
        <p>
          {createType === "team" ? "Create Channel" : "Create Message Group"}
        </p>
      </div>
    </div>
  );
};

export default CreateChannel;
