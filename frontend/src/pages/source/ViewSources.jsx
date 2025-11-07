import { useEffect, useState } from "react";
import { getAllSources } from "../../services/source";
import { message } from "../../providers/MessageProvider";
import { PageTitle } from "../../components/PageTitle";
import { translation } from "./Source.Translation";
import { getTranslation } from "../../utils/getTranslation";
import { Button } from "../../components/Button";
import { Pagination } from "../../components/Pagination";
import { SearchTable } from "../../components/SearchTable";

function DocumentCard({ name, source }) {
  const buttonStyle = "py-1 w-full whitespace-nowrap";
  return (
    <div className="mx-auto my-4 p-4 bg-white shadow-md rounded-2xl hover:shadow-xl transition-shadow duration-300 flex gap-10">
      <div className="w-[85%] flex flex-col justify-between">
        <h2 className="text-xl font-semibold mb-2">{name}</h2>
        <p className="text-gray-700 text-sm line-clamp-5">{source}</p>
      </div>
      <div className="flex-grow flex flex-col gap-4">
        <Button
          className={buttonStyle}
          text={getTranslation("Read")}
          onClick={() => (window.location.href = `/read?source_name=${name}`)}
        />
        <Button
          className={buttonStyle}
          text={getTranslation("ReadSentence", translation)}
          onClick={() =>
            (window.location.href = `/read_sentence?source_name=${name}`)
          }
        />
        <Button
          className={buttonStyle}
          text={getTranslation("WordList", translation)}
          onClick={() =>
            (window.location.href = `/read_word_list?source_name=${name}`)
          }
        />
      </div>
    </div>
  );
}

export function ViewSources() {
  const [sources, setSources] = useState([]);
  const [searchValues, setSearchValues] = useState([
    { id: "word", placeholder: "Search by word", value: "" },
  ]);
  async function fetchData() {
    const result = await getAllSources({});

    if (result.error) {
      message({ type: "error", text: result.error });
      return;
    }

    setSources(result.data.slice(0, 5));
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-4 bg-gray-100 min-h-[90vh]">
      <PageTitle title={"View sources"} />

      <SearchTable
        searchValues={searchValues}
        setSearchValues={setSearchValues}
        fetchRows={() => {}}
      />

      {(!sources || sources.length == 0) && <div>No source yet!</div>}
      {sources &&
        sources.length > 0 &&
        sources.map((ele) => {
          return <DocumentCard name={ele.name} source={ele.source} />;
        })}

      <Pagination />
    </div>
  );
}
