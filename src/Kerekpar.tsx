import { useState } from "react";
import type KerekparType from "./KerekparType";

export default function Kerekpar({ Item }: { Item: KerekparType }) {
  const [Megjelenit, setMegjelenit] = useState(true);

  return (
    <div className="card mb-3">
      <div className="card-body">
        <button
          className="btn btn-info mb-2"
          onClick={() => setMegjelenit((prev) => !prev)}
          aria-label={Megjelenit ? "Adatok elrejtése" : "Adatok megjelenítése"}
        >
          Részletek
        </button>
        {Megjelenit && (
          <>
            <h3 className="card-title" style={{ color: Item.szin }}>
              {Item.nev}
            </h3>
            <p className="card-text">
              <em>{Item.tipus}</em>
            </p>
            <p className="card-text">
              <u>{Item.napiDij} Ft/nap</u>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
