const Search = ({
  searchQuery,
  setSearchQuery,
}: {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}) => (
  <input
    type="search"
    placeholder="Search courses..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    className="w-full max-h-12 max-w-lg mt-4 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
);

export default Search;
