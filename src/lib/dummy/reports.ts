import { DUMMY_SESSION_USER_ID, getProfileById } from "./users";
import type { DummyReport } from "./types";

export const DUMMY_REPORTS: DummyReport[] = [
  {
    id: "rep-1",
    reporterUserId: DUMMY_SESSION_USER_ID,
    reportedUserId: "u12",
    reason: "Ongepast taalgebruik in chat",
    status: "in_behandeling",
    createdAtLabel: "gisteren · 14:20",
  },
  {
    id: "rep-2",
    reporterUserId: "u5",
    reportedUserId: "u8",
    reason: "Verdachte profielfoto",
    status: "open",
    createdAtLabel: "vandaag · 09:05",
  },
  {
    id: "rep-3",
    reporterUserId: "u11",
    reportedUserId: "u4",
    reason: "Spam / externe links",
    status: "gesloten",
    createdAtLabel: "vorige week · 18:40",
  },
];

export function listReportsForSession(): DummyReport[] {
  return DUMMY_REPORTS.filter((r) => r.reporterUserId === DUMMY_SESSION_USER_ID);
}

export function listReportsAdmin(): DummyReport[] {
  return [...DUMMY_REPORTS];
}

export function reportWithUsernames(report: DummyReport) {
  const reported = getProfileById(report.reportedUserId);
  const reporter = getProfileById(report.reporterUserId);
  return {
    ...report,
    reportedUsername: reported?.username ?? report.reportedUserId,
    reporterUsername: reporter?.username ?? report.reporterUserId,
  };
}
