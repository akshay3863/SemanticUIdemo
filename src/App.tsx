import { useEffect, useState } from "react";
import {
  Table,
  Container,
  Pagination,
  Dropdown,
  Input,
} from "semantic-ui-react";
const App = () => {
  type dataType = {
    postId: string;
    id: string;
    name: string;
    email: string;
    body: string;
  };
  const [data, setData] = useState([]);
  const [perPageRecord, setPerPageRecord] = useState(5);
  const [record, setRecord]: any = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [activePage, setActivePage] = useState(1);
  const [filterData, setFilterData]: any = useState([]);
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const paginatedData = data.slice(
      (activePage - 1) * perPageRecord,
      (activePage - 1) * perPageRecord + perPageRecord
    );
    setRecord(paginatedData);
    setFilterData(paginatedData);
    setTotalPage(Math.ceil(data.length / perPageRecord));
  }, [data, perPageRecord, activePage]);

  useEffect(() => {}, []);

  const getData = () => {
    fetch("https://jsonplaceholder.typicode.com/comments")
      .then((res) => res.json())
      .then((response) => {
        if (response && response?.length > 0) {
          setData(response);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const onChange = (e: any, pageInfo: any) => {
    setActivePage(pageInfo.activePage);
  };

  const options = [
    { text: "5", value: 5 },
    { text: "10", value: 10 },
    { text: "15", value: 15 },
  ];

  const perPageHandler = (e: any, data: any) => {
    setPerPageRecord(data.value);
  };

  const searchValueHandler = (e: any) => {
    if (e.target.value) {
      if (record.length > 0) {
        const SearchData = record.filter(
          (item: dataType) =>
            item.email.toLowerCase().match(e.target.value.toLowerCase()) ||
            item.name.toLowerCase().match(e.target.value.toLowerCase())
        );
        setFilterData(SearchData);
      }
    } else {
      setFilterData(record);
    }
  };

  return (
    <>
      <Container className="marginTop">
        <div className="ui equal width grid">
          <div className="equal width row">
            <div className="column ">
              <Dropdown
                options={options}
                selection
                onChange={perPageHandler}
                defaultValue={perPageRecord}
              />
            </div>

            <div className="column">
              <Input
                placeholder="Search..."
                onChange={searchValueHandler}
                icon="search"
              />
            </div>
          </div>
        </div>

        <Table celled padded>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>UserId</Table.HeaderCell>
              <Table.HeaderCell>Id</Table.HeaderCell>
              <Table.HeaderCell>Title</Table.HeaderCell>
              <Table.HeaderCell>email</Table.HeaderCell>
              <Table.HeaderCell>comments</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {filterData?.length > 0 ? (
              filterData.map((value: dataType, index: number) => {
                return (
                  <Table.Row key={index}>
                    <Table.Cell>{value?.postId}</Table.Cell>
                    <Table.Cell>{value?.id}</Table.Cell>
                    <Table.Cell>{value?.name}</Table.Cell>
                    <Table.Cell>{value?.email}</Table.Cell>
                    <Table.Cell>{value?.body}</Table.Cell>
                  </Table.Row>
                );
              })
            ) : (
              <div>No record founded</div>
            )}
          </Table.Body>
        </Table>
        <div className="ui equal width grid">
          <div className="equal width row">
            <div className="column ">
              showing {record[0]?.id} to {record[perPageRecord - 1]?.id} of{" "}
              {data && data?.length} entries
            </div>

            <div className="column">
              <Pagination
                activePage={activePage}
                onPageChange={onChange}
                totalPages={totalPage}
                boundaryRange={0}
                defaultActivePage={1}
                firstItem={null}
                lastItem={null}
                prevItem={{ content: <div>Previous</div> }}
                nextItem={{ content: <div>Next</div> }}
                siblingRange={1}
              />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default App;
