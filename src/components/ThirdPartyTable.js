import { useState } from "react";
import Table from "./Table";

function ThirdPartyTable({ id, headings, items }) {
  const [view, setView] = useState("entity");
  const [thirdPartyHeadings, setThirdPartyHeadings] = useState([...headings]);
  const [thirdPartyItems, setThirdPartyItems] = useState([...items]);

  function changeView() {
    if (view === "entity") {
      setView("script");
      setThirdPartyHeadings([
        { key: "url", text: "URL" },
        { key: "mainThreadTime", text: "Main Thread Time" },
        { key: "blockingTime", text: "Blocking Time" },
        { key: "transferSize", text: "Transfer Size" },
      ]);
      setThirdPartyItems(
        items.reduce((arr, item) => {
          if (item.subItems && item.subItems.items) {
            return arr.concat(item.subItems.items.filter(item => item.url !== 'Other resources'));
          }
          return arr;
        }, [])
      );
    } else {
      setView("entity");
      setThirdPartyHeadings([...headings]);
      setThirdPartyItems([...items]);
    }
  }

  return (<>
    <Table id={id} headings={thirdPartyHeadings} items={thirdPartyItems} />
    <button onClick={changeView}>changeView</button>
    </>
  );
}

export default ThirdPartyTable;
