import "./user.css"
export default function User() {
  return (
    <div>
      <h1>User</h1>
      <div className="user-card">
        <image className="user-image"></image>
        <p className="user-data">username</p>
        <p className="user-data">email</p>
        <p className="user-data">password</p>
        <p className="user-data">location</p>
        <p className="edit-data">Edit data</p>
      </div>
    </div>
  );
}