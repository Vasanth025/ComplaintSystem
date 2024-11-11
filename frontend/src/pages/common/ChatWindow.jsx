import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const ChatWindow = (props) => {
   const [messageInput, setMessageInput] = useState('');
   const messageWindowRef = useRef(null);
   const [messageList, setMessageList] = useState([]);

   const fetchMessageList = async (complaintId) => {
      try {
         const response = await axios.get(`http://localhost:4000/api/mesg/messages/${complaintId}`);
         const messages = response.data.messages || [];
         setMessageList(messages);
      } catch (error) {
         console.error('Error fetching messages:', error);
      }
   };

   useEffect(() => {
      fetchMessageList(props.complaintId);
   }, [props.complaintId]);

   useEffect(() => {
      scrollToBottom();
   }, [messageList]);

   const sendMessage = async () => {
      try {
         const data = {
            name: props.name,
            message: messageInput,
            complaintId: props.complaintId
         };
         const response = await axios.post('http://localhost:4000/api/mesg/add-message', data);
         setMessageList([...messageList, response.data]);
         setMessageInput('');
         fetchMessageList(props.complaintId);
      } catch (error) {
         console.error('Error sending message:', error);
      }
   };

   const scrollToBottom = () => {
      if (messageWindowRef.current) {
         messageWindowRef.current.scrollTop = messageWindowRef.current.scrollHeight;
      }
   };

   return (
      <div className="chat-container" style={styles.chatContainer}>
         <h1 style={styles.heading}>Message Box</h1>
         <div className="message-window" ref={messageWindowRef} style={styles.messageWindow}>
            {messageList.slice().reverse().map((msg) => (
               <div className="message" key={msg._id} style={msg.name === props.name ? styles.userMessage : styles.agentMessage}>
                  <p style={styles.messageText}>
                     <strong>{msg.name}:</strong> {msg.message}
                  </p>
                  <p style={styles.timestamp} className='mt-0'>
                     {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}, {new Date(msg.createdAt).toLocaleDateString()}
                  </p>
               </div>
            ))}
         </div>
         <div className="input-container" style={styles.inputContainer}>
            <textarea
               required
               type="text"
               placeholder="Type your message..."
               value={messageInput}
               onChange={(e) => setMessageInput(e.target.value)}
               style={styles.textArea}
            />
            <button className="btn btn-success" onClick={sendMessage} style={styles.sendButton}>
               Send
            </button>
         </div>
      </div>
   );
};

const styles = {
    chatContainer: {
       backgroundColor: '#f4f4f9',
       borderRadius: '8px',
       padding: '10px',
       boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
       maxWidth: '900px',  
       margin: '10px auto',
       minHeight: '500px',
    },

 
 
   heading: {
      textAlign: 'center',
      color: '#333',
      marginBottom: '20px',
      fontSize: '24px',
      fontWeight: 'bold',
   },
   messageWindow: {
      maxHeight: '400px',  
      overflowY: 'auto',
      backgroundColor: '#fff',
      padding: '15px',
      borderRadius: '8px',
      boxShadow: 'inset 0px 0px 8px rgba(0, 0, 0, 0.1)',
      marginBottom: '20px',
   },
   userMessage: {
      backgroundColor: '#e6f7ff',
      borderRadius: '10px',
      padding: '12px',
      marginBottom: '10px',
      maxWidth: '80%',
      wordWrap: 'break-word',
      marginLeft: 'auto',
   },
   agentMessage: {
      backgroundColor: '#f1f1f1',
      borderRadius: '10px',
      padding: '12px',
      marginBottom: '10px',
      maxWidth: '80%',
      wordWrap: 'break-word',
      marginRight: 'auto',
   },
   messageText: {
      margin: 0,
      color: '#333',
      fontSize: '16px',
   },
   timestamp: {
      fontSize: '12px',
      marginTop: '-5px',
      color: '#888',
   },
   inputContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
   },
   textArea: {
      width: '100%',
      padding: '12px',
      marginBottom: '15px',
      borderRadius: '8px',
      border: '1px solid #ddd',
      resize: 'none',
      fontSize: '16px',
      height: '100px',
      backgroundColor: '#fff',
   },
   sendButton: {
      backgroundColor: '#28a745',
      color: '#fff',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '16px',
      transition: 'background-color 0.3s ease',
   },
};

export default ChatWindow;
