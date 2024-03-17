import React from 'react';

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
    const handleHello = () => {
        const botMessage = createChatBotMessage('나도 반가웡');

        setState((prev) => ({
            ...prev,
            messages: [...prev.messages, botMessage],
        }));
    };

    const handleUnknownMessage = () => {
        const botMessage = createChatBotMessage('죄송해요 무슨 말씀이신지 잘 모르겠어요 ㅜㅜ');

        setState((prev) => ({
            ...prev,
            messages: [...prev.messages, botMessage],
        }));
    };

    const handleDog = () => {
        const botMessage = createChatBotMessage("귀여운 강아쥐!", {
            widget: 'dogPicture',
        });
        setState((prev) => ({
            ...prev,
            messages: [...prev.messages, botMessage],
        }));

    };

    return (
        <div>
            {React.Children.map(children, (child) => {
                return React.cloneElement(child, {
                    actions: { handleHello, handleUnknownMessage, handleDog },
                });
            })}
        </div>
    );
};

export default ActionProvider;
