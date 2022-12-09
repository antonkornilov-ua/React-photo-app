import React from 'react';
import { Collection } from './Collection';
import './index.scss';

const photoCategories = [
    { name: 'Усі' },
    { name: 'Гори' },
    { name: 'Море' },
    { name: 'Архітектура' },
    { name: 'Міста' }
];

function App() {
    const [categoryId, setCategoryId] = React.useState(0);
    const [page, setPage] = React.useState(1);
    const [isLoading, setIsLoading] = React.useState(true);
    const [collections, setCollections] = React.useState([]);
    const [searchValue, setSearchValue] = React.useState('');

    React.useEffect(() => {
        setIsLoading(true);

        const category = categoryId ? `category=${categoryId}` : '';
        fetch(`https://6391dc7eac688bbe4c54d694.mockapi.io/photo_collection?page=${page}&limit=3&${category}`)
            .then((res) => res.json())
            .then((json) => {
                setCollections(json);
            })
            .catch((err) => {
                console.warn(err);
                alert('Дані неможливо завантажити');
            })
            .finally(() => setIsLoading(false));
    }, [categoryId, page]);

    return (
        <div className="App">
            <h1>Моя колекція фотографій</h1>
            <div className="top">
                <ul className="tags">
                    {photoCategories.map((obj, i) => (
                        <li
                            onClick={() => setCategoryId(i)}
                            className={categoryId === i ? 'active' : ''}
                            key={obj.name}>
                            {obj.name}
                        </li>
                    ))}
                </ul>
                <input
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    className="search-input"
                    placeholder="Пошук по назві"
                />
            </div>
            <div className="content">
                {isLoading ? (
                    <h2>Йде завантаження даних...</h2>
                ) : (
                    collections
                        .filter((obj) => obj.name.toLowerCase().includes(searchValue.toLowerCase()))
                        .map((obj, index) => <Collection name={obj.name} images={obj.photos} key={index} />)
                )}
            </div>
            <ul className="pagination">
                {[...Array(3)].map((_, i) => (
                    <li onClick={() => setPage(i + 1)} className={page === i + 1 ? 'active' : ''}>
                        {i + 1}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
