import React from 'react';
import GrievanceForm from '../components/GrievanceForm';

const NewGrievance: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">New Grievance</h1>
      <GrievanceForm />
    </div>
  );
};

export default NewGrievance;