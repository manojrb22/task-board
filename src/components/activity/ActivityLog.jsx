const ActivityLog = ({ activities }) => {
  const formatTime = (timestamp) => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const actionColors = {
    created: 'text-green-600',
    edited: 'text-blue-600',
    deleted: 'text-red-600',
    moved: 'text-purple-600',
    reset: 'text-gray-600',
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4">
      <h3 className="font-bold text-lg mb-4">Activity Log</h3>
      <div className="space-y-3 max-h-[600px] overflow-y-auto">
        {activities.length === 0 ? (
          <p className="text-gray-400 text-sm text-center py-4">No activity yet</p>
        ) : (
          activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-3 text-sm border-b pb-2">
              <div className="flex-1">
                <span className={`font-semibold ${actionColors[activity.action]}`}>
                  {activity.action.charAt(0).toUpperCase() + activity.action.slice(1)}
                </span>
                <span className="text-gray-700"> "{activity.taskTitle}"</span>
                {activity.details && (
                  <span className="text-gray-500"> {activity.details}</span>
                )}
              </div>
              <span className="text-gray-400 text-xs whitespace-nowrap">
                {formatTime(activity.timestamp)}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ActivityLog;
