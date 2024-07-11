import { URL } from '@/components/!url';

interface DataItem {
  name: string;
  population: number;
  color: string;
  legendFontColor: string;
  legendFontSize: number;
}

interface FetchData {
  topData: DataItem[];
  sortedData: DataItem[];
}

export async function fetchAPIdata(): Promise<FetchData> {
  //const response = await fetch(`http://192.168.3.59:8000/${call}`, {
  const response = await fetch(`http://${URL}:8000/mahjongAPI?mode=0`, {

    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const randomColor: () => string = () => {
    let color = Math.floor(Math.random() * 16777215).toString(16);
    while (color.length < 6) {
        color = '0' + color;
    }
    return `#${color}`;
  }

  const data: { name: string; population: number }[] = await response.json();
  const jsonData = data.map((item) => ({
    ...item,
    color: randomColor(),
    legendFontColor: '#e0e0e0',
    legendFontSize: 15,
  }));

  const sortedData = jsonData.sort((a, b) => b.population - a.population);
  const top4Data = sortedData.slice(0, 4);
  const othersPopulation = sortedData.slice(4).reduce((sum, item) => sum + item.population, 0);
  top4Data.push({ name: 'Others', population: othersPopulation, color: '#C0C0C0', legendFontColor: '#e0e0e0', legendFontSize: 15 });

  return { topData: top4Data, sortedData };
}
