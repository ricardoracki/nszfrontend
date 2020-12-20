import styled from 'styled-components';

export const Container = styled.ul`
    margin-top: 20px;
    height: 200px;
    overflow: scroll;
    overflow-x: hidden;

    li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #444;

        & + li {/*aplica apartir da segunda li */
            margin-top: 15px;
        }
    }
`;

export const FileInfo = styled.div`
    display: flex;
    align-items: center;

    div {
        display: flex;
        flex-direction: column;

        span {
            font-size: 120x;
            color: #999;
            margin-top: 5px;

            button {
                border: 0;
                background: transparent;
                color: #e5e5e5;
                margin-left: 5px;
                cursor: pointer;
            }
        }
    }
`;

export const Preview = styled.div`
    width: 36px;
    height: 36px;
    border-radius: 5px;
    background-image: url(${props => props.src});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50% 50%;
    margin-right: 10px;
`;