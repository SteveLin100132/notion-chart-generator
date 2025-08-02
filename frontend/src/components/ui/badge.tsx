"use client";

import React from "react";

export const Badge: React.FC<{ text: string; color?: string; size?: "sm" | "md" }> = ({
  text,
  color = "default",
  size = "sm",
}) => {
  const getColorClasses = (color: string) => {
    switch (color) {
      case "gray":
      case "default":
        return "bg-gray-100 text-gray-800";
      case "brown":
        return "bg-amber-100 text-amber-800";
      case "orange":
        return "bg-orange-100 text-orange-800";
      case "yellow":
        return "bg-yellow-100 text-yellow-800";
      case "green":
        return "bg-green-100 text-green-800";
      case "blue":
        return "bg-blue-100 text-blue-800";
      case "purple":
        return "bg-purple-100 text-purple-800";
      case "pink":
        return "bg-pink-100 text-pink-800";
      case "red":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const sizeClasses = size === "sm" ? "px-2 py-1 text-xs" : "px-3 py-1 text-sm";

  return (
    <span
      className={`inline-flex items-center rounded-full font-medium whitespace-nowrap ${getColorClasses(
        color
      )} ${sizeClasses}`}
    >
      {text}
    </span>
  );
};
