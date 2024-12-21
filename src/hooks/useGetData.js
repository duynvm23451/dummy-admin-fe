import { useState, useCallback, useEffect } from "react";

const useGetData = (getFunction, queryParams) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  // Function to fetch data
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await getFunction(queryParams);
      setData(response.data);
      setError(null);
    } catch (error) {
      setData(null);
      setError(error.response ? error.response.data : error.message);
    }
    setIsLoading(false);
  }, [getFunction, queryParams]);

  // Initial data fetch
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    isLoading,
    error,
    data,
    refetch: fetchData, // Expose refetch function
  };
};

export default useGetData;
