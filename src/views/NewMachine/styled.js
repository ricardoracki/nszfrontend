import styled from 'styled-components';

export const TypesContainer = styled.div`
    display: flex;
    flex-direction: row;
    min-height: 100vh;
`;

export const TypesContent = styled.div`
    padding: 10px;
    padding-left: 210px;
    border: 1px solid #ddd;
    width: 100%;
    background-color: #bbb;
 
    max-height: 100%;
`;
/* 
export const cardContainer = styled.css`
    padding: 10px;
    margin-bottom: 5px;
`;
 */
export const ButtonGroup = styled.div`
    margin-top: 10px;
`;

export const RadioContainer = styled.div`
    margin-top: 15px;
`;

/* export const TextArea = styled.css`
    margin-top: 15px; width: 100%;
`; */

export const SelectContainer = styled.div`
    display: flex;
    flex-direction: column;
`;
/* 
export const SelectItem = styled.css`
    margin-top: 10px;
`; */
/* 
export const ImagesContainerLabel = styled.css`
    margin-top: 30px;
`;
 */
export const ImagesContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-gap: 16;
`;


