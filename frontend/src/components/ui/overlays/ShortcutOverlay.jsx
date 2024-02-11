export default function ShortcutOverlay({
  shortcutKey,
  overlayTitle,
  shortcutList,
}) {
  return (
    <section className="card w-96 bg-base-100 shadow-xl absolute bottom-6">
      <div className="card-body text-center  gap-0">
        <h2 className="card-title">{overlayTitle} blitzschnell hinzufügen</h2>
        <small>
          Tippe <kbd className="kbd">{shortcutKey}</kbd> um Befehle zu starten
        </small>
      </div>

      <div className="card-body pt-0">
        {shortcutList.map((shortcut, index) => {
          return (
            <div className="flex items-center" key={index}>
              <p className="text-sm">{shortcut.title} </p>
              <div className="badge badge-neutral py-3">{shortcut.key}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
