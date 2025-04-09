import {
  BookCheckIcon,
  BookMarkedIcon,
  ChartLineIcon,
  HandshakeIcon,
  HouseIcon,
  UsersIcon,
} from "lucide-react";

export const NAVBAR = [
  {
    id: "about",
    text: "Su di noi",
  },
  {
    id: "services",
    text: "I nostri servizi",
  },
  {
    id: "contact",
    text: "Contattaci",
  },
] as const;

export const ABOUT_US = [
  {
    id: "La Nostra Missione",
    text: "Rendere più semplice e organizzato il lavoro quotidiano all'interno dei CAF, riducendo la burocrazia e migliorando l'accesso ai servizi per ogni cittadino.",
  },
  {
    id: "Il Nostro Team",
    text: "Siamo un gruppo di professionisti appassionati di tecnologia e innovazione nei servizi pubblici. Crediamo che strumenti moderni possano migliorare concretamente la vita di chi lavora nei CAF e di chi ne usufruisce.",
  },
  {
    id: "I Nostri Valori",
    text: "Efficienza, accessibilità e semplicità. Vogliamo offrire un sistema chiaro, veloce e personalizzabile, pensato per facilitare davvero il lavoro di ogni operatore.",
  },
] as const;

export const SERVICES = [
  {
    id: "Gestione Pratiche",
    Icon: BookCheckIcon,
    text: "Crea, modifica e archivia pratiche per ogni utente in modo semplice e ordinato.",
  },
  {
    id: "Registrazione CAF",
    Icon: HouseIcon,
    text: "Registra il tuo centro CAF e gestisci i dati in totale autonomia e sicurezza.",
  },
  {
    id: "Gestione Dipendenti",
    Icon: UsersIcon,
    text: "Aggiungi e gestisci operatori con ruoli e permessi personalizzati.",
  },
  {
    id: "Archivio Digitale",
    Icon: BookMarkedIcon,
    text: "Conserva i documenti in cloud, accessibili ovunque e in qualsiasi momento.",
  },
  {
    id: "Storico e Statistiche",
    Icon: ChartLineIcon,
    text: "Tieni traccia delle attività svolte e accedi a report statistici sull'andamento del tuo CAF.",
  },
  {
    id: "Supporto Integrato",
    Icon: HandshakeIcon,
    text: "Assistenza tecnica e funzionalità di messaggistica tra operatori e amministratori.",
  },
] as const;
