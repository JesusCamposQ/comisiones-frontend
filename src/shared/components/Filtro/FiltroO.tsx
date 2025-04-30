import React, { useState, useEffect, useRef, useContext } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  format,
  subMonths,
  subDays,
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
} from "date-fns";
import {
  getEmpresas,
  getSucursalesPorEmpresa,
  getTipoVenta,
} from "../service/coreService";
import { autenticacionContext } from "../../autenticacion/context/context.autenticacion";

export function BuscadorTodas({ onFiltersChange }) {
  const { token } = useContext(autenticacionContext);

  const [sucursales, setSucursales] = useState([]);
  const [tiposVenta, setTiposVenta] = useState([]);
  const [cadenas, setCadenas] = useState([]);
  const [selectedCadena, setSelectedCadena] = useState("");
  const [selectedSucursal, setSelectedSucursal] = useState([]);
  const [selectedTipoVenta, setSelectedTipoVenta] = useState([]);
  const [dateRange, setDateRange] = useState([null, null]);
  const [searchSucursal, setSearchSucursal] = useState("");
  const [searchTipoVenta, setSearchTipoVenta] = useState("");
  const [showSucursalDropdown, setShowSucursalDropdown] = useState(false);
  const [showTipoVentaDropdown, setShowTipoVentaDropdown] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [empresa, setEmpresa] = useState(null);
  const [comisiona, setComisiona] = useState(null);

  const sucursalDropdownRef = useRef(null);
  const tipoVentaDropdownRef = useRef(null);
  const datePickerRef = useRef(null);

  useEffect(() => {
    const currentDate = new Date();
    setDateRange([currentDate, currentDate]);
    fetchData();
  }, [token]);

  const fetchData = async () => {
    const cadenasData = await getCadenas();
    setCadenas(cadenasData);
    const tiposVentaData = await getTiposVenta();
    setTiposVenta(tiposVentaData);
  };

  useEffect(() => {
    const fetchSucursales = async () => {
      if (selectedCadena) {
        const sucursalesData = await getSucursales(selectedCadena);
        setSucursales(sucursalesData);
        setSelectedSucursal([]);
      } else {
        setSucursales([]);
        setSelectedSucursal([]);
      }
    };

    fetchSucursales();
  }, [selectedCadena]);

  const getCadenas = async () => {
    try {
      if(token){
        const response = await getEmpresas(token);
        return response.map((cadena) => ({
          id: cadena._id,
          nombre: cadena.nombre,
        }));
      }
    } catch (error) {
      console.log("Error en getCadenas:", error);
      return [];
    }
  };

  const getSucursales = async (empresaId) => {
    try {
    
      
        if(token && empresaId){
          setEmpresa(empresaId);
          const response = await getSucursalesPorEmpresa(empresaId, token);
          return response.map((sucursal) => ({
            id: sucursal._id,
            nombre: sucursal.nombre,
          }));
        }
    } catch (error) {
      console.log("Error en getSucursales:", error);
      return [];
    }
  };

  const getTiposVenta = async () => {
    try {
      if(token){
        const response = await getTipoVenta(token);
        return response.map((tipo) => ({
          id: tipo._id,
          nombre: tipo.nombre,
        }));
      }
    } catch (error) {
      console.log("Error en getTiposVenta:", error);
      return [];
    }
  };

  useEffect(() => {
    const [startDate, endDate] = dateRange;
    onFiltersChange({
      sucursal: selectedSucursal,
      empresa: empresa === "TODAS" ? cadenas.map((item) => item.id) : [empresa],
      tipoVenta: selectedTipoVenta,
  
      fechaInicio: startDate ? format(startDate, "yyyy-MM-dd") : "",
      fechaFin: endDate ? format(endDate, "yyyy-MM-dd") : "",
      comisiona: comisiona,
    });
  }, [
    selectedSucursal,
    selectedTipoVenta,
    dateRange,
    onFiltersChange,
    comisiona,
  ]);
  
  
  const handleCustomDateOption = (option) => {
    const now = new Date();
    let startDate, endDate;

    switch (option) {
      case "diaAnt":
        startDate = startOfDay(subDays(now, 1));
        endDate = endOfDay(subDays(now, 1));
        break;

      case "week":
        startDate = startOfWeek(subDays(now, 7), { weekStartsOn: 1 });
        endDate = endOfWeek(subDays(now, 7), { weekStartsOn: 1 });
        break;

      case "month":
        startDate = startOfMonth(now);
        endDate = endOfMonth(now);
        break;

      case "mesAnt":
        const previousMonthStart = startOfMonth(subMonths(now, 1));

        const previousMonthEnd = endOfMonth(subMonths(now, 1));

        startDate = previousMonthStart;
        endDate = previousMonthEnd;

        break;

      case "year":
        startDate = startOfYear(now);
        endDate = endOfYear(now);
        break;

      case "yearAnt":
        const previousYear = now.getFullYear() - 1;
        startDate = new Date(previousYear, 0, 1);
        endDate = new Date(previousYear, 11, 31);
        break;

      default:
        return;
    }

    setDateRange([startDate, endDate]);
    setShowDatePicker(false);
  };
  const handleSelection = (item, setter, selectedItems, searchSetter) => {
    const isSelected = selectedItems.includes(item.id);
    setter((prev) =>
      isSelected ? prev.filter((id) => id !== item.id) : [...prev, item.id]
    );

    searchSetter("");

    if (setter === setSelectedSucursal) {
      setShowSucursalDropdown(false);
    } else if (setter === setSelectedTipoVenta) {
      setShowTipoVentaDropdown(false);
    }
  };

  const filterOptions = (options, search) => {
    return options.filter((option) =>
      option.nombre.toLowerCase().includes(search.toLowerCase())
    );
  };

  const renderBubbles = (items, setter, selectedItems) =>
    items.map(
      (item) =>
        selectedItems.includes(item.id) && (
          <span
            key={item.id}
            className="bg-blue-200 text-blue-800 rounded-full px-2 py-1 text-xs font-semibold mr-2 mb-2 flex items-center"
          >
            {item.nombre}
            <button
              type="button"
              onClick={() =>
                handleSelection(
                  item,
                  setter,
                  selectedItems,
                  setter === setSelectedSucursal
                    ? setSearchSucursal
                    : setSearchTipoVenta
                )
              }
              className="ml-2 text-blue-600 hover:text-blue-800"
            >
              &times;
            </button>
          </span>
        )
    );

  const handleClickOutside = (event) => {
    if (
      sucursalDropdownRef.current &&
      !sucursalDropdownRef.current.contains(event.target)
    ) {
      setShowSucursalDropdown(false);
    }
    if (
      tipoVentaDropdownRef.current &&
      !tipoVentaDropdownRef.current.contains(event.target)
    ) {
      setShowTipoVentaDropdown(false);
    }
    if (
      datePickerRef.current &&
      !datePickerRef.current.contains(event.target)
    ) {
      setShowDatePicker(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="p-4 border rounded-lg bg-gray-50 shadow-md">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="flex flex-col">
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Cadena:
          </label>

          <select
            onChange={(e) => setSelectedCadena(e.target.value)}
            className="border p-2 rounded-lg w-full text-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Seleccione una cadena</option>
            <option value="TODAS">TODAS</option>
            {cadenas.map((cadena) => (
              <option key={cadena.id} value={cadena.id}>
                {cadena.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="relative flex flex-col" ref={sucursalDropdownRef}>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Sucursal:
          </label>
          <div
            className="flex flex-wrap items-center border p-2 rounded-lg w-full cursor-pointer min-h-[42px] focus:ring-blue-500 focus:border-blue-500"
            onClick={() => setShowSucursalDropdown(!showSucursalDropdown)}
          >
            {renderBubbles(sucursales, setSelectedSucursal, selectedSucursal)}
            <input
              type="text"
              placeholder="Buscar sucursal..."
              value={searchSucursal}
              onChange={(e) => setSearchSucursal(e.target.value)}
              className="border-0 outline-none w-full text-sm"
            />
          </div>
          {showSucursalDropdown && (
            <div className="absolute bg-white border rounded-lg w-full mt-1 max-h-60 overflow-y-auto z-10 shadow-lg">
              {filterOptions(sucursales, searchSucursal).map((sucursal) => (
                <div
                  key={sucursal.id}
                  className={`p-2 cursor-pointer hover:bg-gray-100 text-sm ${
                    selectedSucursal.includes(sucursal.id) ? "bg-gray-200" : ""
                  }`}
                  onClick={() =>
                    handleSelection(
                      sucursal,
                      setSelectedSucursal,
                      selectedSucursal,
                      setSearchSucursal
                    )
                  }
                >
                  {sucursal.nombre}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="relative flex flex-col" ref={tipoVentaDropdownRef}>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Tipo de venta:
          </label>
          <div
            className="flex flex-wrap items-center border p-2 rounded-lg w-full cursor-pointer min-h-[42px]"
            onClick={() => setShowTipoVentaDropdown(!showTipoVentaDropdown)}
          >
            {renderBubbles(tiposVenta, setSelectedTipoVenta, selectedTipoVenta)}
            <input
              type="text"
              placeholder="Buscar tipo de venta..."
              value={searchTipoVenta}
              onChange={(e) => setSearchTipoVenta(e.target.value)}
              className="border-0 outline-none w-full text-sm"
            />
          </div>
          {showTipoVentaDropdown && (
            <div className="absolute bg-white border rounded-lg w-full mt-1 max-h-60 overflow-y-auto z-10 shadow-lg">
              {filterOptions(tiposVenta, searchTipoVenta).map((tipo) => (
                <div
                  key={tipo.id}
                  className={`p-2 cursor-pointer hover:bg-gray-100 text-sm ${
                    selectedTipoVenta.includes(tipo.id) ? "bg-gray-200" : ""
                  }`}
                  onClick={() =>
                    handleSelection(
                      tipo,
                      setSelectedTipoVenta,
                      selectedTipoVenta,
                      setSearchTipoVenta
                    )
                  }
                >
                  {tipo.nombre}
                </div>
              ))}
            </div>
          )}

          <div className="flex">
            <div className="flex items-center me-4">
              <input
                onClick={(e) => {
                  if (e.target.checked) {
                    document.getElementById(
                      "inline-2-checkbox"
                    ).checked = false;
                    setComisiona(true);
                  } else {
                    setComisiona(null);
                  }
                }}
                id="inline-checkbox"
                type="checkbox"
                value=""
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600"
              />
              <label
                htmlFor="inline-checkbox"
                className="ms-2 text-sm font-medium text-gray-900"
              >
                Comisiona
              </label>
            </div>
            <div className="flex items-center me-4">
              <input
                onClick={(e) => {
                  if (e.target.checked) {
                    document.getElementById("inline-checkbox").checked = false;
                    setComisiona(false);
                  } else {
                    setComisiona(null);
                  }
                }}
                id="inline-2-checkbox"
                type="checkbox"
                value=""
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600"
              />
              <label
                htmlFor="inline-2-checkbox"
                className="ms-2 text-sm font-medium text-gray-900"
              >
                No comisiona
              </label>
            </div>
          </div>
        </div>

        <div className="relative flex flex-col" ref={datePickerRef}>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Rango de Fechas:
          </label>
          <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Selecciona un rango de fechas..."
                className="border p-2 rounded-lg flex-grow cursor-pointer text-sm focus:ring-blue-500 focus:border-blue-500"
                onClick={() => setShowDatePicker(!showDatePicker)}
                value={
                  dateRange[0] && dateRange[1]
                    ? `${format(dateRange[0], "dd-MM-yyyy")} - ${format(
                        dateRange[1],
                        "dd-MM-yyyy"
                      )}`
                    : ""
                }
                readOnly
              />
            </div>
            <div className="flex gap-1">
  <button
    onClick={() => handleCustomDateOption("diaAnt")}
    className="px-0.5 py-0.5 bg-blue-100 text-blue-800 rounded-xs text-xs hover:bg-blue-200 focus:outline-none focus:ring-2"
  >
    <span className="ml-1 text-xs text-blue-800">D. ant</span>
  </button>
  <button
    onClick={() => handleCustomDateOption("week")}
    className="px-0.5 py-0.5 bg-blue-100 text-blue-800 rounded-xs text-xs hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
  >
    S. ant
  </button>
  <button
    onClick={() => handleCustomDateOption("month")}
    className="px-0.5 py-0.5 bg-blue-100 text-blue-800 rounded-xs text-xs hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
  >
    Mes
  </button>
  <button
    onClick={() => handleCustomDateOption("mesAnt")}
    className="px-0.5 py-0.5 bg-blue-100 text-blue-800 rounded-xs text-xs hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
  >
    M. ant
  </button>
  <button
    onClick={() => handleCustomDateOption("year")}
    className="px-0.5 py-0.5 bg-blue-100 text-blue-800 rounded-xs text-xs hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
  >
    Año
  </button>
  <button
    onClick={() => handleCustomDateOption("yearAnt")}
    className="px-0.5 py-0.5 bg-blue-100 text-blue-800 rounded-xs text-xs hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
  >
    A. ant
  </button>
</div>

          </div>
          {showDatePicker && (
            <div className="absolute bg-white border rounded-lg mt-2 z-10 shadow-lg">
              <DatePicker
                selected={dateRange[0]}
                onChange={(dates) => setDateRange(dates)}
                startDate={dateRange[0]}
                endDate={dateRange[1]}
                selectsRange
                inline
                dateFormat="dd-MM-yyyy"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}