import "../css/InfiniteScroll.css";
import React, { useState, useCallback, useEffect } from "react";

export default function InfiniteScroll() {
  const [items, setItems] = useState<any>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchItems = async (pageNum: any) => {
    setLoading(true);
    try {
      // Replace this with your actual data fetching logic
      const newItems = await fetchMoreItems(pageNum);
      setItems((prevItems: any) => [...prevItems, ...newItems]);
      setHasMore(newItems.length > 0);
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchItems(page);
  }, [page]);

  const handleScroll = useCallback(
    (e: any) => {
      const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
      if (
        scrollHeight - scrollTop <= clientHeight * 1.5 &&
        !loading &&
        hasMore
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    },
    [loading, hasMore]
  );

  return (
    <div onScroll={handleScroll} style={{ overflowY: "auto", height: "400px" }}>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Item</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item: any, index: number) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {loading && <p>Loading more items...</p>}
    </div>
  );
}
async function fetchMoreItems(page: any) {
  // Simulate fetching data
  return new Array(20).fill(null).map((_, index) => ({
    name: `Item ${(page - 1) * 20 + index + 1}`,
  }));
}
