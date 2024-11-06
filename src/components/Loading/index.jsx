import React from 'react';

const Loading = () => {
  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{
        backgroundColor: 'black',
      }}
    >
      <img
        src="/assets/icono.png"
        alt="Cargando..."
        className="animate-spin h-48 w-48"
      />
    </div>
  );
};

export default Loading;
