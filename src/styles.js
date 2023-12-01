import { css } from 'lit';


const gaps = css`
  .gap-x-4 {
    column-gap: 1rem;
  }
  .gap-15 {
    gap: 3.75rem; /* 60px */
  }
  .gap-10 {
    gap: 2.5rem; /* 40px */
  }
  .gap-8 {
    gap: 2rem;
  }
  .gap-7 {
    gap: 1.75rem;
  }
  .gap-6 {
    gap: 1.5rem;
  }
  .gap-5 {
    gap: 1.25rem;
  }
  .gap-4 {
    gap: 1rem;
  }
  .gap-3 {
    gap: 0.75rem;
  }
  .gap-2 {
    gap: 0.5rem;
  }
  .gap-1 {
    gap: 0.25rem;
  }
  .gap-0 {
    gap: 0;
  }
`
const flex = css`
  .flex-center {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .flex-start {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  .flex-end {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .flex-between {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  .flex {
    display: flex;
  }
  .flex-1 {
    flex: 1;
  }
  .flexw {
    display: flex;
    flex-wrap: wrap;
  }
  .flex-wrap {
    flex-wrap: wrap;
  }
  .flex-no-wrap {
    flex-wrap: nowrap;
  }
  .flex-row {
    flex-direction: row;
  }
  .flex-col {
    flex-direction: column;
  }
  .justify-between {
    justify-content: space-between;
  }
  .justify-center {
    justify-content: center;
  }
  .no-wrap {
    flex-wrap: nowrap !important;
  }
  .wrap {
    flex-wrap: wrap;
  }
  .items-center {
    align-items: center;
  }
  .items-start {
    align-items: flex-start;
  }
  .items-end {
    align-items: flex-end;
  }
`;

export const sharedStyles = css`
  ${flex}
  ${gaps}
  .main {
    min-width: 400px;
    min-height: 500px;

    background-color: var(--background-color);
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

  #divider {
    /* margin-top:1px; */
    /* margin-bottom:1px; */
    width: 100%;
    border-top: 1px solid #e5e4e2;
    margin-top: 10px;
    margin-bottom: 10px;
  }
`;


const spacing = css`
  .m-0 {
    margin: 0 !important;
  }

  .mt-0 {
    margin-top: 0 !important;
  }

  .mr-0 {
    margin-right: 0 !important;
  }

  .mb-0 {
    margin-bottom: 0 !important;
  }

  .ml-0 {
    margin-left: 0 !important;
  }

  .my-0 {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
  }

  .mx-0 {
    margin-right: 0 !important;
    margin-left: 0 !important;
  }

  .m-1 {
    margin: 0.25rem !important;
  }

  .mt-1 {
    margin-top: 0.25rem !important;
  }

  .mr-1 {
    margin-right: 0.25rem !important;
  }

  .mb-1 {
    margin-bottom: 0.25rem !important;
  }

  .ml-1 {
    margin-left: 0.25rem !important;
  }

  .my-1 {
    margin-top: 0.25rem !important;
    margin-bottom: 0.25rem !important;
  }

  .mx-1 {
    margin-right: 0.25rem !important;
    margin-left: 0.25rem !important;
  }

  .m-2 {
    margin: 0.5rem !important;
  }

  .mt-2 {
    margin-top: 0.5rem !important;
  }

  .mr-2 {
    margin-right: 0.5rem !important;
  }

  .mb-2 {
    margin-bottom: 0.5rem !important;
  }

  .ml-2 {
    margin-left: 0.5rem !important;
  }

  .my-2 {
    margin-top: 0.5rem !important;
    margin-bottom: 0.5rem !important;
  }

  .mx-2 {
    margin-right: 0.5rem !important;
    margin-left: 0.5rem !important;
  }

  .m-3 {
    margin: 0.75rem !important;
  }

  .mt-3 {
    margin-top: 0.75rem !important;
  }

  .mr-3 {
    margin-right: 0.75rem !important;
  }

  .mb-3 {
    margin-bottom: 0.75rem !important;
  }

  .ml-3 {
    margin-left: 0.75rem !important;
  }

  .my-3 {
    margin-top: 0.75rem !important;
    margin-bottom: 0.75rem !important;
  }

  .mx-3 {
    margin-right: 0.75rem !important;
    margin-left: 0.75rem !important;
  }

  .m-4 {
    margin: 1rem !important;
  }

  .mt-4 {
    margin-top: 1rem !important;
  }

  .mr-4 {
    margin-right: 1rem !important;
  }

  .mb-4 {
    margin-bottom: 1rem !important;
  }

  .ml-4 {
    margin-left: 1rem !important;
  }

  .my-4 {
    margin-top: 1rem !important;
    margin-bottom: 1rem !important;
  }

  .mx-4 {
    margin-right: 1rem !important;
    margin-left: 1rem !important;
  }

  .m-5 {
    margin: 1.25rem !important;
  }

  .mt-5 {
    margin-top: 1.25rem !important;
  }

  .mr-5 {
    margin-right: 1.25rem !important;
  }

  .mb-5 {
    margin-bottom: 1.25rem !important;
  }

  .ml-5 {
    margin-left: 1.25rem !important;
  }

  .my-5 {
    margin-top: 1.25rem !important;
    margin-bottom: 1.25rem !important;
  }

  .mx-5 {
    margin-right: 1.25rem !important;
    margin-left: 1.25rem !important;
  }

  .m-6 {
    margin: 1.5rem !important;
  }

  .mt-6 {
    margin-top: 1.5rem !important;
  }

  .mr-6 {
    margin-right: 1.5rem !important;
  }

  .mb-6 {
    margin-bottom: 1.5rem !important;
  }

  .ml-6 {
    margin-left: 1.5rem !important;
  }

  .my-6 {
    margin-top: 1.5rem !important;
    margin-bottom: 1.5rem !important;
  }

  .mx-6 {
    margin-right: 1.5rem !important;
    margin-left: 1.5rem !important;
  }

  .m-7 {
    margin: 1.75rem !important;
  }

  .mt-7 {
    margin-top: 1.75rem !important;
  }

  .mr-7 {
    margin-right: 1.75rem !important;
  }

  .mb-7 {
    margin-bottom: 1.75rem !important;
  }

  .ml-7 {
    margin-left: 1.75rem !important;
  }

  .my-7 {
    margin-top: 1.75rem !important;
    margin-bottom: 1.75rem !important;
  }

  .mx-7 {
    margin-right: 1.75rem !important;
    margin-left: 1.75rem !important;
  }

  .m-8 {
    margin: 2rem !important;
  }

  .mt-8 {
    margin-top: 2rem !important;
  }

  .mr-8 {
    margin-right: 2rem !important;
  }

  .mb-8 {
    margin-bottom: 2rem !important;
  }

  .ml-8 {
    margin-left: 2rem !important;
  }

  .my-8 {
    margin-top: 2rem !important;
    margin-bottom: 2rem !important;
  }

  .mx-8 {
    margin-right: 2rem !important;
    margin-left: 2rem !important;
  }

  .m-9 {
    margin: 2.25rem !important;
  }

  .mt-9 {
    margin-top: 2.25rem !important;
  }

  .mr-9 {
    margin-right: 2.25rem !important;
  }

  .mb-9 {
    margin-bottom: 2.25rem !important;
  }

  .ml-9 {
    margin-left: 2.25rem !important;
  }

  .my-9 {
    margin-top: 2.25rem !important;
    margin-bottom: 2.25rem !important;
  }

  .mx-9 {
    margin-right: 2.25rem !important;
    margin-left: 2.25rem !important;
  }

  .m-10 {
    margin: 2.5rem !important;
  }

  .mt-10 {
    margin-top: 2.5rem !important;
  }

  .mr-10 {
    margin-right: 2.5rem !important;
  }

  .mb-10 {
    margin-bottom: 2.5rem !important;
  }

  .ml-10 {
    margin-left: 2.5rem !important;
  }

  .my-10 {
    margin-top: 2.5rem !important;
    margin-bottom: 2.5rem !important;
  }

  .mx-10 {
    margin-right: 2.5rem !important;
    margin-left: 2.5rem !important;
  }

  .m-11 {
    margin: 2.75rem !important;
  }

  .mt-11 {
    margin-top: 2.75rem !important;
  }

  .mr-11 {
    margin-right: 2.75rem !important;
  }

  .mb-11 {
    margin-bottom: 2.75rem !important;
  }

  .ml-11 {
    margin-left: 2.75rem !important;
  }

  .my-11 {
    margin-top: 2.75rem !important;
    margin-bottom: 2.75rem !important;
  }

  .mx-11 {
    margin-right: 2.75rem !important;
    margin-left: 2.75rem !important;
  }

  .m-12 {
    margin: 3rem !important;
  }

  .mt-12 {
    margin-top: 3rem !important;
  }

  .mr-12 {
    margin-right: 3rem !important;
  }

  .mb-12 {
    margin-bottom: 3rem !important;
  }

  .ml-12 {
    margin-left: 3rem !important;
  }

  .my-12 {
    margin-top: 3rem !important;
    margin-bottom: 3rem !important;
  }

  .mx-12 {
    margin-right: 3rem !important;
    margin-left: 3rem !important;
  }

  .m-25 {
    margin: 6.25rem !important;
  }

  .mt-25 {
    margin-top: 6.25rem !important;
  }

  .mr-25 {
    margin-right: 6.25rem !important;
  }

  .mb-25 {
    margin-bottom: 6.25rem !important;
  }

  .ml-25 {
    margin-left: 6.25rem !important;
  }

  .my-25 {
    margin-top: 6.25rem !important;
    margin-bottom: 6.25rem !important;
  }

  .mx-25 {
    margin-right: 6.25rem !important;
    margin-left: 6.25rem !important;
  }

  .p-0 {
    padding: 0 !important;
  }

  .pt-0 {
    padding-top: 0 !important;
  }

  .pr-0 {
    padding-right: 0 !important;
  }

  .pb-0 {
    padding-bottom: 0 !important;
  }

  .pl-0 {
    padding-left: 0 !important;
  }

  .py-0 {
    padding-top: 0 !important;
    padding-bottom: 0 !important;
  }

  .px-0 {
    padding-right: 0 !important;
    padding-left: 0 !important;
  }

  .p-1 {
    padding: 0.25rem !important;
  }

  .pt-1 {
    padding-top: 0.25rem !important;
  }

  .pr-1 {
    padding-right: 0.25rem !important;
  }

  .pb-1 {
    padding-bottom: 0.25rem !important;
  }

  .pl-1 {
    padding-left: 0.25rem !important;
  }

  .py-1 {
    padding-top: 0.25rem !important;
    padding-bottom: 0.25rem !important;
  }

  .px-1 {
    padding-right: 0.25rem !important;
    padding-left: 0.25rem !important;
  }

  .p-2 {
    padding: 0.5rem !important;
  }

  .pt-2 {
    padding-top: 0.5rem !important;
  }

  .pr-2 {
    padding-right: 0.5rem !important;
  }

  .pb-2 {
    padding-bottom: 0.5rem !important;
  }

  .pl-2 {
    padding-left: 0.5rem !important;
  }

  .py-2 {
    padding-top: 0.5rem !important;
    padding-bottom: 0.5rem !important;
  }

  .px-2 {
    padding-right: 0.5rem !important;
    padding-left: 0.5rem !important;
  }

  .p-3 {
    padding: 0.75rem !important;
  }

  .pt-3 {
    padding-top: 0.75rem !important;
  }

  .pr-3 {
    padding-right: 0.75rem !important;
  }

  .pb-3 {
    padding-bottom: 0.75rem !important;
  }

  .pl-3 {
    padding-left: 0.75rem !important;
  }

  .py-3 {
    padding-top: 0.75rem !important;
    padding-bottom: 0.75rem !important;
  }

  .px-3 {
    padding-right: 0.75rem !important;
    padding-left: 0.75rem !important;
  }

  .p-4 {
    padding: 1rem !important;
  }

  .pt-4 {
    padding-top: 1rem !important;
  }

  .pr-4 {
    padding-right: 1rem !important;
  }

  .pb-4 {
    padding-bottom: 1rem !important;
  }

  .pl-4 {
    padding-left: 1rem !important;
  }

  .py-4 {
    padding-top: 1rem !important;
    padding-bottom: 1rem !important;
  }

  .px-4 {
    padding-right: 1rem !important;
    padding-left: 1rem !important;
  }

  .p-5 {
    padding: 1.25rem !important;
  }

  .pt-5 {
    padding-top: 1.25rem !important;
  }

  .pr-5 {
    padding-right: 1.25rem !important;
  }

  .pb-5 {
    padding-bottom: 1.25rem !important;
  }

  .pl-5 {
    padding-left: 1.25rem !important;
  }

  .py-5 {
    padding-top: 1.25rem !important;
    padding-bottom: 1.25rem !important;
  }

  .px-5 {
    padding-right: 1.25rem !important;
    padding-left: 1.25rem !important;
  }

  .p-6 {
    padding: 1.5rem !important;
  }

  .pt-6 {
    padding-top: 1.5rem !important;
  }

  .pr-6 {
    padding-right: 1.5rem !important;
  }

  .pb-6 {
    padding-bottom: 1.5rem !important;
  }

  .pl-6 {
    padding-left: 1.5rem !important;
  }

  .py-6 {
    padding-top: 1.5rem !important;
    padding-bottom: 1.5rem !important;
  }

  .px-6 {
    padding-right: 1.5rem !important;
    padding-left: 1.5rem !important;
  }

  .p-7 {
    padding: 1.75rem !important;
  }

  .pt-7 {
    padding-top: 1.75rem !important;
  }

  .pr-7 {
    padding-right: 1.75rem !important;
  }

  .pb-7 {
    padding-bottom: 1.75rem !important;
  }

  .pl-7 {
    padding-left: 1.75rem !important;
  }

  .py-7 {
    padding-top: 1.75rem !important;
    padding-bottom: 1.75rem !important;
  }

  .px-7 {
    padding-right: 1.75rem !important;
    padding-left: 1.75rem !important;
  }

  .p-8 {
    padding: 2rem !important;
  }

  .pt-8 {
    padding-top: 2rem !important;
  }

  .pr-8 {
    padding-right: 2rem !important;
  }

  .pb-8 {
    padding-bottom: 2rem !important;
  }

  .pl-8 {
    padding-left: 2rem !important;
  }

  .py-8 {
    padding-top: 2rem !important;
    padding-bottom: 2rem !important;
  }

  .px-8 {
    padding-right: 2rem !important;
    padding-left: 2rem !important;
  }

  .p-9 {
    padding: 2.25rem !important;
  }

  .pt-9 {
    padding-top: 2.25rem !important;
  }

  .pr-9 {
    padding-right: 2.25rem !important;
  }

  .pb-9 {
    padding-bottom: 2.25rem !important;
  }

  .pl-9 {
    padding-left: 2.25rem !important;
  }

  .py-9 {
    padding-top: 2.25rem !important;
    padding-bottom: 2.25rem !important;
  }

  .px-9 {
    padding-right: 2.25rem !important;
    padding-left: 2.25rem !important;
  }

  .p-10 {
    padding: 2.5rem !important;
  }

  .pt-10 {
    padding-top: 2.5rem !important;
  }

  .pr-10 {
    padding-right: 2.5rem !important;
  }

  .pb-10 {
    padding-bottom: 2.5rem !important;
  }

  .pl-10 {
    padding-left: 2.5rem !important;
  }

  .py-10 {
    padding-top: 2.5rem !important;
    padding-bottom: 2.5rem !important;
  }

  .px-10 {
    padding-right: 2.5rem !important;
    padding-left: 2.5rem !important;
  }

  .p-11 {
    padding: 2.75rem !important;
  }

  .pt-11 {
    padding-top: 2.75rem !important;
  }

  .pr-11 {
    padding-right: 2.75rem !important;
  }

  .pb-11 {
    padding-bottom: 2.75rem !important;
  }

  .pl-11 {
    padding-left: 2.75rem !important;
  }

  .py-11 {
    padding-top: 2.75rem !important;
    padding-bottom: 2.75rem !important;
  }

  .px-11 {
    padding-right: 2.75rem !important;
    padding-left: 2.75rem !important;
  }

  .p-12 {
    padding: 3rem !important;
  }

  .pt-12 {
    padding-top: 3rem !important;
  }

  .pr-12 {
    padding-right: 3rem !important;
  }

  .pb-12 {
    padding-bottom: 3rem !important;
  }

  .pl-12 {
    padding-left: 3rem !important;
  }

  .py-12 {
    padding-top: 3rem !important;
    padding-bottom: 3rem !important;
  }

  .px-12 {
    padding-right: 3rem !important;
    padding-left: 3rem !important;
  }

  .py-16 {
    padding-top: 4rem !important;
    padding-bottom: 4rem !important;
  }

  .p-25 {
    padding: 6.25rem !important;
  }

  .pt-25 {
    padding-top: 6.25rem !important;
  }

  .pr-25 {
    padding-right: 6.25rem !important;
  }

  .pb-25 {
    padding-bottom: 6.25rem !important;
  }

  .pl-25 {
    padding-left: 6.25rem !important;
  }

  .py-25 {
    padding-top: 6.25rem !important;
    padding-bottom: 6.25rem !important;
  }

  .px-25 {
    padding-right: 6.25rem !important;
    padding-left: 6.25rem !important;
  }
  .ml-auto {
    margin-left: auto;
  }
  .mr-auto {
    margin-right: auto;
  }
  .m-start-auto {
    margin-inline-start: auto;
  }
  .m-auto {
    margin: auto;
  }

  @media screen and (max-width: 767px) {
    .m-0-mobile {
      margin: 0 !important;
    }

    .mt-0-mobile {
      margin-top: 0 !important;
    }

    .mr-0-mobile {
      margin-right: 0 !important;
    }

    .mb-0-mobile {
      margin-bottom: 0 !important;
    }

    .ml-0-mobile {
      margin-left: 0 !important;
    }

    .my-0-mobile {
      margin-top: 0 !important;
      margin-bottom: 0 !important;
    }

    .mx-0-mobile {
      margin-right: 0 !important;
      margin-left: 0 !important;
    }

    .m-1-mobile {
      margin: 0.25rem !important;
    }

    .mt-1-mobile {
      margin-top: 0.25rem !important;
    }

    .mr-1-mobile {
      margin-right: 0.25rem !important;
    }

    .mb-1-mobile {
      margin-bottom: 0.25rem !important;
    }

    .ml-1-mobile {
      margin-left: 0.25rem !important;
    }

    .my-1-mobile {
      margin-top: 0.25rem !important;
      margin-bottom: 0.25rem !important;
    }

    .mx-1-mobile {
      margin-right: 0.25rem !important;
      margin-left: 0.25rem !important;
    }

    .m-2-mobile {
      margin: 0.5rem !important;
    }

    .mt-2-mobile {
      margin-top: 0.5rem !important;
    }

    .mr-2-mobile {
      margin-right: 0.5rem !important;
    }

    .mb-2-mobile {
      margin-bottom: 0.5rem !important;
    }

    .ml-2-mobile {
      margin-left: 0.5rem !important;
    }

    .my-2-mobile {
      margin-top: 0.5rem !important;
      margin-bottom: 0.5rem !important;
    }

    .mx-2-mobile {
      margin-right: 0.5rem !important;
      margin-left: 0.5rem !important;
    }

    .m-3-mobile {
      margin: 0.75rem !important;
    }

    .mt-3-mobile {
      margin-top: 0.75rem !important;
    }

    .mr-3-mobile {
      margin-right: 0.75rem !important;
    }

    .mb-3-mobile {
      margin-bottom: 0.75rem !important;
    }

    .ml-3-mobile {
      margin-left: 0.75rem !important;
    }

    .my-3-mobile {
      margin-top: 0.75rem !important;
      margin-bottom: 0.75rem !important;
    }

    .mx-3-mobile {
      margin-right: 0.75rem !important;
      margin-left: 0.75rem !important;
    }

    .m-4-mobile {
      margin: 1rem !important;
    }

    .mt-4-mobile {
      margin-top: 1rem !important;
    }

    .mr-4-mobile {
      margin-right: 1rem !important;
    }

    .mb-4-mobile {
      margin-bottom: 1rem !important;
    }

    .ml-4-mobile {
      margin-left: 1rem !important;
    }

    .my-4-mobile {
      margin-top: 1rem !important;
      margin-bottom: 1rem !important;
    }

    .mx-4-mobile {
      margin-right: 1rem !important;
      margin-left: 1rem !important;
    }

    .m-5-mobile {
      margin: 1.25rem !important;
    }

    .mt-5-mobile {
      margin-top: 1.25rem !important;
    }

    .mr-5-mobile {
      margin-right: 1.25rem !important;
    }

    .mb-5-mobile {
      margin-bottom: 1.25rem !important;
    }

    .ml-5-mobile {
      margin-left: 1.25rem !important;
    }

    .my-5-mobile {
      margin-top: 1.25rem !important;
      margin-bottom: 1.25rem !important;
    }

    .mx-5-mobile {
      margin-right: 1.25rem !important;
      margin-left: 1.25rem !important;
    }

    .m-6-mobile {
      margin: 1.5rem !important;
    }

    .mt-6-mobile {
      margin-top: 1.5rem !important;
    }

    .mr-6-mobile {
      margin-right: 1.5rem !important;
    }

    .mb-6-mobile {
      margin-bottom: 1.5rem !important;
    }

    .ml-6-mobile {
      margin-left: 1.5rem !important;
    }

    .my-6-mobile {
      margin-top: 1.5rem !important;
      margin-bottom: 1.5rem !important;
    }

    .mx-6-mobile {
      margin-right: 1.5rem !important;
      margin-left: 1.5rem !important;
    }

    .m-7-mobile {
      margin: 1.75rem !important;
    }

    .mt-7-mobile {
      margin-top: 1.75rem !important;
    }

    .mr-7-mobile {
      margin-right: 1.75rem !important;
    }

    .mb-7-mobile {
      margin-bottom: 1.75rem !important;
    }

    .ml-7-mobile {
      margin-left: 1.75rem !important;
    }

    .my-7-mobile {
      margin-top: 1.75rem !important;
      margin-bottom: 1.75rem !important;
    }

    .mx-7-mobile {
      margin-right: 1.75rem !important;
      margin-left: 1.75rem !important;
    }

    .m-8-mobile {
      margin: 2rem !important;
    }

    .mt-8-mobile {
      margin-top: 2rem !important;
    }

    .mr-8-mobile {
      margin-right: 2rem !important;
    }

    .mb-8-mobile {
      margin-bottom: 2rem !important;
    }

    .ml-8-mobile {
      margin-left: 2rem !important;
    }

    .my-8-mobile {
      margin-top: 2rem !important;
      margin-bottom: 2rem !important;
    }

    .mx-8-mobile {
      margin-right: 2rem !important;
      margin-left: 2rem !important;
    }

    .m-9-mobile {
      margin: 2.25rem !important;
    }

    .mt-9-mobile {
      margin-top: 2.25rem !important;
    }

    .mr-9-mobile {
      margin-right: 2.25rem !important;
    }

    .mb-9-mobile {
      margin-bottom: 2.25rem !important;
    }

    .ml-9-mobile {
      margin-left: 2.25rem !important;
    }

    .my-9-mobile {
      margin-top: 2.25rem !important;
      margin-bottom: 2.25rem !important;
    }

    .mx-9-mobile {
      margin-right: 2.25rem !important;
      margin-left: 2.25rem !important;
    }

    .m-10-mobile {
      margin: 2.5rem !important;
    }

    .mt-10-mobile {
      margin-top: 2.5rem !important;
    }

    .mr-10-mobile {
      margin-right: 2.5rem !important;
    }

    .mb-10-mobile {
      margin-bottom: 2.5rem !important;
    }

    .ml-10-mobile {
      margin-left: 2.5rem !important;
    }

    .my-10-mobile {
      margin-top: 2.5rem !important;
      margin-bottom: 2.5rem !important;
    }

    .mx-10-mobile {
      margin-right: 2.5rem !important;
      margin-left: 2.5rem !important;
    }

    .m-11-mobile {
      margin: 2.75rem !important;
    }

    .mt-11-mobile {
      margin-top: 2.75rem !important;
    }

    .mr-11-mobile {
      margin-right: 2.75rem !important;
    }

    .mb-11-mobile {
      margin-bottom: 2.75rem !important;
    }

    .ml-11-mobile {
      margin-left: 2.75rem !important;
    }

    .my-11-mobile {
      margin-top: 2.75rem !important;
      margin-bottom: 2.75rem !important;
    }

    .mx-11-mobile {
      margin-right: 2.75rem !important;
      margin-left: 2.75rem !important;
    }

    .m-12-mobile {
      margin: 3rem !important;
    }

    .mt-12-mobile {
      margin-top: 3rem !important;
    }

    .mr-12-mobile {
      margin-right: 3rem !important;
    }

    .mb-12-mobile {
      margin-bottom: 3rem !important;
    }

    .ml-12-mobile {
      margin-left: 3rem !important;
    }

    .my-12-mobile {
      margin-top: 3rem !important;
      margin-bottom: 3rem !important;
    }

    .mx-12-mobile {
      margin-right: 3rem !important;
      margin-left: 3rem !important;
    }

    .m-25-mobile {
      margin: 6.25rem !important;
    }

    .mt-25-mobile {
      margin-top: 6.25rem !important;
    }

    .mr-25-mobile {
      margin-right: 6.25rem !important;
    }

    .mb-25-mobile {
      margin-bottom: 6.25rem !important;
    }

    .ml-25-mobile {
      margin-left: 6.25rem !important;
    }

    .my-25-mobile {
      margin-top: 6.25rem !important;
      margin-bottom: 6.25rem !important;
    }

    .mx-25-mobile {
      margin-right: 6.25rem !important;
      margin-left: 6.25rem !important;
    }

    .p-0-mobile {
      padding: 0 !important;
    }

    .pt-0-mobile {
      padding-top: 0 !important;
    }

    .pr-0-mobile {
      padding-right: 0 !important;
    }

    .pb-0-mobile {
      padding-bottom: 0 !important;
    }

    .pl-0-mobile {
      padding-left: 0 !important;
    }

    .py-0-mobile {
      padding-top: 0 !important;
      padding-bottom: 0 !important;
    }

    .px-0-mobile {
      padding-right: 0 !important;
      padding-left: 0 !important;
    }

    .p-1-mobile {
      padding: 0.25rem !important;
    }

    .pt-1-mobile {
      padding-top: 0.25rem !important;
    }

    .pr-1-mobile {
      padding-right: 0.25rem !important;
    }

    .pb-1-mobile {
      padding-bottom: 0.25rem !important;
    }

    .pl-1-mobile {
      padding-left: 0.25rem !important;
    }

    .py-1-mobile {
      padding-top: 0.25rem !important;
      padding-bottom: 0.25rem !important;
    }

    .px-1-mobile {
      padding-right: 0.25rem !important;
      padding-left: 0.25rem !important;
    }

    .p-2-mobile {
      padding: 0.5rem !important;
    }

    .pt-2-mobile {
      padding-top: 0.5rem !important;
    }

    .pr-2-mobile {
      padding-right: 0.5rem !important;
    }

    .pb-2-mobile {
      padding-bottom: 0.5rem !important;
    }

    .pl-2-mobile {
      padding-left: 0.5rem !important;
    }

    .py-2-mobile {
      padding-top: 0.5rem !important;
      padding-bottom: 0.5rem !important;
    }

    .px-2-mobile {
      padding-right: 0.5rem !important;
      padding-left: 0.5rem !important;
    }

    .p-3-mobile {
      padding: 0.75rem !important;
    }

    .pt-3-mobile {
      padding-top: 0.75rem !important;
    }

    .pr-3-mobile {
      padding-right: 0.75rem !important;
    }

    .pb-3-mobile {
      padding-bottom: 0.75rem !important;
    }

    .pl-3-mobile {
      padding-left: 0.75rem !important;
    }

    .py-3-mobile {
      padding-top: 0.75rem !important;
      padding-bottom: 0.75rem !important;
    }

    .px-3-mobile {
      padding-right: 0.75rem !important;
      padding-left: 0.75rem !important;
    }

    .p-4-mobile {
      padding: 1rem !important;
    }

    .pt-4-mobile {
      padding-top: 1rem !important;
    }

    .pr-4-mobile {
      padding-right: 1rem !important;
    }

    .pb-4-mobile {
      padding-bottom: 1rem !important;
    }

    .pl-4-mobile {
      padding-left: 1rem !important;
    }

    .py-4-mobile {
      padding-top: 1rem !important;
      padding-bottom: 1rem !important;
    }

    .px-4-mobile {
      padding-right: 1rem !important;
      padding-left: 1rem !important;
    }

    .p-5-mobile {
      padding: 1.25rem !important;
    }

    .pt-5-mobile {
      padding-top: 1.25rem !important;
    }

    .pr-5-mobile {
      padding-right: 1.25rem !important;
    }

    .pb-5-mobile {
      padding-bottom: 1.25rem !important;
    }

    .pl-5-mobile {
      padding-left: 1.25rem !important;
    }

    .py-5-mobile {
      padding-top: 1.25rem !important;
      padding-bottom: 1.25rem !important;
    }

    .px-5-mobile {
      padding-right: 1.25rem !important;
      padding-left: 1.25rem !important;
    }

    .p-6-mobile {
      padding: 1.5rem !important;
    }

    .pt-6-mobile {
      padding-top: 1.5rem !important;
    }

    .pr-6-mobile {
      padding-right: 1.5rem !important;
    }

    .pb-6-mobile {
      padding-bottom: 1.5rem !important;
    }

    .pl-6-mobile {
      padding-left: 1.5rem !important;
    }

    .py-6-mobile {
      padding-top: 1.5rem !important;
      padding-bottom: 1.5rem !important;
    }

    .px-6-mobile {
      padding-right: 1.5rem !important;
      padding-left: 1.5rem !important;
    }

    .p-7-mobile {
      padding: 1.75rem !important;
    }

    .pt-7-mobile {
      padding-top: 1.75rem !important;
    }

    .pr-7-mobile {
      padding-right: 1.75rem !important;
    }

    .pb-7-mobile {
      padding-bottom: 1.75rem !important;
    }

    .pl-7-mobile {
      padding-left: 1.75rem !important;
    }

    .py-7-mobile {
      padding-top: 1.75rem !important;
      padding-bottom: 1.75rem !important;
    }

    .px-7-mobile {
      padding-right: 1.75rem !important;
      padding-left: 1.75rem !important;
    }

    .p-8-mobile {
      padding: 2rem !important;
    }

    .pt-8-mobile {
      padding-top: 2rem !important;
    }

    .pr-8-mobile {
      padding-right: 2rem !important;
    }

    .pb-8-mobile {
      padding-bottom: 2rem !important;
    }

    .pl-8-mobile {
      padding-left: 2rem !important;
    }

    .py-8-mobile {
      padding-top: 2rem !important;
      padding-bottom: 2rem !important;
    }

    .px-8-mobile {
      padding-right: 2rem !important;
      padding-left: 2rem !important;
    }

    .p-9-mobile {
      padding: 2.25rem !important;
    }

    .pt-9-mobile {
      padding-top: 2.25rem !important;
    }

    .pr-9-mobile {
      padding-right: 2.25rem !important;
    }

    .pb-9-mobile {
      padding-bottom: 2.25rem !important;
    }

    .pl-9-mobile {
      padding-left: 2.25rem !important;
    }

    .py-9-mobile {
      padding-top: 2.25rem !important;
      padding-bottom: 2.25rem !important;
    }

    .px-9-mobile {
      padding-right: 2.25rem !important;
      padding-left: 2.25rem !important;
    }

    .p-10-mobile {
      padding: 2.5rem !important;
    }

    .pt-10-mobile {
      padding-top: 2.5rem !important;
    }

    .pr-10-mobile {
      padding-right: 2.5rem !important;
    }

    .pb-10-mobile {
      padding-bottom: 2.5rem !important;
    }

    .pl-10-mobile {
      padding-left: 2.5rem !important;
    }

    .py-10-mobile {
      padding-top: 2.5rem !important;
      padding-bottom: 2.5rem !important;
    }

    .px-10-mobile {
      padding-right: 2.5rem !important;
      padding-left: 2.5rem !important;
    }

    .p-11-mobile {
      padding: 2.75rem !important;
    }

    .pt-11-mobile {
      padding-top: 2.75rem !important;
    }

    .pr-11-mobile {
      padding-right: 2.75rem !important;
    }

    .pb-11-mobile {
      padding-bottom: 2.75rem !important;
    }

    .pl-11-mobile {
      padding-left: 2.75rem !important;
    }

    .py-11-mobile {
      padding-top: 2.75rem !important;
      padding-bottom: 2.75rem !important;
    }

    .px-11-mobile {
      padding-right: 2.75rem !important;
      padding-left: 2.75rem !important;
    }

    .p-12-mobile {
      padding: 3rem !important;
    }

    .pt-12-mobile {
      padding-top: 3rem !important;
    }

    .pr-12-mobile {
      padding-right: 3rem !important;
    }

    .pb-12-mobile {
      padding-bottom: 3rem !important;
    }

    .pl-12-mobile {
      padding-left: 3rem !important;
    }

    .py-12-mobile {
      padding-top: 3rem !important;
      padding-bottom: 3rem !important;
    }

    .px-12-mobile {
      padding-right: 3rem !important;
      padding-left: 3rem !important;
    }

    .p-25-mobile {
      padding: 6.25rem !important;
    }

    .pt-25-mobile {
      padding-top: 6.25rem !important;
    }

    .pr-25-mobile {
      padding-right: 6.25rem !important;
    }

    .pb-25-mobile {
      padding-bottom: 6.25rem !important;
    }

    .pl-25-mobile {
      padding-left: 6.25rem !important;
    }

    .py-25-mobile {
      padding-top: 6.25rem !important;
      padding-bottom: 6.25rem !important;
    }

    .px-25-mobile {
      padding-right: 6.25rem !important;
      padding-left: 6.25rem !important;
    }
  }

  /*# sourceMappingURL=styles.css.map */
`