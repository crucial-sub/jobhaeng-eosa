import styled from '@emotion/styled';
import colors from 'styles/colors';

export const ChattingContainer = styled.div`
    width: 100%;
    height: 100%;
    background-color: ${colors.white};
    display: flex;
    flex-direction: column;
`;

export const HeaderBox = styled.div`
    width: 80%;
    margin-left: 20px;
    display: flex;
    flex-grow: 6 1;
`;

export const ChatBox = styled.div`
    width: 90%;
    margin: auto;
    height: 20%;
    box-shadow: rgba(9, 30, 66, 0.25) 0px 1px 1px,
        rgba(9, 30, 66, 0.13) 0px 0px 1px 1px;
    margin-bottom: 15px;
    margin-top: 15px;
    border-radius: 10px;
`;

export const TitleNTown = styled.div`
    width: 100%;
    height: 40%;
    display: flex;
    justify-content: space-between;
`;

export const OpponentNick = styled.div`
    width: 50%;
    max-width: 70%;
    height: 10%;
    padding-top: 2%;
    padding-bottom: 2%;
    background-color: ${colors.lightDark};
    color: ${colors.gold};
    text-align: center;
    margin-left: 20px;
    border-radius: 10px;
`;

export const Title = styled.div`
    font-size: 1.2rem;
    margin-top: 20px;
    margin-left: 20px;
`;

export const Town = styled.div`
    font-size: 0.8rem;
    opacity: 0.5;
    margin-top: 20px;
    margin-right: 20px;
`;

export const LastMessages = styled.div`
    display: flex;
    width: 100%;
    height: 40%;
    overflow: hidden;
    align-items: center;
    margin-left: 20px;
    & div > div {
        width: 3.8rem;
        line-height: 1.5rem;
        font-size: 0.9rem;
        text-align: center;
        border-radius: 4px;
        background-color: ${colors.lightDark};
        margin-left: 0.5rem;
        color: ${colors.gold};
    }
`;

export const ChatOutBtn = styled.div`
    line-height: 30px;
    width: 110px;
    background-color: ${colors.lightDark};
    text-align: center;
    border-radius: 15px;
    color: ${colors.gold};
    cursor: pointer;
    margin-left: 30px;
`;
export const ChatInfo = styled.div`
    max-width: 380px;
    min-height: 10%;
    margin-top: 10px;
    padding: 20px;
    display: flex;
    justify-content: space-around;
    cursor: pointer;
    box-shadow: rgba(9, 30, 66, 0.25) 0px 1px 1px,
        rgba(9, 30, 66, 0.13) 0px 0px 1px 1px;
`;

export const TitleNLocation = styled.div``;

export const Titles = styled.div`
    font-size: 1.2rem;
    font-weight: 700;
`;

export const Location = styled.div`
    font-size: 0.8rem;
    opacity: 0.5;
    margin-top: 30px;
`;

export const Reward = styled.div`
    font-size: 1rem;
    opacity: 0.8;
    margin-top: 30px;
`;

export const RewardNickName = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`;

export const NickName = styled.div`
    font-size: 1rem;
    font-weight: 600;
`;
export const Container = styled.form`
    width: 100%;
    flex: 0.75 1 0;
    display: flex;
    bottom: 0;
    position: sticky;
    padding: 10px;
    background-color: gainsboro;
`;
export const TextArea = styled.textarea`
    width: 80%;
    height: auto;
    padding: 0;
    border-radius: 5px;
    border: none;
    resize: none;
`;

export const Send = styled.input`
    height: 100%;
    width: 15%;
`;
export const ContentBox = styled.div`
    width: 100%;
    flex: 8.5 1 0;
    overflow: scroll;
    margin-top: 10px;
    padding-top: 5px;
`;

export const ChatWith = styled.div`
    width: 390px;
    margin: 5px auto 0px auto;
    text-align: center;
    position: sticky;
`;

export const MyMessage = styled.div`
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: row-reverse;
    margin-bottom: 5px;
    right: 5px;

    & div {
        padding: 5px;
    }
`;

export const Message = styled.div`
    border-radius: 15px;
    /* max-width: 80%;ㄴ */
    background-color: ${colors.gold};
    line-height: 30px;
    padding: 5px;
`;

export const OpponentMessage = styled.div`
    margin-bottom: 5px;
    position: relative;
    text-align: left;
    display: flex;
    left: 5px;
`;

export const Omessage = styled.div`
    display: flex;
    flex-direction: row;
`;

export const OppoMessage = styled.div`
    border-radius: 15px;
    background-color: ${colors.gold};
    padding: 10px;
    margin-right: 5px;
`;

export const Times = styled.div`
    padding: 10px;
    min-width: 80px;
`;

export const LastOfMessages = styled.div`
    margin-bottom: -10;
`;
export const RequestAcceptBtn = styled.div`
    line-height: 30px;
    width: 110px;
    background-color: ${colors.lightDark};
    text-align: center;
    border-radius: 15px;
    color: ${colors.gold};
    cursor: pointer;
`;
export const RequestCancelBtn = styled.div`
    line-height: 30px;
    width: 110px;
    text-align: center;
    border-radius: 15px;
    background-color: ${colors.dark};
    color: ${colors.gold};
    cursor: pointer;
`;
