import styled from "styled-components";

export const Table = styled.div`
  width: 100%;
  padding: 1rem 0;
  background: #ffff;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  ::-webkit-scrollbar {
    width: 7px;
    height: 7px;
    background: #f3f3f3;
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb {
    background: #000;
    border-radius: 10px;
    transition: all 0.5s;
  }
  .TableContainer {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 100%;
    overflow-x: auto;
    &::-webkit-scrollbar {
      width: 7px;
      height: 7px;
      background: #bdbbbb;
      border-radius: 10px;
    }
    &::-webkit-scrollbar-thumb {
      background: #000;
      border-radius: 10px;
      transition: all 0.5s;
      &:hover {
        background: #333;
      }
    }

    .tableWrapper {
      border-collapse: collapse;
      overflow-x: auto;
      border-collapse: collapse;
      table-layout: fixed;
      /* @media (max-width: 1080px) {
        max-width: 900px;
        min-width: 900px;
      } */
      @media (max-width: 780px) {
        max-width: 600px;
        min-width: 600px;
      }

      @media (max-width: 580px) {
        max-width: 600px;
        min-width: 600px;
      }

      thead {
        tr {
          text-align: start;
          z-index: 200;
          text-align: start;
          transition: all 0.4s;
          background-color: #f5f5f5;
          border-radius: 40px;
          padding: 1rem;
          /* text-transform: uppercase; */
          font-weight: normal !important;
          &:hover {
            background-color: rgba(0, 0, 0, 0.1);
          }
          th {
            font-size: 0.8rem;
            text-align: start;
            font-size: 15px !important;
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
            padding: 1.7rem 1rem;
            font-family: "playfair";
            font-weight: normal !important;
          }
        }
      }
      .btn {
        padding: 0.4rem 1.3rem !important;
      }
      tbody {
        tr {
          transition: all 0.5s;
          z-index: 200;
          &:hover {
            background-color: rgba(0, 0, 0, 0.06);
          }
          td {
            text-align: start;
            padding: 1.6rem 1rem !important;
            font-size: 14px !important;
            border-bottom: 1px solid rgba(0, 0, 0, 0.07);
            color: #000;

            span {
              &.danger {
                color: #840a0a;
                padding: 0.56rem 1rem;
                border-radius: 4px;
                background: #f3efe5;
              }
              &.success {
                color: #28a745;
                padding: 0.56rem 1rem;
                border-radius: 4px;
                background: #dcf6d9;
              }
            }
          }

          .icons {
            width: 4rem;
            height: 4rem;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            svg {
              font-size: 1.7rem;
              cursor: pointer;
            }
            &:hover {
              background: #ddd;
            }
          }
        }
      }
    }
  }
`;
