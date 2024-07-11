import { URL } from "../components/!url";

interface FetchData {
  data: string;
}

export async function fetchCalldata(call: number): Promise<FetchData> {
  //const response = await fetch(`http://192.168.3.59:8000/${call}`, {
  const response = await fetch(`http://${URL}:8000/mahjongAPI?mode=${call}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = response.json()
  // Return the response
  return data
}