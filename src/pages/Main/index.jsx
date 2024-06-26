/* eslint-disable import/no-extraneous-dependencies */

// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";

// eslint-disable-next-line no-unused-vars
import Quagga from "quagga";

import { Video } from "./styles";

function Main() {
  const onDetected = (result) => {
    Quagga.offDetected(onDetected);

    const isbn = result.codeResult.code;

    alert(isbn);
  };

  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      Quagga.init(
        {
          inputStream: {
            name: "Live",
            type: "LiveStream",
            target: document.querySelector("#video"),
            constraints: {
              facingMode: "environment",
            },
          },
          numOfWorkers: 1,
          locate: true,
          decode: {
            readers: ["ean_reader"],
          },
        },
        (err) => {
          if (err) {
            console.error(err);
            alert(
              "Erro ao abrir a câmero do dispositivo, por favor, dê permissão de uso"
            );
            return;
          }
          Quagga.start();
        },
        Quagga.onDetected(onDetected)
      );
    }
  }, []);

  return <Video id="video" />;
}

export default Main;
