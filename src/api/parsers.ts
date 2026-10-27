import type { AgencyOption, LaunchMission } from "../data/types";
import { UNKNOWN_AGENCY } from "../data/constants";
import { TENTATIVE_STATUS_IDS } from "./launchStatuses";

export interface ApiPage {
  next: string | null
  results: LaunchMission[]
}

export const INVALID_RESPONSE_MESSAGE = 'Launch Library 2 повернув відповідь у неочікуваному форматі.'

/** Префікс локального ключа агенції без API ID; ніколи не передається у серверний фільтр */
export const LOCAL_AGENCY_ID_PREFIX = 'local:'

export type JsonRecord = Record<string, unknown>

export function isRecord(value: unknown): value is JsonRecord {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

export function readRecord(parent: JsonRecord | null, key: string): JsonRecord | null {
  const value = parent?.[key]
  return isRecord(value) ? value : null
}

export function readString(parent: JsonRecord | null, key: string): string | null {
  const value = parent?.[key]
  return typeof value === 'string' && value.trim() !== '' ? value : null
}

export function readNumber(parent: JsonRecord | null, key: string): number | null {
  const value = parent?.[key]
  return typeof value === 'number' && Number.isFinite(value) ? value : null
}

export function parseLaunchMission(raw: unknown): LaunchMission {
  if (!isRecord(raw)) throw new Error(INVALID_RESPONSE_MESSAGE)

  const id = readString(raw, 'id')
  const rawName = readString(raw, 'name')
  if (id === null || rawName === null) throw new Error(INVALID_RESPONSE_MESSAGE)

  const status = readRecord(raw, 'status')
  const statusId = readNumber(status, 'id')
  const statusName = readString(status, 'name')

  const mission = readRecord(raw, 'mission')
  const missionName = readString(mission, 'name')
  const orbit = readRecord(mission, 'orbit')
  const celestialBody = readRecord(orbit, 'celestial_body')

  const provider = readRecord(raw, 'launch_service_provider')
  const agency = readString(provider, 'name') ?? UNKNOWN_AGENCY
  const providerId = readNumber(provider, 'id')
  // Записи без ID отримують локальний ключ, який не збігається з числовими ID API
  const agencyId = providerId !== null ? String(providerId) : `${LOCAL_AGENCY_ID_PREFIX}${agency}`

  const rocket = readRecord(raw, 'rocket')
  const configuration = readRecord(rocket, 'configuration')
  const rocketName = readString(configuration, 'full_name')

  const pad = readRecord(raw, 'pad')
  const padName = readString(pad, 'name')
  const padLocation = readRecord(pad, 'location')
  const locationName = readString(padLocation, 'name')
  const padFormatted =
    padName && locationName ? `${padName}, ${locationName}` : (padName ?? locationName)

  return {
    id,
    name: missionName ?? rawName,
    agency,
    agencyId,
    rocket: rocketName,
    pad: padFormatted,
    status: statusName,
    statusId,
    net: readString(raw, 'net'),
    isDateTentative: statusId !== null && TENTATIVE_STATUS_IDS.includes(statusId),
    orbitName: readString(orbit, 'name'),
    orbitAbbrev: readString(orbit, 'abbrev'),
    celestialBody: readString(celestialBody, 'name'),
  }
}

export function parsePage(raw: unknown, apiBaseUrl: string): ApiPage {
  if (!isRecord(raw) || !Array.isArray(raw.results)) throw new Error(INVALID_RESPONSE_MESSAGE)

  const next = raw.next

  if (next !== null && (typeof next !== 'string' || !next.startsWith(`${apiBaseUrl}/`))) {
    throw new Error(INVALID_RESPONSE_MESSAGE)
  }

  return { next, results: raw.results.map(parseLaunchMission) }
}

export interface AgencyApiPage {
  next: string | null
  results: AgencyOption[]
}

/** Запис довідника агенцій: потрібні цілий додатний id та непорожня назва */
export function parseAgencyOption(raw: unknown): AgencyOption {
  if (!isRecord(raw)) throw new Error(INVALID_RESPONSE_MESSAGE)

  const id = readNumber(raw, 'id')
  const name = readString(raw, 'name')
  if (id === null || !Number.isInteger(id) || id <= 0 || name === null) throw new Error(INVALID_RESPONSE_MESSAGE)

  return { id: String(id), name: name.trim() }
}

export function parseAgencyPage(raw: unknown, apiBaseUrl: string): AgencyApiPage {
  if (!isRecord(raw) || !Array.isArray(raw.results)) throw new Error(INVALID_RESPONSE_MESSAGE)

  const next = raw.next

  if (next !== null && (typeof next !== 'string' || !next.startsWith(`${apiBaseUrl}/`))) {
    throw new Error(INVALID_RESPONSE_MESSAGE)
  }

  return { next, results: raw.results.map(parseAgencyOption) }
}
