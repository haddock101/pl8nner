# Pl8nner – a calendar

A month-view calendar built with React 19, TypeScript, Vite, Tailwind and shadcn/ui (Base UI). Work in progress.

## Getting started

```sh
npm install
npm run dev        # Vite dev server on port 5173, exposed on the LAN
npm run devjson    # json-server (port 5555, proxied as /api) + Vite
npm run build      # type-check and build
npm run lint
```

## Structure

- `src/lib/calendar.ts` – pure date helpers: month grid, events per day, new events
- `src/types.ts` – the `CalendarEvent` type (dates are ISO 8601 strings)
- `src/components/` – calendar view, day cell, navigation, event editor
- `src/components/ui/` – generated shadcn/ui components
- `db.json5` – data for json-server
