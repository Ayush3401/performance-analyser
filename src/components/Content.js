import "../styles/Content.css";
import Table from "./Table";
import ThirdPartyTable from "./ThirdPartyTable";

function Content({ content, contentKey }) {
  return (
    <div className="content-wrapper">
      {" "}
      {content.details && content.details.type === "table" ? (
        contentKey === "third-party-summary" ? (
          <ThirdPartyTable
            id={contentKey}
            headings={content.details.headings}
            items={content.details.items}
          />
        ) : (
          <Table
            id={contentKey}
            headings={content.details.headings}
            items={content.details.items}
          />
        )
      ) : (
        ""
      )}
    </div>
  );
}

export default Content;
