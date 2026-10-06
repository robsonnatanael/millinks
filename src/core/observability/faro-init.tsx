'use client';

import { useEffect, useRef } from 'react';

import { initializeFaro, getWebInstrumentations } from '@grafana/faro-web-sdk';
import { TracingInstrumentation } from '@grafana/faro-web-tracing';

import packageJson from '../../../package.json';

export function FaroInit() {
  const isInitialized = useRef(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && !isInitialized.current) {
      isInitialized.current = true;

      const faroCollectorUrl = process.env.NEXT_PUBLIC_FARO_COLLECTOR_URL;
      const faroAppName = process.env.NEXT_PUBLIC_FARO_APP_NAME || 'millinks';
      const faroAppVersion = packageJson.version;
      const faroEnvironmentName = process.env.NEXT_PUBLIC_FARO_ENVIRONMENT_NAME;

      if (!faroCollectorUrl || !faroEnvironmentName) {
        console.warn(
          'Faro initialization skipped: missing required environment variables'
        );
        return;
      }

      initializeFaro({
        url: `${faroCollectorUrl}`,
        app: {
          name: faroAppName,
          version: faroAppVersion,
          environment: faroEnvironmentName,
        },

        instrumentations: [
          // Mandatory, omits default instrumentations otherwise.
          ...getWebInstrumentations(),

          // Tracing package to get end-to-end visibility for HTTP requests.
          new TracingInstrumentation(),
        ],
      });
    }
  }, []);

  return null;
}
