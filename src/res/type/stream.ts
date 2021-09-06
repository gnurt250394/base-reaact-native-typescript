import { MediaStream, RTCSessionDescriptionType } from "react-native-webrtc";
import { Socket } from "socket.io-client";

export interface StreamProviderProps {
    peerId: string;
    setPeerId?: React.Dispatch<React.SetStateAction<string>>;
    users: User[];
    rooms: Room[];
    setUsers?: React.Dispatch<React.SetStateAction<User[]>>;
    localStream: MediaStream | null;
    setLocalStream?: React.Dispatch<React.SetStateAction<MediaStream | null>>;
    remoteStream: { [key: string]: MediaStream };
    setRemoteStream?: React.Dispatch<React.SetStateAction<{ [key: string]: MediaStream }>>;
    initializeSocket: () => void;
    initializePeer: (room: string) => void;
    call: (user: User, isConnect?: boolean) => void;
    switchCamera: () => void;
    toggleMute: () => void;
    isMuted: boolean;
    closeCall: () => void;
    reset: () => void;
    remoteUser: User | null;
    activeCall: any;
    getMediaStream: () => void
    socket: Socket | null,
}
export interface User {
    peerId: string;
    username?: string

}
export interface Room {
    roomName: string
    user: User[]
}
export type SocketEnum = 'OFFER' | 'ANSWER' | 'CANDIDATE' | 'LEAVE' | 'REJECT' | 'DELINE' | 'DISCONNECT' | 'connectFirebase' | 'CHECKING' | 'GET_LIST_GROUP' | 'SEND_MESSAGE' | 'CREATE_ROOM' | 'JOIN_ROOM' | 'MESSAGE' | 'TYPING' | 'QUESTION_' | 'ERROR'