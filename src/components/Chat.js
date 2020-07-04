import React, { useState } from 'react';
import { Button, Comment, Form, Header } from 'semantic-ui-react';
import update from 'immutability-helper';

import batman from './batman.png';

const timestamp = () => {
  const datetime = new Date();
  return datetime.toLocaleTimeString('en-US')
}

const Chat = () => {
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const reply = () => {
    if (!newMessage) return;

    const payload = {
      avatar: batman,
      content: {
        author: 'batman',
        text: newMessage,
        metadata: [timestamp()],
      }
    }

    const newMessages = update(messages, { $push: [payload] });
    setMessages(newMessages);

    setNewMessage('');
  };

  const renderMessages = () => (
    <div>
      {messages.map(({ avatar, content }) => (
        <Comment>
          <Comment.Avatar src={avatar} />
          <Comment.Content>
            <Comment.Author as="a">{content.author}</Comment.Author>
            {content.metadata.map(line => (
              <Comment.Metadata>
                <div>{line}</div>
              </Comment.Metadata>
            ))}
            <Comment.Text>{content.text}</Comment.Text>
          </Comment.Content>
        </Comment>
      ))}
    </div>
  );

  return (
    <Comment.Group className="Chat">
      <Header as="h3" dividing>
        Chat
      </Header>

      {renderMessages()}

      <Form reply>
        <Form.TextArea
          onChange={event => setNewMessage(event.target.value)}
          value={newMessage}
        />
        <Button
          onClick={reply}
          content="Reply"
          labelPosition="left"
          icon="edit"
          primary
        />
      </Form>
    </Comment.Group>
  );
};

export default Chat;
