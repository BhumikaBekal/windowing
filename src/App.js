// import logo from './logo.svg';
// import './App.css';
// import { useEffect, useState } from 'react';
// import { List } from 'react-window';

// function App() {
//   const [load, setLoad] = useState(false);

//   const Row = ({ index, style }) => (
//     <h3
//       style={{
//         ...style,
//         margin: 0,
//         padding: 12,
//         color: "white",
//         boxSizing: "border-box"
//       }}
//       className='list'
//     >
//       Block {index}
//     </h3>
//   );


//   const renderList = () => {
//     // return new Array(10000).fill(0).map((_, i) => (
//     //   <h3
//     //     style={{
//     //       margin: 0,
//     //       padding: 12,
//     //       color: "white"
//     //     }}
//     //     key={i}
//     //     className='list'
//     //   >
//     //     Block {i + 1}
//     //   </h3>
//     // ));
//     return (<List
//       rowComponent={Row}
//       rowHeight={50}
//       rowCount={10000}
//       style={{
//         height: 500,
//         width: 500
//       }}

//       rowProps={{}}
//    />
//     );
//   };

//   return (
//     <>
//       <h1 style={{ textAlign: "center" }}>Windowing Example</h1>
//       <div className="App">{ renderList()}</div>
//       <div style={{ display: "flex", justifyContent: "center" }}>
//         <button style={{ textAlign: "center" }} onClick={() => setLoad(true)}>Load List</button>
//       </div>
//     </>
//   );
// }

// export default App;


import './App.css';
import { useEffect, useState } from 'react';
import { List } from 'react-window';

function App() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchData();
  }, [page]);

  const fetchData = async () => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=20`
    );

    const result = await response.json();

    if (result.length === 0) {
      setHasMore(false);
    } else {
      setData((prev) => [...prev, ...result]);
    }

    setLoading(false);
  };

  return (
    <>
      <h1 style={{ textAlign: "center" }}>
        Infinite Scroll + Windowing
      </h1>

      <div className="App">
        <List
          rowComponent={({ index, style }) => (
            <div
              style={{
                ...style,
                padding: 12,
                color: "white",
                boxSizing: "border-box"
              }}
              className="list"
            >
              {data[index]?.title}
            </div>
          )}
          rowCount={data.length}
          rowHeight={50}
          rowProps={{}}
          style={{
            height: 500,
            width: 500
          }}
          onRowsRendered={({ stopIndex }) => {
            if (
              stopIndex >= data.length - 1 &&
              !loading &&
              hasMore &&
              data.length > 0
            ) {
              setLoading(true);
              setPage((prev) => prev + 1);
            }
          }}
        />
      </div>

      {loading && (
        <p style={{ textAlign: "center" }}>
          Loading...
        </p>
      )}
    </>
  );
}

export default App;
