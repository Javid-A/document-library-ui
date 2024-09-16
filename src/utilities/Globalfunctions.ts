import axios from "axios";
import { useState, useEffect } from "react";
import { BASE_URL } from "../Appconfig";

export const formatDateTime = (dateString: string) => {
  const date = new Date(dateString);

  // Format the date as dd/MM/yyyy HH:mm:ss
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
};
