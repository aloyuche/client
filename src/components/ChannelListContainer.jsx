import React from "react";
import { ChannelList, useChatContext } from "stream-chat-react";
import Cookies from "universal-cookie";
import Hospital from "../asset/hospital.png";
import LogoutIcon from "../asset/logout.png";
import { ChannelSearch, TeamChaennlList, TeamChannelPreview } from "./";

const cookies = new Cookies();
const SideBar = ({ logout }) => (
  <div className="channel-list__sidebar">
    <div className="channel-list__sidebar__icon1">
      <div className="icon1__inner">
        <img src={Hospital} alt="Hospital" width={30} />
      </div>
    </div>
    <div className="channel-list__sidebar__icon1">
      <div className="icon1__inner" onClick={logout}>
        <img src={LogoutIcon} alt="Hospital" width={30} />
      </div>
    </div>
  </div>
);

const CompanyHeader = () => (
  <div className="channel-list__header">
    <p className="channel-list__header__text">Medical Header</p>
  </div>
);

const ChannelListContainer = () => {
  const logout = () => {
    cookies.remove("token");
    cookies.remove("userID");
    cookies.remove("username");
    cookies.remove("fullname");
    cookies.remove("hashedPassword");
    cookies.remove("phoneNumber");
    cookies.remove("avatarUrl");
    window.location.reload();
  };

  return (
    <>
      <SideBar logout={logout} />
      <div className="channel-list__list__wrapper">
        <CompanyHeader />
        <ChannelSearch />
        <ChannelList
          filters={{}}
          channelRenderFilterfn={() => {}}
          List={(listProps) => <TeamChaennlList {...listProps} type="team" />}
          Preview={(previewProps) => (
            <TeamChannelPreview {...previewProps} type="team" />
          )}
        />
        <ChannelList
          filters={{}}
          channelRenderFilterfn={() => {}}
          List={(listProps) => (
            <TeamChaennlList {...listProps} type="messaging" />
          )}
          Preview={(previewProps) => (
            <TeamChannelPreview {...previewProps} type="messaging" />
          )}
        />
      </div>
    </>
  );
};

export default ChannelListContainer;
