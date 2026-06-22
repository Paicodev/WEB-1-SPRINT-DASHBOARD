import React from 'react';
import { Link } from 'react-router-dom';
import './DashboardCard.css';

interface DashboardCardProps {
  icon: string;
  title: string;
  count: number;
  listPath: string;
  newPath: string;
  listButtonText?: string;
  newButtonText?: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ icon, title, count, listPath, newPath, listButtonText = "Ver Listado", newButtonText = "Agregar" }) => {
  return (
    <div className="dashboard-card">
      <div className="card-info">
        <span className="card-icon">{icon}</span>
        <h3 className="card-title">{title}</h3>
        <p className="card-count">Total: {count}</p>
      </div>
      <div className="card-actions">
        <Link to={listPath} className="card-button">{listButtonText}</Link>
        <Link to={newPath} className="card-button primary">{newButtonText}</Link>
      </div>
    </div>
  );
};

export default DashboardCard;