
const SearchBar = ({ searchQuery, handleSearch }) => {
    return <input type="text" placeholder="Search..." value={searchQuery} onChange={handleSearch}/>;
};

export default SearchBar