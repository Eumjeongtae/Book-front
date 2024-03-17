import React from 'react';

const MessageParser = ({ children, actions }) => {
    const parse = (message) => {
        if (message.includes('안녕')) {
            actions.handleHello();
        } else if (message.includes('강아지')) {
            actions.handleDog();
        } else {
            actions.handleUnknownMessage();
        }
    };

    return (
        <div>
            {React.Children.map(children, (child) => {
                return React.cloneElement(child, {
                    parse: parse,
                    actions,
                });
            })}
        </div>
    );
};

export default MessageParser;
