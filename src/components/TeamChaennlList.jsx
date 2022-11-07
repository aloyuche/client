import React from "react";
import { AddChannel } from "../asset";
const TeamChaennlList = ({ children, error = false, loading, type }) => {
  if (error) {
    return type === "team" ? (
      <div className="team-channel-list">
        <p className="team-channel-list__message">
          Connection Error, please try again later
        </p>
      </div>
    ) : null;
  }

  if (loading) {
    return (
      <div className="team-channel-list">
        <p className="team-channel-list__message">
          {type === "team" ? "Channels" : "message"} loading...
        </p>
      </div>
    );
  }

  return (
    <div className="team-channel-list">
      <div className="team-channel-list__header">
        <p className="team-channel-list__header__title">
          {type === "team" ? "Channels" : "Direct message"}
        </p>
        {/* Button, to add channel */}
      </div>
      {children}
    </div>
  );
};

export default TeamChaennlList;
