import { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from "../Context/AuthContext";
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => {
	return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
	const [socket, setSocket] = useState(null);
	const { authUser } = useAuthContext();

	useEffect(() => {
		if (authUser) {
			const socket = io("http://localhost:5000", {
				query: {
					userId: authUser,
				},
			});

			setSocket(socket);

			return () => socket.close();
		} else {
			if (socket) {
				socket.close();
				setSocket(null);
			}
		}
		console.log(authUser);
	}, [authUser]);

	return <SocketContext.Provider value={{ socket }}>{children}</SocketContext.Provider>;
};
