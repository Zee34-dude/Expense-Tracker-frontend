export default function BudgetChart({ budgets }) {
  const chartData = budgets.map((budget, index) => ({
    name: budget.category,
    value: budget.spentAmount,
    color: [
      '#3b82f6', // blue
      '#ef4444', // red
      '#10b981', // green
      '#f59e0b', // amber
      '#8b5cf6', // purple
    ][index % 5],
  }));

  const totalSpent = chartData.reduce((sum, item) => sum + item.value, 0);

  // Calculate pie chart segments
  let currentAngle = -90;
  const segments = chartData.map((item) => {
    const sliceAngle = (item.value / totalSpent) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + sliceAngle;
    currentAngle = endAngle;

    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;

    const x1 = 100 + 80 * Math.cos(startRad);
    const y1 = 100 + 80 * Math.sin(startRad);
    const x2 = 100 + 80 * Math.cos(endRad);
    const y2 = 100 + 80 * Math.sin(endRad);

    const largeArc = sliceAngle > 180 ? 1 : 0;

    const pathData = [
      `M 100 100`,
      `L ${x1} ${y1}`,
      `A 80 80 0 ${largeArc} 1 ${x2} ${y2}`,
      'Z',
    ].join(' ');

    const labelAngle = startAngle + sliceAngle / 2;
    const labelRad = (labelAngle * Math.PI) / 180;
    const labelX = 100 + 50 * Math.cos(labelRad);
    const labelY = 100 + 50 * Math.sin(labelRad);

    return { ...item, pathData, labelX, labelY, percentage: ((item.value / totalSpent) * 100).toFixed(1) };
  });

  if (chartData.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6 h-full flex flex-col">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Spending by Category</h2>
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-500 text-center">No budget data to display</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 h-full flex flex-col">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Spending by Category</h2>
      <div className="flex-1 flex flex-col items-center justify-center">
        <svg width="300" height="300" viewBox="0 0 200 200" className="mb-6">
          {segments.map((segment, index) => (
            <g key={index}>
              <path
                d={segment.pathData}
                fill={segment.color}
                stroke="white"
                strokeWidth="2"
              />
              <text
                x={segment.labelX}
                y={segment.labelY}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-xs font-semibold fill-white"
              >
                {segment.percentage}%
              </text>
            </g>
          ))}
        </svg>

        <div className="w-full space-y-2">
          {segments.map((segment, index) => (
            <div key={index} className="flex items-center gap-3">
              <div
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: segment.color }}
              />
              <span className="text-sm text-gray-700 flex-1">{segment.name}</span>
              <span className="text-sm font-semibold text-gray-900">
                ${segment.value.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
