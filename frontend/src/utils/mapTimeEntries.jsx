export const mapTimeEntries = (entries) => {
  return entries.reduce((acc, entry) => {
    const dateKey = entry.date.split("T")[0];

    if (!acc[dateKey]) {
      acc[dateKey] = { date: dateKey, times: [] };
    }

    acc[dateKey].times.push({
      startTime: entry.startTimes,
      endTime: entry.endTimes,
    });

    return acc;
  }, {});
};
