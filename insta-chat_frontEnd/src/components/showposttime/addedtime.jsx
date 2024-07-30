import React from "react";
import { formatDistanceToNow } from "date-fns";

export default function Lastseen(props) {
  const timeStamp = props.time;
  const duration = formatDistanceToNow(new Date(timeStamp), {
    addSuffix: false,
  });
  console.log(duration, timeStamp + "<- props time", "thisisshotDuration");
  const shortDuration = duration
    .replace("less than a minute", "just now")
    .replace("about ", "")
    .replace(" hours", "h")
    .replace(" hour", "h")
    .replace(" days", "d")
    .replace(" day", "d")
    .replace(" minutes", "min")
    .replace(" minute", "min")
    .replace(" seconds", "s")
    .replace(" second", "s");
  console.log(shortDuration, "thisisshotDuration");

  return <div>{shortDuration}</div>;
}
