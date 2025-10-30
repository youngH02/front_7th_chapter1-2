import { Event, RepeatInfo } from '../types';

export function generateRecurringEvents(baseEvent: Event, repeatInfo: RepeatInfo): Event[] {
  throw new Error('Not implemented');
}

export function generateRecurringEventId(originalId: string, date: string): string {
  throw new Error('Not implemented');
}

export function isLeapYear(year: number): boolean {
  throw new Error('Not implemented');
}

export function hasDay31InMonth(month: number): boolean {
  throw new Error('Not implemented');
}
