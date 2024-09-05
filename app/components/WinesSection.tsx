import Link from 'next/link';
import React from 'react';
import dataWine from '@/app/components/dataWines.json'; // Assuming dataWines.json is in the correct location

interface Wine {
  id: number;
  nombre: string;
  tipo: string;
  descripcion: string;
  url: string;
}

const WinesSection: React.FC = () => {
  return (
    <div className="max-w-6xl py-4 mx-auto sm:py-16 sm:px-24">
      <h3 className="px-6 pb-4 text-3xl sm:pb-8 text-center ">Nuestros vinos</h3>
      <div className="grid gap-5 sm:grid-cols-3">
        {dataWine.map((wine: Wine) => (
          <Link
            key={wine.id} // Use a unique key for each wine
            href={`/wine/${wine.id}`} // Assuming dynamic routing for wines
            className="relative max-w-xs mx-auto overflow-hidden bg-no-repeat bg-cover rounded-lg"
          >
            <img
              src={wine.url} // Replace with the actual image path
              alt={wine.nombre} // Provide an alternative text for accessibility
              className="max-w-[270px] transition duration-300 ease-in-out rounded-lg hover:scale-110"
            />
            <p className="absolute w-full py-2 text-lg font-bold text-center text-white bottom-5 backdrop-blur-lg">
              {wine.nombre}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default WinesSection;