export default function Kbd({ keyList, position }) {
  return (
    <section className={`${position}`}>
      <div className="flex items-center justify-center gap-2 mt-4">
        {keyList.map((key, index) => {
          return (
            <div key={index}>
              <small className="text-white">{key.title}</small>
              <kbd className="kbd">{key.key}</kbd>
            </div>
          );
        })}
      </div>
    </section>
  );
}
