import "./index.css";
import { Checkbox } from "primereact/checkbox";

function UserCard({
  data,
  searchChecked,
  selectedUsers,
  handleOnClickInfoButton,
  handleOnChangeChecked,
  setRowData,
  handleOnClickEditButton,
  deleteConfirm,
}) {
  return (
    <section className="users-card-container grid-users-card-container">
      <div className="img-users-card-section img-grid-card-users">
        <div className="details-users-card-section details-grid-users">
          <p className="mame-users p-grid-card-users">{data.name}</p>
          <p className="mame-users p-grid-card-users">{data.last_name}</p>
          <p className="total-products-users">{`Usuario: ${data.username}`}</p>
        </div>
        <Checkbox
          checked={searchChecked(selectedUsers, data.id)}
          onChange={() => handleOnChangeChecked(selectedUsers, data)}
        />
      </div>
      <div className="accion-users-card-section grid-accion-users" >
        <button
          className="users-actions-table-button"
          onClick={() => {
            setRowData(data);
            handleOnClickEditButton();
          }}
        >
          <i className="pi pi-pencil icon-users-table"></i>
        </button>
        <button
          className="users-actions-table-button"
          onClick={() => {
            setRowData(data);
            handleOnClickInfoButton();
          }}
        >
          <i className="pi pi-eye icon-users-table"></i>
        </button>
        <button
          className="users-actions-table-button"
          onClick={() => {
            deleteConfirm(data.id);
          }}
        >
          <i className="pi pi-trash icon-users-table"></i>
        </button>

      </div>
    </section>
  );
}

export default UserCard;
