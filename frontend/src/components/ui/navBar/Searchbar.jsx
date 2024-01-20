export default function Searchbar() {
  return (
    <div className="join flex-1">
      <div>
        <div>
          <input
            className="input input-bordered join-item"
            placeholder="Search"
          />
        </div>
      </div>
      <select className="select select-bordered join-item">
        <option disabled value={"Filter"}>
          Filter
        </option>
        <option>Sci-fi</option>
        <option>Drama</option>
        <option>Action</option>
      </select>
      <div className="indicator">
        <button className="btn join-item">Search</button>
      </div>
    </div>
  );
}
