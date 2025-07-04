'use client';

import { PrimeReactProvider } from 'primereact/api';
import { ReactNode } from 'react';
import 'primereact/resources/themes/lara-dark-amber/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

export function PrimeReactThemeProvider({ children }: { children: ReactNode }) {
  return <PrimeReactProvider>{children}</PrimeReactProvider>;
}
