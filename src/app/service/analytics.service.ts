import { Injectable } from '@angular/core';
import { AnalyticsImplementation, Metric } from './analytics.interface';

@Injectable()
export class AnalyticsService {
  implementation: AnalyticsImplementation;

  constructor(implementation: AnalyticsImplementation) {
    this.implementation = implementation;
  }

  record(metric: Metric): void {
    this.implementation.recordEvent(metric);
  }
}
