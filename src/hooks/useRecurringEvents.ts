import { useState } from 'react';

import { Event } from '../types';

export function useRecurringEvents() {
  const [isRecurringDialogOpen, setIsRecurringDialogOpen] = useState(false);
  const [recurringDialogType, setRecurringDialogType] = useState<'edit' | 'delete'>('edit');
  const [pendingEvent, setPendingEvent] = useState<Event | null>(null);
  const [pendingAction, setPendingAction] = useState<'edit' | 'delete' | null>(null);

  const openRecurringDialog = (event: Event, action: 'edit' | 'delete') => {
    if (event.repeat.type !== 'none') {
      setPendingEvent(event);
      setPendingAction(action);
      setRecurringDialogType(action);
      setIsRecurringDialogOpen(true);
      return true;
    }
    return false;
  };

  const closeRecurringDialog = () => {
    setIsRecurringDialogOpen(false);
    setPendingEvent(null);
    setPendingAction(null);
  };

  return {
    isRecurringDialogOpen,
    recurringDialogType,
    pendingEvent,
    pendingAction,
    openRecurringDialog,
    closeRecurringDialog,
  };
}
