import { css } from 'lit';

export const sharedStyles = css`

  .main {
    min-width: 400px;
    min-height: 500px;

    background-color: #f5f5f5;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 1rem;
  }

  .quest-card {
    margin-top: 5px;
    min-width: 300px;
    min-height: 50px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px #cdcdcd;
    display: flex;
    justify-content: center;
    align-items: start;
    flex-direction: column;
    padding: 1rem;
    cursor: pointer;
  }

  .task-title {
    display: flex;
    font-size: 15px;
    /* text-decoration: line-through; */
    /* color: #b3b3b3; */
  }

  .timestamp {
    font-size: 12px;
    color: #b3b3b3;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .flex-between {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  #divider {
    /* margin-top:1px; */
    /* margin-bottom:1px; */
    width: 100%;
    border-top: 1px solid #e5e4e2;
    margin-top: 10px;
    margin-bottom: 10px;
  }
`;
