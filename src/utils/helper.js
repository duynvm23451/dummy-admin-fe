export const formatTimestampToDate = (timestamp) => {
  return new Date(timestamp).toISOString().split("T")[0];
};
