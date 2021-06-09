export interface Metric {
    eventName: string,
    scope: string,
    details: string
}

export interface AnalyticsImplementation {
    recordEvent(metric: Metric): void;
}