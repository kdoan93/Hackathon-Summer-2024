import React, { useState } from 'react';

interface LogData {
    _id: string;
}

interface DeleteDocumentProps {
    log: LogData;
}

const DeleteDocument: React.FC<DeleteDocumentProps> = ({ log }) => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleDelete = async () => {
    const logId = log._id
    try {
      const response = await fetch(`/api/dashboard/deleteDashboard?logId=${logId}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess(result.message || 'Document deleted successfully');
        setError(null);
      } else {
        setError(result.message || 'Failed to delete document');
        setSuccess(null);
      }
    } catch (error) {
      setError('An unexpected error occurred');
      setSuccess(null);
    }
  };

  return (
    <div>
      <button onClick={handleDelete}>Delete</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      {log._id}
    </div>
  );
};

export default DeleteDocument;
