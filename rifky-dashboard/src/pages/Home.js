import React from "react";
import DisplayChart from "../components/DisplayChart";

function Home() {
  return (
    <div>
      <main className="flex flex-row justify-center items-center px-10">
        <div className="flex flex-row flex-1 justify-center container max-h-96">
          <DisplayChart></DisplayChart>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl text-red-400 font-bold py-3">
            Ini Tittle Lorem Ipsum
          </h1>
          <h1 className="text-justify">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis,
            beatae voluptatibus quibusdam dolorem non veniam cupiditate soluta
            deleniti nisi iusto sapiente iure fugit voluptatum, eos ea officiis
            nesciunt at accusantium?
          </h1>
        </div>
      </main>
    </div>
  );
}

export default Home;
