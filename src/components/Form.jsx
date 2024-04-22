import React, { useState } from "react";

import { DatePicker, Input, Space } from "antd";

import "../../css/Form.css"
const { RangePicker } = DatePicker;
const Form = () => {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [CI, setCI] = useState("");
  const [proveedor, setProveedor] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const onRangeChange = (dates, dateStrings) => {
    if (dates) {
      setStartDate(dateStrings[0]);
      setEndDate(dateStrings[1]);
    }
  };


  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);

    const formData = {
      nombres: name,
      apellidos: lastname,
      identificacion: CI,
      proveedor: proveedor,
      startDate: startDate,
      endDate: endDate,
    };
    console.log(formData);

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbyzH16r8ASt7lymCBjwijWp66e4AsRzp-2q-Fh3DYucvztSOPLrJLYTP0H28i4ir2nIRg/exec",
        {
          redirect: "follow",
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "text/plain;charset=utf-8",
          },
        }
      );

      console.log("response: " + JSON.stringify(response));

      if (response.ok) {
        console.log("Submitted OK");
        setName("");
        setLastname("");
        setCI("");
        setProveedor("");
        window.alert("Formulario enviado con éxito");
      } else {
        console.error("Error send data");
      }
    } catch (error) {
      console.error("Error send data:", error);
    }
    setLoading(false);
  };

  return (
    <div
      id="form"
      className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-20 p-8 md:p-12 xl:p-20 bg-slate-50 text-white"
    >
      <div className="flex flex-col items-center justify-center gap-4 sm:mx-16 mx-6">
        <img src="PASHQ.jpeg" alt="Logo" className="mb-4 h-auto self-center" />
      </div>
      <div className="flex flex-col gap-4 sm:mx-12 mx-6">
        <h2 className="text-[20px] sm:text-[25px] font-medium italic sm:text-left text-center text-black">
          Formulario de Pre-Registro
        </h2>
        <p className="text-[20px] text-gray-500"></p>
        <form className="form w-full" id="formData" onSubmit={handleSubmit}>
          <div className="relative">
            <div class="grid md:grid-cols-2 md:gap-6">
              <div className="pt-4 flex flex-col items-center sm:items-start">
                <label htmlFor="date" className="mb-2 text-sm text-black">
                  Nombres
                </label>
                <Input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Juan"
                />
              </div>
              <div className="pt-4 flex flex-col items-center sm:items-start">
                <label htmlFor="date" className="mb-2 text-sm text-black">
                  Apellidos
                </label>
                <Input
                  type="text"
                  name="lastname"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  placeholder="Perez"
                />
              </div>
            </div>

            <div className="pt-4 flex flex-col items-center sm:items-start">
              <label htmlFor="date" className="mb-2 text-sm text-black">
                CI
              </label>
              <Input
                type="text"
                name="CI"
                value={CI}
                onChange={(e) => setCI(e.target.value)}
                placeholder="1234XXXXXXXX"
              />
            </div>
            <div className="pt-4 flex flex-col items-center sm:items-start">
              <label htmlFor="date" className="mb-2 text-sm text-black">
                Proveedor
              </label>
              <Input
                type="text"
                name="proveedor"
                value={proveedor}
                onChange={(e) => setProveedor(e.target.value)}
                placeholder="ET Business"
              />
            </div>
            <div className="pt-4 flex flex-col items-center sm:items-start">
              <label htmlFor="city" className="mb-2 text-sm text-black">
                Rango de fecha
              </label>
              
                <RangePicker showTime onChange={onRangeChange} />
              
            </div>
            <div className="pt-4 flex sm:content-start content-center sm:justify-end justify-center">
              <button
                type="submit"
                disabled={loading}
                // onClick={handleSubmit}
                className=" font-semibold py-2 px-6 mt-10 bg-black  rounded-xl top-1/2 -translate-y-1/2 left-2"
              >
                {loading ? "Enviando..." : "Enviar"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
