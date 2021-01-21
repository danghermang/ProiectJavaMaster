# Licenta

Licenta: Yuso aplicatie de transport bazata pe un sistem scalabil folosind CQRS si Angular

.\osrm-extract.exe -p .\car.lua .\data\romania-latest.osm.pbf

.\osrm-partition.exe .\data\romania-latest.osrm

.\osrm-customize.exe .\data\romania-latest.osrm

.\osrm-contract.exe .\data\romania-latest.osrm

.\osrm-routed.exe .\data\romania-latest.osrm - to run osrm_realease for map