import { createBrowserRouter } from "react-router-dom";

import Kanban from "../machine_coding/kanban/Kanban";
import InfiniteScrollList from "../machine_coding/infinite_scroll/InfiniteScrollList";
import InfiniteScroll2 from "../machine_coding/infinite_scroll_2/InfiniteScroll2";
import FileSystem from "../machine_coding/file_system/FileSystem";
import TicTacToe from "../machine_coding/tic_tac_toe/TicTacToe";
import MainPage from "../pages/MainPage";

const routes = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        index: true,
        element: <MainPage />,
      },

      {
        path: "kanban",
        element: <Kanban />,
      },
      {
        path: "infinite_scroll",
        element: <InfiniteScrollList />,
      },
      {
        path: "infinite_scroll_2",
        element: <InfiniteScroll2 />,
      },
      {
        path: "file_system",
        element: <FileSystem />,
      },
      {
        path: "tic_tac_toe",
        element: <TicTacToe n={4} />,
      },
    ],
  },
]);

export default routes;
