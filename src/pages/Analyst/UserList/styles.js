import styled from 'styled-components'

export const Container = styled.div`
    display: block;
    align-items: center;
    justify-content: center;
    margin-top: 0px !important;
    /* overflow: auto !important; */
    background-color: #f8f9fa !important;
    padding: 30px;
    width: 100%;
    align-items: center;
    .userListUl {
        display: grid;
        grid-gap: 24px;
        list-style: none;
    }
    
    .userListUl li {
        background: #fff;
        padding: 10px;
        padding-right: 24px;
        padding-left: 24px;
        border-radius: 8px;
        position: relative;
    }
    
    .userListUl li button {
        position: absolute;
        right: 24px;
        top: 24px;
        border: 0;
    }
    
    .userListUl li button:hover {
        opacity: 0.8;
    }
    
    .userListUl li strong {
        display: block;
        margin-bottom: 10px;
        color: #41414d;
    }
    
    .userListUl li p + strong {
        margin-top: 20px;
    }
    
    .userListUl li p {
        color: #737380;
        line-height: 21px;
        font-size: 16px;
    }
    .pagination {
        align-items: center;
        justify-content: center;
    }
    @media only screen and (max-width: 400px) {
        margin-top: 32px !important;
    }
`;