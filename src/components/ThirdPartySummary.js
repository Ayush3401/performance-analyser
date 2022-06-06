import "../styles/ThirdPartySummary.css";
import DoughnutGraph from "./Graphs/DoughnutGraph";
import PieChart from "./Graphs/PieChart";


function extractMainThreadTime(data) {
  let mainThreadTimeData = data.items.map(item => {
    const subItemData = item.subItems.items.map(subitem => {
      return {
        url: subitem.url,
        data: (subitem.mainThreadTime == undefined) ? 0 : subitem.mainThreadTime
      }
    })
    return subItemData;
  }).filter(element => {
    if (Object.keys(element).length !== 0) {
      return true;
    }
    return false;
  });
  mainThreadTimeData = [...mainThreadTimeData];
  let finalAns = []
  for (let i = 0; i < mainThreadTimeData.length; i++) {
    finalAns.push(...mainThreadTimeData[i]);
  }
  return finalAns.filter(element => {
    if (element.data > 0) {
      return true;
    }
    return false;
  });
}

function extractBlockingTime(data) {
  let blockingTimeData = data.items.map(item => {
    const subItemData = item.subItems.items.map(subitem => {
      return {
        url: subitem.url,
        data: (subitem.blockingTime == undefined) ? 0 : subitem.blockingTime
      }
    })
    return subItemData;
  }).filter(element => {
    if (Object.keys(element).length !== 0) {
      return true;
    }
    return false;
  });
  blockingTimeData = [...blockingTimeData];
  let finalAns = []
  for (let i = 0; i < blockingTimeData.length; i++) {
    finalAns.push(...blockingTimeData[i]);
  }
  return finalAns.filter(element => {
    if (element.data > 0) {
      return true;
    }
    return false;
  });
}


function ThirdPartySummary({ data }) {
  const details = data.details;
  const mainThreadTimeData = extractMainThreadTime(details);
  const blockingTimeData = extractBlockingTime(details);

  return (
    <>
      <div className="third-party-container">
        <DoughnutGraph title={"Main Thread Time Data"} data={mainThreadTimeData}></DoughnutGraph>
        <PieChart title={"Blocking Time Data"} data={blockingTimeData}></PieChart>
      </div>
    </>
  )
}

export default ThirdPartySummary;