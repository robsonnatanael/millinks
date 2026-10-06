import { type Instrumentation } from 'next';

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { NodeSDK } = await import('@opentelemetry/sdk-node');
    const { OTLPTraceExporter } =
      await import('@opentelemetry/exporter-trace-otlp-http');
    const { getNodeAutoInstrumentations } =
      await import('@opentelemetry/auto-instrumentations-node');
    const { W3CTraceContextPropagator } = await import('@opentelemetry/core');
    const { PeriodicExportingMetricReader } =
      await import('@opentelemetry/sdk-metrics');
    const { OTLPMetricExporter } =
      await import('@opentelemetry/exporter-metrics-otlp-http');

    const endpoint =
      process.env.OTEL_EXPORTER_OTLP_ENDPOINT || 'http://alloy:4318';

    const sdk = new NodeSDK({
      traceExporter: new OTLPTraceExporter({
        url: `${endpoint}/v1/traces`,
      }),
      metricReader: new PeriodicExportingMetricReader({
        exporter: new OTLPMetricExporter({
          url: `${endpoint}/v1/metrics`,
        }) as any,
        exportIntervalMillis: 15_000,
      }) as any,
      // metricReader removido — configurado via env vars abaixo
      textMapPropagator: new W3CTraceContextPropagator(),
      instrumentations: [
        getNodeAutoInstrumentations({
          '@opentelemetry/instrumentation-fs': { enabled: false },
          '@opentelemetry/instrumentation-http': { enabled: true },
        }),
      ],
    });

    sdk.start();

    process.on('SIGTERM', () => {
      sdk.shutdown().catch(console.error);
    });
  }
}

export const onRequestError: Instrumentation.onRequestError = async (
  err,
  request,
  context
) => {
  console.error(
    `[Server Error] Path: ${request.path} | Router: ${context.routerKind}`
  );
  console.error(err);
};
