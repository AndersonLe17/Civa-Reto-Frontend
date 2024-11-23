export const filterToQuery = (filters: any) => {
  const query = new URLSearchParams();
  for (const key in filters) {
    if (filters[key] !== undefined && filters[key] !== null && filters[key] !== "direction") {
      query.append(key, filters[key]);
    }
  }
  return query.toString();
};
