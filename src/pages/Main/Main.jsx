import React, { useEffect } from "react";
import Quagga from "quagga";
import { Video } from "./styles";

export function Main() {
  const onDetected = (result) => {
    Quagga.offDetected(onDetected);

    let isbn = result.codeResult.code;

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
