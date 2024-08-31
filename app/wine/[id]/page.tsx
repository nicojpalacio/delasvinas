import React from 'react';
import { notFound } from 'next/navigation'; // Importa el método notFound si deseas manejar el 404
import dataWine from '@/app/components/dataWines.json'; // Asegúrate de que la ruta sea correcta

interface Wine {
  id: number;
  nombre: string;
  tipo: string;
  descripcion: string;
  url: string;
}

interface WinePageProps {
  params: {
    id: string;
  };
}

const WinePage: React.FC<WinePageProps> = ({ params }) => {
  const { id } = params;

  // Encuentra el vino correspondiente al id
  const wine = dataWine.find((wine: Wine) => wine.id === Number(id));

  // Si el vino no se encuentra, puedes redirigir a una página 404 o mostrar un mensaje
  if (!wine) {
    notFound(); // Redirige a la página 404 si el vino no existe
  }

  return (
    <div className="max-w-6xl py-4 mx-auto sm:py-16 sm:px-24">
      <h1 className="text-4xl font-bold text-center text-accent">{wine.nombre}</h1>
      <img
        src={wine.url}
        alt={wine.nombre}
        className="w-full max-w-md mx-auto mt-4 rounded-lg"
      />
      <p className="mt-4 text-xl text-center"><strong>Tipo:</strong> {wine.tipo}</p>
      <p className="mt-2">{wine.descripcion}</p>
    </div>
  );
};

export default WinePage;