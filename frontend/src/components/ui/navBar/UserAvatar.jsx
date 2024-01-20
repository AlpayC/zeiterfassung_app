export default function UserAvatar({ user }) {
  return (
    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
      <div className="avatar placeholder">
        <div className="bg-neutral text-neutral-content rounded-full w-10">
          <span>{user.email.charAt(0).toUpperCase()}</span>
        </div>
      </div>
    </div>
  );
}
