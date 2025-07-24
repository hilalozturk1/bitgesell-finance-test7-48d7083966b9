import React, { useEffect } from 'react';
import { useData } from '../state/DataContext';
import { Link } from 'react-router-dom';

function Items() {
  const { items, fetchItems } = useData();

  useEffect(() => {
    let isMounted = true;

    const loadItems = async () => {
      try {
        await fetchItems();
      } catch (error) {
        if (isMounted) {
          console.error('Error fetching items:', error);
        }
      }
    };

    loadItems();

    return () => {
      isMounted = false;
    };
  }, [fetchItems]);

  if (!items.length) return <p>Loading...</p>;

  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>
          <Link to={`/items/${item.id}`}>{item.name}</Link>
        </li>
      ))}
    </ul>
  );
}

export default Items;
