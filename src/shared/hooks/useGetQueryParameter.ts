import { useLocation } from 'react-router-dom';

type Params = {
  query: string;
};

export const useGetQueryParameter = ({ query }: Params) => {
  const search = useLocation().search;
  const result = new URLSearchParams(search).get(query);

  return result;
};
