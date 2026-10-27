import type { AgencyOption, LaunchQuery } from "../data/types";

export const DEFAULT_LAUNCH_QUERY: LaunchQuery = {
    search: '',
    agencyId: '',
    ordering: '-net'
}

/* Перший пункт фільттра. Усе інше завантажується 
   через зовнішне API самих космічних запусків */  
export const ALL_AGENCIES_OPTION: AgencyOption = { id: '', name: 'Усі' }
