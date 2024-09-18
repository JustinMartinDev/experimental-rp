import React from "react";

const Menu = () => {
  return (
    <div className="bg-gray-900 bg-opacity-75 rounded-lg text-white w-64">
      <div
        className="text-center pt-4 pb-5 rounded-t-lg"
        style={{
          backgroundImage: "url('./background.jpg')",
          backgroundPositionY: "center",
          backgroundPositionX: "center",
        }}
      >
        <h1
          className="text-3xl font-pacifico"
          style={{
            fontFamily: "Pacifico, cursive",
          }}
        >
          Personnel
        </h1>
      </div>
      <div className="text-left pr-4 pl-4 mt-1">
        <h2
          className="text-sm font-bold mb-2"
          style={{ fontFamily: "Roboto, sans-serif" }}
        >
          PERSONNEL
        </h2>
        <ul>
          <li className="bg-gray-700 p-2 mb-1 rounded">Inventaire</li>
          <li className="p-2 mb-1">Portefeuille</li>
          <li className="p-2 mb-1">Porte-clés</li>
          <li className="p-2 mb-1">Ouvrir le coffre</li>
          <li className="p-2 mb-1">Donner Arme</li>
        </ul>
      </div>
      <div className="text-center mt-2 pb-2">
        <p className="text-sm">Poids 11.4 / 30.0kg</p>
      </div>
    </div>
  );
};

export default Menu;
