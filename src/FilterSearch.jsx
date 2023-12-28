import { useEffect, useState } from "react";
import { items } from "./items";

const FilterSearch = () => {
    const [selectedFilters, setSelectedFilter] = useState([]);
    const [filterItems, setFilterItems] = useState(items);
    const [search, setSearch] = useState("");
    const filters = ["Bags", "Watches", "Sports", "Sunglasses"];

    const handleFilter = (selectedCategory) => {
        if (selectedFilters.includes(selectedCategory)) {
            let updatedFilters = selectedFilters.filter(
                (item) => item !== selectedCategory
            );
            setSelectedFilter(updatedFilters);
        } else {
            setSelectedFilter([...selectedFilters, selectedCategory]);
        }
    };

    

    useEffect(() => {

        const filterItemsByCategory = () => {
            if (selectedFilters.length > 0) {
                let tempItems = selectedFilters.flatMap((select) =>
                    items.filter((item) => item.category === select)
                );
                setFilterItems(tempItems);
            } else {
                setFilterItems([...items]);
            }
        };

        filterItemsByCategory();
    }, [selectedFilters]);

    return (
        <div>
            <div className="inputbox">
                <input type="search" placeholder="Search here..." onChange={(e) => setSearch(e.target.value)} />
            </div>
            <div className="button-container">
                {filters.map((category, index) => (
                    <button
                        key={index}
                        onClick={() => handleFilter(category)}
                        className={`button ${selectedFilters.includes(category) ? "active" : ""
                            }`}
                    >
                        {category}
                    </button>
                ))}
            </div>
            <div className="item-container">
                {filterItems
                    .filter((data) => {
                        return search.toLowerCase() === ""
                            ? data
                            : data.name.toLowerCase().includes(search);
                    })
                    .map((item, index) => (
                        <div className="item" key={index}>
                            <p>{item.name}</p>
                            <p className="category">{item.category}</p>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default FilterSearch;
