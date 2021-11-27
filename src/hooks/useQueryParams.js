import { useLocation } from "react-router";

export default function useQueryParams() {
  const location = useLocation();
  return new URLSearchParams(location.search);
}
