import { useEffect, useState } from "react";

export function formatDuration(duration) {
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);
  const seconds = duration % 60;
  let durationString = "";

  if (hours > 0) {
    durationString += `${hours} hr${hours > 1 ? "s" : ""}`;
    if (minutes > 0) {
      durationString += ` ${minutes} min${minutes > 1 ? "s" : ""}`;
    }
  } else if (minutes > 0) {
    durationString += `${minutes} min${minutes > 1 ? "s" : ""}`;
    if (seconds > 0) {
      durationString += ` ${seconds.toFixed(1)} sec${seconds > 1 ? "s" : ""}`;
    }
  } else {
    durationString += `${seconds.toFixed(1)} sec${seconds > 1 ? "s" : ""}`;
  }

  return durationString;
}

export function useUpdatePageTitle({ title, navigation }) {
  // get the page title
  // update the page title
  useEffect(() => {
    navigation.setOptions({
      title: title,
    });
  }, [title]);
}
