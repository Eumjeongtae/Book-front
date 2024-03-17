import { createChatBotMessage } from 'react-chatbot-kit';
import DogPicture from '../components/DogPicture';

const botName = '책박사';

const config = {
    initialMessages: [createChatBotMessage(`안녕하세요 ${botName} 입니다 무엇을 도와드릴까요?`)],
    botName: botName,
    customStyles: {
        botMessageBox: {
            backgroundColor: '#376B7E',
        },
        chatButton: {
            backgroundColor: '#5ccc9d',
        },
    },
    widgets: [
        {
            widgetName: 'dogPicture',
            widgetFunc: (props) => <DogPicture {...props} />,
        },
    ],
};

export default config;
