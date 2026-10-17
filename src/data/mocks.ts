import type { AgencyLaunchCount, KpiData, LaunchMission } from './api'

export const mockLaunches: LaunchMission[] = [
  {
    id: 'a1b2c3d4-0001',
    name: 'Falcon 9 Block 5 | Starlink Group 10-12',
    agency: 'SpaceX',
    rocket: 'Falcon 9 Block 5',
    pad: 'Space Launch Complex 40, Cape Canaveral SFS, FL, USA',
    status: 'Go for Launch',
    net: '2026-10-20T14:30:00Z',
    orbitAltitudeKm: 550,
  },
  {
    id: 'a1b2c3d4-0002',
    name: 'Electron | Earth Observation Mission',
    agency: 'Rocket Lab',
    rocket: 'Electron',
    pad: 'Launch Complex 1, Mahia Peninsula, New Zealand',
    status: 'Launch Successful',
    net: '2026-09-28T03:15:00Z',
    orbitAltitudeKm: 500,
  },
  {
    id: 'a1b2c3d4-0003',
    name: 'Artemis I | Lunar Mission',
    agency: 'NASA',
    rocket: 'Space Launch System (SLS)',
    pad: 'Kennedy Space Center, FL, USA',
    status: 'Failed Launch',
    net: '2026-11-15T12:00:00Z',
    orbitAltitudeKm: 384400,
  },
  {
    id: 'a1b2c3d4-0004',
    name: 'Ariane 6 | Earth Observation Mission',
    agency: 'ESA',
    rocket: 'Ariane 6',
    pad: 'Guiana Space Centre, Kourou, French Guiana',
    status: 'Go for Launch',
    net: '2026-12-05T10:00:00Z',
    orbitAltitudeKm: 700,
  },
  {
    id: 'a1b2c3d4-0005',
    name: 'Starship | Mars Colonization Mission',
    agency: 'SpaceX',
    rocket: 'Starship',
    pad: 'Boca Chica, Texas, USA',
    status: 'Go for Launch',
    net: '2026-12-20T08:00:00Z',
    orbitAltitudeKm: 400,
  },
]

export const launchesByAgency: AgencyLaunchCount[] = [
  { agency: 'SpaceX', count: 98 },
  { agency: 'Rocket Lab', count: 17 },
  { agency: 'NASA', count: 4 },
  { agency: 'ESA', count: 5 },
]

export const kpiData: KpiData[] = [
  {
    title: 'Найближчий запуск',
    value: '20 жовтня',
    change: 'за 4 дні',
    isPositive: true,
  },
  {
    title: 'Запуски цьогоріч',
    value: '124',
    change: '+12% до минулого року',
    isPositive: true,
  },
  {
    title: 'Успішні старти',
    value: '112',
    change: '+10% до минулого року',
    isPositive: true,
  },
]
