import React from 'react';
import './OpportunityCard.css';
//import { useNavigate } from 'react-router-dom';

interface OpportunityCardInfo {
    id: number;
    name: string;
    location: string;
    description: string;
    sdg: string;
    difficulty: 1 | 2 | 3;
    type: string;
    requirements: {
        age: string;
        language: string;
        other?: string[];
    };
    image: string;
}

const OpportunityCard: React.FC<OpportunityCardInfo> = ({ 
    id,
    name,
    location,
    description,
    sdg,
    difficulty,
    type,
    requirements,
    image
}) => {
    const handleSelectVolunteerButton = () => {
        alert(`You selected: ${name} in ${location}`);
        console.log(`Selected: ${name} (ID: ${id})`);
    };

    const getDifficultyColor = (level: 1 | 2 | 3) => {
        switch(level) {
            case 1: return "#4CAF50";
            case 2: return "#FF9800";
            case 3: return "#F44336";
            default: return "#9E9E9E";
        }
    };

    return (
        <div className="opportunity-card">
            <div className="card-image-container">
                <img src={image} alt={name} className="card-image" />
            </div>
            <div className="card-content">
                <h3 className="card-title">{name}</h3>
                
                <p className="card-location">
                    <span className="location-icon">Location: </span> 
                    {location}
                </p>
                
                <div className="type-badge">Type: {type}</div>
                
                <p className="card-description">Description: {description}</p>
                
                <div className="badges-row">
                    <span className="sdg-badge">SDG: {sdg}</span>
                    <span 
                        className="difficulty-circle"
                        style={{ backgroundColor: getDifficultyColor(difficulty) }}>
                        {difficulty}
                    </span>
                </div>

                
                <div className="card-requirements">
                    <span className="requirements-label">Requirements:</span>
                    <ul className="requirements-list">
                        <li><strong>Age:</strong> {requirements.age}</li>
                        <li><strong>Language:</strong> {requirements.language}</li>
                        {requirements.other && requirements.other.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>
                
                <button 
                    className="select-volunteer-button"
                    onClick={handleSelectVolunteerButton}>
                    Select Volunteer
                </button>
            </div>
        </div>
    );
};

export default OpportunityCard;