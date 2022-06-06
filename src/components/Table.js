import { useEffect, useState } from "react";
import "../styles/Table.css";

function Table({ id, headings, items }) {
  const [filteredItems, setFilteredItems] = useState([]);
  const [order, setOrder] = useState(headings.reduce((obj, {key}) => {
    Object.assign(obj, {
      [key] : 'asc'
    })
    return obj
  }, {}));

  useEffect(() =>{
    setFilteredItems([...items])
  },[items])

  function onSearch(e) {
    let searchText = e.target.value.toLowerCase();
    setFilteredItems(
      items.filter((item) => {
        return headings.some(({ key }) => {
          if(!item[key])return false;
          if (isNaN(item[key])) {
            if (item[key] && item[key].type && item[key].type === "link") {
              return item[key].text.toLowerCase().indexOf(searchText) !== -1;
            } else return item[key].toLowerCase().indexOf(searchText) !== -1;
          } else {
            return item[key].toString().indexOf(searchText) !== -1;
          }
        });
      })
    );
  }

  function sortItems(e){
    let columnKey = e.target.id
    setFilteredItems(prev => prev.sort((x,y) => {
      if(order==='asc'){
        setOrder('desc')
        if(typeof x[columnKey]==='number') {
          return x[columnKey] - y[columnKey]
        }
        else if(x[columnKey] && x[columnKey].text) return x[columnKey].text < y[columnKey].text ? -1 : 1
        else return x[columnKey] < y[columnKey] ? -1 : 1
      }
      else{
        setOrder('asc')
        if(typeof x[columnKey]==='number') return y[columnKey] - x[columnKey]
        else if(x[columnKey] && x[columnKey].text) return x[columnKey].text > y[columnKey].text ? -1 : 1
        else return x[columnKey] > y[columnKey] ? -1 : 1
      }
    }))
  }

  async function downloadJSON(){
    const fileName = id;
    const json = JSON.stringify(filteredItems);
    const blob = new Blob([json],{type:'application/json'});
    const href = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = fileName + ".json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <>
    <div className="toolbar">
      <input
        type="text"
        placeholder="Type here to search..."
        onChange={onSearch}
      />
      <button onClick={downloadJSON}>Download JSON</button>
      </div>
      <table id={id}>
        <thead>
          <tr>
            {headings.map(({ key, text }) => (
              <th key={key} id={key} onClick={sortItems}>{text}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredItems.map((item, index) => {
            return (
              <tr key={index}>
                {headings.map(({ key }) => (
                  <td key={key}>
                    {isNaN(item[key]) ? (
                      item[key] &&
                      item[key].type &&
                      item[key].type === "link" ? (
                        <a href={item[key].url}>{item[key].text}</a>
                      ) : (
                        item[key]
                      )
                    ) : (
                      Math.round(item[key] * 100) / 100
                    )}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default Table;
