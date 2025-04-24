CREATE TABLE Users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL, -- Store hashed passwords, not plain text!
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--  Messages table: Stores individual chat messages.
CREATE TABLE Messages (
    message_id INT PRIMARY KEY AUTO_INCREMENT,
    sender_id INT NOT NULL,
    chat_id INT NOT NULL,
    message_text TEXT NOT NULL,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_edited BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (sender_id) REFERENCES Users(user_id),
    FOREIGN KEY (chat_id) REFERENCES Chats(chat_id)
);

-- Chats table:  Stores information about chat sessions (Direct Messages or Group Chats)
CREATE TABLE Chats(
    chat_id INT PRIMARY KEY AUTO_INCREMENT,
    chat_type ENUM('direct','group') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- UserChats:  Maps users to chats (Many-to-Many relationship between Users and Chats)
CREATE TABLE UserChats (
  user_id INT NOT NULL,
  chat_id INT NOT NULL,
  joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, chat_id),
  FOREIGN KEY (user_id) REFERENCES Users(user_id),
  FOREIGN KEY (chat_id) REFERENCES Chats(chat_id)
);

-- GroupChatMembers: Stores group chat membership details.
CREATE TABLE GroupChatMembers (
    group_chat_id INT NOT NULL,
    user_id INT NOT NULL,
    role ENUM('admin', 'member') NOT NULL DEFAULT 'member',
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (group_chat_id, user_id),
    FOREIGN KEY (group_chat_id) REFERENCES Chats(chat_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

--  Example query to retrieve messages for a specific chat, ordered by sending time:
SELECT
    m.message_id,
    u.username AS sender_username,
    m.message_text,
    m.sent_at,
    m.is_edited
FROM
    Messages m
JOIN
    Users u ON m.sender_id = u.user_id
WHERE
    m.chat_id = 123 -- Replace 123 with the actual chat_id
ORDER BY
    m.sent_at ASC;

-- Example to get all users in a group chat
SELECT
    u.user_id,
    u.username,
    gcm.role,
    gcm.joined_at
FROM
    Users u
JOIN
    GroupChatMembers gcm ON u.user_id = gcm.user_id
WHERE
    gcm.group_chat_id = 456; -- Replace 456 with the actual group_chat_id

-- Example to create a new group chat and add members
-- 1. Create the chat
INSERT INTO Chats (chat_type) VALUES ('group');
-- 2. Get the new chat's ID
SELECT LAST_INSERT_ID(); --  This will return the chat_id of the newly created chat.  Let's say it returns 789.
-- 3. Add members to the chat using UserChats.  For a group chat, you'd typically add the creator first.
INSERT INTO UserChats (chat_id, user_id) VALUES (789, 101); --  101 is the creator
INSERT INTO GroupChatMembers (group_chat_id, user_id, role) VALUES (789, 101, 'admin');
-- 4.  Add other members
INSERT INTO UserChats (chat_id, user_id) VALUES (789, 102);
INSERT INTO GroupChatMembers (group_chat_id, user_id) VALUES (789, 102, 'member');
INSERT INTO UserChats (chat_id, user_id) VALUES (789, 103);
INSERT INTO GroupChatMembers (group_chat_id, user_id) VALUES (789, 103, 'member');
