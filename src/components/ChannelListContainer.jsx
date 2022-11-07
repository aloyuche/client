import React from "react";
import { ChannelList, useChatContext } from "stream-chat-react";
import Cookies from "universal-cookie";
import Hospital from "../asset/hospital.png";
import LogoutIcon from "../asset/logout.png";
import { ChannelSearch, TeamChaennlList, TeamChannelPreview } from "./";

const SideBar = () => (
  <div className="channel-list__sidebar">
    <div className="channel-list__sidebar__icon1">
      <div className="icon1__inner">
        <img src={Hospital} alt="Hospital" width={30} />
      </div>
    </div>
    <div className="channel-list__sidebar__icon1">
      <div className="icon1__inner">
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
  return (
    <>
      <SideBar />
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
