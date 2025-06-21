##  Frontend Overview

I’ve developed a complete frontend application using **React.js**, designed with a focus on user experience, responsiveness, and real-time interaction.

---

###  Features

#### 1.  Explore & Post Management
- Dynamic post feed with **search** and **tag-based filtering** (e.g., AI, ML, IOT).
- Users can **like** and **bookmark** posts, with real-time UI updates.
- Bookmarked posts persist per user using **local storage** and backend sync.
- Responsive UI built using **Tailwind CSS**.

#### 2.  Real-time Chat System (like WhatsApp)
- Users can start a **1-on-1 conversation** by clicking the "Message" button on any post.
- Implemented a **Chat Inbox** to list all previous conversations.
- Real-time messaging with **Socket.IO**, including:
  - Room-based chats using dynamic `roomid`
  - Live message sending and receiving
  - Full chat history retrieval on refresh

#### 3.  Authentication & Routing
- Integrated **Google OAuth** for secure user sign-in.
- Used **React Router** for seamless navigation between:
  - `Explore`
  - `Posts`
  - `Dashboard`
  - `Chat Inbox`
  - `Personal Chat Room`

---

###  Tech Stack

- **React.js** – Component-based UI
- **Axios** – API communication
- **Socket.IO** – Real-time bi-directional messaging
- **Tailwind CSS** – Utility-first responsive design
- **React Router DOM** – Dynamic routing
- **Google OAuth** – Secure authentication

---

###  Highlight

> "This frontend focuses not just on building features, but delivering a smooth, interactive experience. From responsive design to real-time communication, every element is crafted for usability and performance."

