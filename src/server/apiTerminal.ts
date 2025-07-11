import { fetch, post } from "./serverClient";

const apiTerminal = {
  search: async (searchType: string, query: string) => {
    const encodedQuery = encodeURIComponent(query);
    const response = await fetch(
      `/api/kb/${searchType}/search?q=${encodedQuery}`
    );
    return response;
  },
  analyzeInput: async (text: string) => {
    const response = await post("/api/annotate/", { text });
    return response;
  },
};

export default apiTerminal;
