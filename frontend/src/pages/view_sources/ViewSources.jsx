import { useEffect, useState, useRef, forwardRef } from "react";
import { getAllSources } from "../../services/source";
import { message } from "../../providers/MessageProvider";
import { PageTitle } from "../../components/PageTitle";
import { translation as source_translation } from "../source/Source.Translation";
import { translation as view_sources_translation } from "./ViewSources.Translation";
import { getTranslation } from "../../utils/getTranslation";
import { Button } from "../../components/Button";
import { Pagination } from "../../components/Pagination";
import { SearchTable } from "../../components/SearchTable";
import { getTimeFromId } from "../../utils/getTimeFromId";

const translation = {
  ...source_translation,
  ...view_sources_translation,
}

const PAGE_SIZE = 5;

const DocumentCard = forwardRef(({ name, source, create_at }, ref) => {
  const buttonStyle = "py-1 w-full whitespace-nowrap";
  return (
    <div
      ref={ref}
      className="mx-auto my-4 p-4 bg-white shadow-md rounded-2xl hover:shadow-xl transition-shadow duration-300 flex gap-10"
    >
      <div className="w-[85%] flex flex-col justify-between">
        <div className="flex justify-between">
          <h2 className="text-xl font-semibold mb-2">{name}</h2>
          <span className="text-gray-500 whitespace-nowrap">{create_at}</span>
        </div>
        <p className="text-gray-700 text-sm line-clamp-3">{source}</p>
      </div>
      <div className="flex-grow flex flex-col gap-2">
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
});

export function ViewSources() {
  const [sources, setSources] = useState([]);
  const [searchValues, setSearchValues] = useState([
    { id: "name", label: getTranslation("Name", translation), value: "" },
  ]);
  const [paginationData, setPaginationData] = useState({});
  const firstCardRef = useRef(null);
  
  async function fetchData(
    { pageIndex, pageSize } = {
      pageIndex: paginationData.pageIndex || null,
      pageSize: paginationData.pageSize || PAGE_SIZE,
    }
  ) {
    const params = searchValues.reduce((acc, ele) => {
      acc[ele.id] = ele.value;
      return acc;
    }, {});

    const result = await getAllSources({ pageIndex, pageSize, ...params });

    if (result.error) {
      message({ type: "error", text: result.error });
      return;
    }

    setSources(result.data);
    setPaginationData(result.pagination);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-4 bg-gray-100 min-h-[90vh]">
      <PageTitle title={getTranslation("Title", translation)} />

      <SearchTable
        searchValues={searchValues}
        setSearchValues={setSearchValues}
        fetchRows={fetchData}
      />

      {(!sources || sources.length == 0) && <div>{getTranslation("NoSource", translation)}</div>}
      {sources &&
        sources.length > 0 &&
        sources.map((ele, index) => {
          return (
            <DocumentCard
              ref={index === 0 ? firstCardRef : null}
              name={ele.name}
              source={ele.source}
              create_at={getTimeFromId(ele.id)}
            />
          );
        })}

      {firstCardRef.current &&
        sources.length < PAGE_SIZE &&
        Array.from({ length: PAGE_SIZE - sources.length }).map((_, i) => (
          <div
            key={i}
            style={{ height: `${firstCardRef.current.offsetHeight}px` }}
            className="bg-transparent"
          ></div>
        ))}

      <Pagination fetchData={fetchData} paginationData={paginationData} />
    </div>
  );
}
