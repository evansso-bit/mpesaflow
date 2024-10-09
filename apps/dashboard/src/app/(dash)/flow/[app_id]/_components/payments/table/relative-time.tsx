"use client";

import { useState, useEffect } from "react";

function parseTimestamp(timestamp: string): Date {
  // Parse ISO string directly
  return new Date(
    timestamp.slice(0, 4) +
      "-" +
      timestamp.slice(4, 6) +
      "-" +
      timestamp.slice(6, 8) +
      "T" +
      timestamp.slice(8, 10) +
      ":" +
      timestamp.slice(10, 12) +
      ":" +
      timestamp.slice(12, 14) +
      "Z",
  );
}

function getRelativeTimeString(date: Date, lang = "en"): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSeconds = Math.round(diffMs / 1000);
  const diffMinutes = Math.round(diffSeconds / 60);
  const diffHours = Math.round(diffMinutes / 60);
  const diffDays = Math.round(diffHours / 24);

  if (diffSeconds < 60) {
    return "just now";
  } else if (diffMinutes < 60) {
    return `${diffMinutes} minute${diffMinutes > 1 ? "s" : ""} ago`;
  } else if (diffHours < 24) {
    return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  } else if (diffDays < 7) {
    return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  } else {
    // For older dates, return the actual date
    return date.toLocaleDateString(lang, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
}

interface RelativeTimeProps {
  timestamp: string;
}

export function RelativeTime({ timestamp }: RelativeTimeProps) {
  const [relativeTime, setRelativeTime] = useState<string>("");

  useEffect(() => {
    const updateRelativeTime = () => {
      const date = parseTimestamp(timestamp);
      setRelativeTime(getRelativeTimeString(date));
    };

    updateRelativeTime();
    const intervalId = setInterval(updateRelativeTime, 60000); // Update every minute

    return () => clearInterval(intervalId);
  }, [timestamp]);

  return <span>{relativeTime}</span>;
}
