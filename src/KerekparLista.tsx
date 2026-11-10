import { useEffect, useState } from "react";
import type KerekparType from "./KerekparType";
import Kerekpar from "./Kerekpar";

const KEREKPAR_URL = "/data/kerekparok.json";

export default function KerekparLista() {
  const [kerekparok, setKerekparok] = useState<KerekparType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Kiadó kerékpárok";

    async function betoltes() {
      try {
        const response = await fetch(KEREKPAR_URL);
        if (!response.ok) {
          throw new Error(`HTTP hiba! status: ${response.status}`);
        }
        const data: KerekparType[] = await response.json();
        setKerekparok(data);
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Ismeretlen hiba");
        setIsLoading(false);
      }
    }

    betoltes();
  }, []);

  const darabszam = kerekparok.length;
  const napiDijak = kerekparok.map((kerekpar) => kerekpar.napiDij);
  const legolcsobbi =
    darabszam > 0 ? Math.min(...napiDijak) : 0;
  const legdragabb =
    darabszam > 0 ? Math.max(...napiDijak) : 0;

  if (isLoading) {
    return <div>Adatok betöltése...</div>;
  }
  if (error) {
    return <div>Hiba: {error}</div>;
  }

  return (
    <>
      <h1>Kiadó kerékpárok</h1>
      <h3>Kerékpárok száma: {darabszam}</h3>
      <p>Legolcsóbb bérleti díj: {legolcsobbi} Ft/nap</p>
      <p>Legdrágább bérleti díj: {legdragabb} Ft/nap</p>
      {kerekparok.map((kerekpar) => (
        <Kerekpar key={kerekpar.id} Item={kerekpar} />
      ))}
    </>
  );
}
