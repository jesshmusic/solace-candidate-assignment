"use client";

import React, { useEffect, useState, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry, ColDef } from "ag-grid-community";
import { Advocate } from "@/app/types";
import SearchComponent from "@/app/components/SearchComponent";

ModuleRegistry.registerModules([AllCommunityModule]);

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const colDefs: ColDef[] = [
    { field: "firstName", filter: true },
    { field: "lastName", filter: true },
    { field: "city", filter: true },
    { field: "degree", filter: true },
    {
      field: "specialties",
      filter: true,
      flex: 1,
      valueFormatter: useCallback((params: any) => {
        return params.data?.specialties?.join(", ") || "";
      }, []),
      cellStyle: {
        fontSize: "0.7rem",
      },
    },
    { field: "yearsOfExperience", filter: true },
    {
      field: "phoneNumber",
      filter: true,
      valueFormatter: useCallback((params: any) => {
        const phoneNumber: string = params.value?.toString() || "";
        if (phoneNumber.length === 10) {
          return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6)}`;
        }
        return phoneNumber;
      }, []),
    },
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

  useEffect(() => {
    console.log("filtering advocates...");
    const filtered = advocates.filter((advocate: Advocate) => {
      return (
        advocate.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        advocate.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        advocate.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        advocate.degree.toLowerCase().includes(searchTerm.toLowerCase()) ||
        advocate.specialties
          .join(", ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        advocate.yearsOfExperience.toString(10).includes(searchTerm)
      );
    });
    setFilteredAdvocates(filtered);
  }, [advocates, searchTerm]);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
  };

  const onClick = () => {
    setSearchTerm("");
    setFilteredAdvocates(advocates);
  };

  return (
    <main style={{ margin: "24px" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
        Solace Advocates
      </h1>
      <SearchComponent
        searchTerm={searchTerm}
        onChange={onChange}
        onClick={onClick}
      />
      <div style={{ height: 750 }}>
        <AgGridReact rowData={filteredAdvocates} columnDefs={colDefs} />
      </div>
    </main>
  );
}
