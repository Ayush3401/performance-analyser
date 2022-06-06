import "../styles/Content.css";
import Table from "./Table";
import ThirdPartyTable from "./ThirdPartyTable";
import ThirdPartySummary from "./ThirdPartySummary";
function Content({ content, contentKey }) {
  return content.details && content.details.type === "table" ? (
    contentKey === "third-party-summary" ? (
      <div className="content-wrapper">
        <ThirdPartySummary data={content}></ThirdPartySummary>
        <ThirdPartyTable
          id={contentKey}
          headings={content.details.headings}
          items={content.details.items}
        />
      </div>
    ) : (
      <div className="content-wrapper">
        <Table
          id={contentKey}
          headings={content.details.headings}
          items={content.details.items}
        />
      </div>
    )
  ) : (
    ""
  );
}

export default Content;
