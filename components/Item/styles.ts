import styled from '@emotion/styled';
import colors from 'styles/colors';

export const ItemWrapper = styled.div`
    position: relative;
    max-width: 90%;
    height: 99%;
    margin: 1px auto;
    overflow-x: hidden;
    overflow-y: auto;
    background-color: #eeeeee;
`;
export const ProcessInfo = styled.div`
    margin: 1rem auto 0;
    width: 60%;
    padding: 1rem;
    background-color: ${colors.lightDark};
    color: ${colors.gold};
    border-radius: 30px;
    text-align: center;
`;
export const OwnerBox = styled.div`
    position: relative;
    height: 3.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: ${colors.dark};
    box-shadow: rgba(17, 17, 26, 0.1) 0px 1px 0px;
    margin-bottom: 1rem;
`;
export const RequestUser = styled.div`
    font-size: 1.2rem;
`;
export const RequestEditOpenBtn = styled.div`
    width: fit-content;
    cursor: pointer;
    user-select: none;
    font-size: 1.2rem;
`;
export const RequestEditBox = styled.div<{ isEditOpen: boolean }>`
    font-size: 0.9rem;
    position: absolute;
    display: flex;
    flex-direction: column;
    top: 3rem;
    right: 0;
    background-color: ${colors.gold};
    color: ${colors.dark};
    border-radius: 5px;
    width: 100px;
    opacity: ${(props) => (props.isEditOpen ? 1 : 0)};
    transition: 200ms;
    transform: translateX(${(props) => (props.isEditOpen ? 0 : 150)}px);

    & div {
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 50px;
        user-select: none;
    }
`;
export const UpdateBtn = styled.div`
    width: 100%;
`;

export const RequestTitle = styled.div`
    font-size: 1.3rem;
    font-weight: 700;
    margin-bottom: 0.3rem;
`;
export const RequestDate = styled.div`
    font-size: 0.8rem;
    margin-bottom: 1rem;
`;

export const RequestLocationBox = styled.div`
    margin-bottom: 1rem;
    font-size: 0.9rem;
    div:nth-of-type(1) {
        margin-bottom: 0.2rem;
    }
    div:nth-of-type(2) {
        display: flex;
        flex-direction: column;
    }
`;

export const RequestContents = styled.div`
    line-height: 1.1rem;
    margin-bottom: 3rem;
`;
export const RequestBottomBox = styled.div`
    position: fixed;
    bottom: 10vh;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 350px;
    max-width: 390px;
    padding: 0 20px;
    height: 4rem;
    transform: translateX(-19.5px);
    background-color: ${colors.white};
    box-shadow: rgba(0, 0, 0, 0.13) 0px 1px 2px 0px inset;
`;
export const RequestReward = styled.div`
    font-size: 1.2rem;
    font-weight: 700;
`;
export const RequestChatBox = styled.div<{ isChatOpen: boolean }>`
    user-select: none;
    padding: 10px;
    color: ${(props) => (props.isChatOpen ? colors.lightDark : colors.gold)};
    background-color: ${colors.lightDark};
    border-radius: 10px;
`;
export const ChatListOpenBtn = styled.div`
    cursor: pointer;
    width: fit-content;
`;

export const EndBtn = styled.div`
    cursor: pointer;
`;

export const ChatBtn = styled.div`
    cursor: pointer;
`;

export const ChatList = styled.div<{ isChatOpen: boolean }>`
    position: absolute;
    width: 390px;
    min-height: 10%;
    bottom: 0;
    background-color: ${colors.lightDark};
    color: ${(props) => (props.isChatOpen ? colors.white : colors.lightDark)};
    display: flex;
    flex-direction: column;
    transform: translate(
        -20px,
        ${(props) => (props.isChatOpen ? `0` : `200px`)}
    );
    opacity: ${(props) => (props.isChatOpen ? 1 : 0)};
    z-index: ${(props) => (props.isChatOpen ? 10 : -99)};
    transition: 300ms;
`;
export const ChatCount = styled.div`
    margin: 10px 0 10px 10px;
    & span {
        color: ${colors.gold};
    }
`;
export const Chat = styled.div<{ isChatOpen: boolean }>`
    max-width: 100%;
    display: flex;
    padding: 1rem;
    align-items: center;
    border-top: ${(props) =>
        props.isChatOpen ? `0.1px solid ${colors.gold}` : ''};
    cursor: pointer;
`;

export const NickName = styled.div`
    margin-right: 10px;
`;

export const LastChatText = styled.div``;

export const DeleteBtn = styled.div`
    cursor: pointer;
`;
