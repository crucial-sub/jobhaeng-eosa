import styled from '@emotion/styled';

export const FilterButton = styled.button`
    flex: 3 0 0;
    height: 100%;
    text-align: center;
    border: none;
    cursor: pointer;
    user-select: none;
`;

export const FilterWrapper = styled.div`
    position: absolute;
    top: 7.5vh;
    right: 0;
    display: flex;
    width: 390px;
    height: 85vh;
    background-color: azure;
    z-index: 99;
    flex-direction: column;
    user-select: none;
`;

export const FilterList = styled.div`
    flex: 9 0 0;
    display: flex;
    overflow: auto;
`;
export const ApplyBtn = styled.div`
    flex: 1 0 0;
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    background-color: bisque;
    cursor: pointer;
`;

export const DistrictWrapper = styled.div`
    flex: 1 1 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
`;
export const DistrictItem = styled.div`
    width: 90%;
    height: 30px;
    line-height: 30px;
    text-align: center;
    cursor: pointer;
    &.clicked-dist {
        background-color: burlywood;
    }
`;

export const TownWrapper = styled.div`
    flex: 1 1 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
`;
export const TownItem = styled.div`
    width: 90%;
    height: 30px;
    line-height: 30px;
    text-align: center;
    cursor: pointer;
    &.clicked {
        background-color: burlywood;
    }
`;
