import "../styles/Content.css";
import Table from "./Table";
import ThirdPartyTable from "./ThirdPartyTable";
import ThirdPartySummary from './ThirdPartySummary'
function Content({ content, contentKey }) {
  return (
    <div className="content-wrapper">
      {" "}
      {content.details && content.details.type === "table" ? (
        contentKey === "third-party-summary" ? (
          <div>
            <ThirdPartyTable
              id={contentKey}
              headings={content.details.headings}
              items={content.details.items}
            />
            <ThirdPartySummary data={content}></ThirdPartySummary>
          </div>

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
