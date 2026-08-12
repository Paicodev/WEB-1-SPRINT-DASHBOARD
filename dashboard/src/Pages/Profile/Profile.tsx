import { getUser } from '../../utils/auth';
import './Profile.css';

export default function Profile() {
  const user = getUser();

  return (
    <div className="profile-card-container">
      <div className="profile-card-header">
        <div className="profile-avatar-circle">
          👤
        </div>
        <div className="profile-title-box">
          <h2>{user ? user.name : 'Administrador'}</h2>
          <span className="profile-role-badge">
            Rol: Administrador (Dueño de la tienda)
          </span>
        </div>
      </div>

      <div className="profile-details-list">
        <div className="profile-detail-row">
          <span className="profile-detail-label">ID de Administrador:</span>
          <span className="profile-detail-value">#{user ? user.id : '1'}</span>
        </div>
        <div className="profile-detail-row">
          <span className="profile-detail-label">Correo Electrónico:</span>
          <span className="profile-detail-value">{user ? user.email : 'admin@negratone.com'}</span>
        </div>
        <div className="profile-detail-row">
          <span className="profile-detail-label">Estado:</span>
          <span className="profile-status-active">● Activo</span>
        </div>
      </div>
    </div>
  );
}