import "../styles/Table.css";

function Table({ id, headings, items }) {
  return (
    <table id={id}>
      <thead>
        <tr>
          {headings.map(({ key, text }) => (
            <th key={key}>{text}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => {
          return (
            <tr key={index}>
              {headings.map(({ key }) => (
                <td key={key}>
                  {isNaN(item[key]) ? (
                    item[key] && item[key].type  && item[key].type=== "link" ? (
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
  );
}

export default Table;
