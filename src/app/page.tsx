"use client";

import React, {useEffect, useState} from "react";
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry, ColDef } from 'ag-grid-community';
import {Advocate} from '@/app/types';

ModuleRegistry.registerModules([AllCommunityModule]);

export default function Home() {
  const [advocates, setAdvocates] = useState([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const colDefs: ColDef[] = [
    { field: "firstName" },
    { field: "lastName" },
    { field: "city" },
    { field: "degree" },
    {
      field: "specialties",
      flex: 1,
      valueGetter: (params) => params.data.specialties.join(', '),
      cellStyle: {
        fontSize: '0.9rem', // reduce font size slightly
      },
    },
    { field: "yearsOfExperience" },
    { field: "phoneNumber" },
  ];

  useEffect(() => {
    console.log("fetching advocates...");
    fetch("/api/advocates").then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
        setFilteredAdvocates(jsonResponse.data);
      });
    });
  }, []);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = event.target.value;

    setSearchTerm(newSearchTerm);

    console.log("filtering advocates...");
    const filteredAdvocates = newSearchTerm !== '' ? advocates.filter((advocate: Advocate) => {
      return (
        advocate.firstName.includes(searchTerm) ||
        advocate.lastName.includes(searchTerm) ||
        advocate.city.includes(searchTerm) ||
        advocate.degree.includes(searchTerm) ||
        advocate.specialties.includes(searchTerm) ||
        advocate.yearsOfExperience.toString(10).includes(searchTerm)
      );
    }) : advocates;

    setFilteredAdvocates(filteredAdvocates);
  };

  const onClick = () => {
    console.log(advocates);
    setFilteredAdvocates(advocates);
  };

  return (
    <main style={{ margin: "24px" }}>
      <h1>Solace Advocates</h1>
      <br />
      <br />
      <div>
        <p>Search</p>
        <p>
          Searching for: <span id="search-term">{searchTerm}</span>
        </p>
        <input style={{ border: "1px solid black" }} onChange={onChange} />
        <button onClick={onClick}>Reset Search</button>
      </div>
      <br />
      <br />
      <div
        style={{height: 750}}
      >
        <AgGridReact
          rowData={filteredAdvocates}
          columnDefs={colDefs}
        />
      </div>
    </main>
  );
}
