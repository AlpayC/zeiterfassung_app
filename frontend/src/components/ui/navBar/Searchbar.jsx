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
        <option defaultValue={"Zeiten"}>Zeiten</option>
        <option>Urlaubsanträge</option>
        <option>Projekte</option>
      </select>
      <div className="indicator ">
        <button className="btn join-item bg-secondary">Search</button>
      </div>
    </div>
  );
}
