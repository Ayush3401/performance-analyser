import Navigation from "./Navigation";
import ThirdPartySummary from "./ThirdPartySummary";


function Layout({ data }) {
  return (
    <>
      <Navigation />
      <ThirdPartySummary data={data} />
    </>
  );
}

export default Layout;
