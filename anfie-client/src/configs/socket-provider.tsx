"use client";
import { localStorageService } from "@/utils";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Socket, io } from "socket.io-client";

export const SocketContext = createContext({} as Socket);

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }: PropsWithChildren) => {
  const [accessToken, setAccessToken] = useState("");
  const [socket, setSocket] = useState<Socket>({} as Socket);
  useEffect(() => {
    setAccessToken(localStorage.getItem("access_token") || "");
    const socket = io(
      process.env.NEXT_PUBLIC_WEBSOCKET_URL || "ws://127.0.0.1:8080",
      {
        extraHeaders: {
          Authorization: localStorageService.getLocalStorage("access_token"),
        },
      }
    );
    setSocket(socket);
    return () => {
      socket.close();
    };
  }, []);

  console.log({socket});
  

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
