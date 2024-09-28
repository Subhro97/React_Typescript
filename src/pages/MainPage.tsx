import { Link } from "react-router-dom";

interface Routes {
  name: string;
  path: string;
}

const routeLinks: Array<Routes> = [
  {
    name: "Kanban",
    path: "kanban",
  },
  {
    name: "Infinite Scroll",
    path: "infinite_scroll",
  },
  {
    name: "Infinite Scroll 2",
    path: "infinite_scroll_2",
  },
  {
    name: "File System",
    path: "file_system",
  },
  {
    name: "Tic Tac Toe",
    path: "tic_tac_toe",
  },
];

const MainPage: React.FC = () => {
  return (
    <section className="main_page">
      <h1>React + TypeScript LLD</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {routeLinks.map(({ name, path }) => (
          <Link key={crypto.randomUUID()} to={path}>
            {name}
          </Link>
        ))}
      </div>
    </section>
  );
};

export default MainPage;
