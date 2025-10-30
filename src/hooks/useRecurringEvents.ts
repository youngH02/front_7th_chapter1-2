import { useState } from 'react';

import { Event } from '../types';

export const useRecurringEvents = () => {
  const [showRecurringDialog, setShowRecurringDialog] = useState(false);
  const [recurringAction, setRecurringAction] = useState<'edit' | 'delete' | null>(null);
  const [targetEvent, setTargetEvent] = useState<Event | null>(null);

  const handleRecurringEdit = (event: Event) => {
    if (event.repeat.type !== 'none') {
      setTargetEvent(event);
      setRecurringAction('edit');
      setShowRecurringDialog(true);
      return true;
    }
    return false;
  };

  const handleRecurringDelete = (event: Event) => {
    if (event.repeat.type !== 'none') {
      setTargetEvent(event);
      setRecurringAction('delete');
      setShowRecurringDialog(true);
      return true;
    }
    return false;
  };

  const closeDialog = () => {
    setShowRecurringDialog(false);
    setRecurringAction(null);
    setTargetEvent(null);
  };

  return {
    showRecurringDialog,
    recurringAction,
    targetEvent,
    handleRecurringEdit,
    handleRecurringDelete,
    closeDialog,
  };
};
