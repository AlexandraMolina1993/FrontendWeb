export const publicacionKeys = {
  all: ["publicaciones"] as const,
  lists: () => [...publicacionKeys.all, "list"] as const,
  list: (tipo?: string) => [...publicacionKeys.lists(), { tipo }] as const,
  details: () => [...publicacionKeys.all, "detail"] as const,
  detail: (id: string) => [...publicacionKeys.details(), id] as const,
};