import { http, HttpResponse } from 'msw';

import { server } from '../setupTests';
import { Event } from '../types';

// ! Hard 여기 제공 안함
export const setupMockHandlerCreation = (initEvents = [] as Event[]) => {
  const mockEvents: Event[] = [...initEvents];
  let repeatIdCounter = 1;

  server.use(
    http.get('/api/events', () => {
      return HttpResponse.json({ events: mockEvents });
    }),
    http.post('/api/events', async ({ request }) => {
      const newEvent = (await request.json()) as Event;
      // ID가 이미 있으면 유지, 없으면 생성
      if (!newEvent.id) {
        newEvent.id = String(mockEvents.length + 1);
      }
      mockEvents.push(newEvent);
      return HttpResponse.json(newEvent, { status: 201 });
    }),
    http.post('/api/events-list', async ({ request }) => {
      const { events } = (await request.json()) as { events: Event[] };
      const repeatId = `repeat-${repeatIdCounter++}`;

      const newEvents = events.map((event) => ({
        ...event,
        repeat: {
          ...event.repeat,
          id: event.repeat.type !== 'none' ? repeatId : undefined,
        },
      }));

      mockEvents.push(...newEvents);
      return HttpResponse.json(newEvents, { status: 201 });
    }),
    http.put('/api/events/:id', async ({ params, request }) => {
      const { id } = params;
      const updatedEvent = (await request.json()) as Event;
      const index = mockEvents.findIndex((event) => event.id === id);

      if (index !== -1) {
        mockEvents[index] = { ...mockEvents[index], ...updatedEvent };
        return HttpResponse.json(mockEvents[index]);
      }
      return new HttpResponse(null, { status: 404 });
    }),
    http.put('/api/events-list', async ({ request }) => {
      const { events } = (await request.json()) as { events: Event[] };
      let isUpdated = false;

      events.forEach((event) => {
        const index = mockEvents.findIndex((target) => target.id === event.id);
        if (index !== -1) {
          isUpdated = true;
          mockEvents[index] = { ...mockEvents[index], ...event };
        }
      });

      if (isUpdated) {
        return HttpResponse.json(mockEvents);
      }
      return new HttpResponse(null, { status: 404 });
    }),
    http.put('/api/recurring-events/:repeatId', async ({ params, request }) => {
      const { repeatId } = params;
      const updateData = (await request.json()) as Event;

      const updatedEvents = mockEvents.filter((e) => e.repeat.id === repeatId);

      if (updatedEvents.length === 0) {
        return new HttpResponse(null, { status: 404 });
      }

      mockEvents.forEach((event, index) => {
        if (event.repeat.id === repeatId) {
          mockEvents[index] = {
            ...event,
            title: updateData.title || event.title,
            description: updateData.description || event.description,
            location: updateData.location || event.location,
            category: updateData.category || event.category,
            notificationTime: updateData.notificationTime || event.notificationTime,
            repeat: updateData.repeat ? { ...event.repeat, ...updateData.repeat } : event.repeat,
          };
        }
      });

      return HttpResponse.json(updatedEvents);
    }),
    http.delete('/api/events/:id', ({ params }) => {
      const { id } = params;
      const index = mockEvents.findIndex((event) => event.id === id);

      if (index !== -1) {
        mockEvents.splice(index, 1);
        return new HttpResponse(null, { status: 204 });
      }
      return new HttpResponse(null, { status: 404 });
    }),
    http.delete('/api/events-list', async ({ request }) => {
      const { eventIds } = (await request.json()) as { eventIds: string[] };
      const remainingEvents = mockEvents.filter((event) => !eventIds.includes(event.id));

      mockEvents.length = 0;
      mockEvents.push(...remainingEvents);
      return new HttpResponse(null, { status: 204 });
    }),
    http.delete('/api/recurring-events/:repeatId', ({ params }) => {
      const { repeatId } = params;
      const initialLength = mockEvents.length;

      const remainingEvents = mockEvents.filter((e) => e.repeat.id !== repeatId);

      if (remainingEvents.length === initialLength) {
        return new HttpResponse(null, { status: 404 });
      }

      mockEvents.length = 0;
      mockEvents.push(...remainingEvents);
      return new HttpResponse(null, { status: 204 });
    })
  );
};

export const setupMockHandlerUpdating = () => {
  const mockEvents: Event[] = [
    {
      id: '1',
      title: '기존 회의',
      date: '2025-10-15',
      startTime: '09:00',
      endTime: '10:00',
      description: '기존 팀 미팅',
      location: '회의실 B',
      category: '업무',
      repeat: { type: 'none', interval: 0 },
      notificationTime: 10,
    },
    {
      id: '2',
      title: '기존 회의2',
      date: '2025-10-15',
      startTime: '11:00',
      endTime: '12:00',
      description: '기존 팀 미팅 2',
      location: '회의실 C',
      category: '업무',
      repeat: { type: 'none', interval: 0 },
      notificationTime: 10,
    },
  ];

  server.use(
    http.get('/api/events', () => {
      return HttpResponse.json({ events: mockEvents });
    }),
    http.put('/api/events/:id', async ({ params, request }) => {
      const { id } = params;
      const updatedEvent = (await request.json()) as Event;
      const index = mockEvents.findIndex((event) => event.id === id);

      mockEvents[index] = { ...mockEvents[index], ...updatedEvent };
      return HttpResponse.json(mockEvents[index]);
    })
  );
};

export const setupMockHandlerDeletion = () => {
  const mockEvents: Event[] = [
    {
      id: '1',
      title: '삭제할 이벤트',
      date: '2025-10-15',
      startTime: '09:00',
      endTime: '10:00',
      description: '삭제할 이벤트입니다',
      location: '어딘가',
      category: '기타',
      repeat: { type: 'none', interval: 0 },
      notificationTime: 10,
    },
  ];

  server.use(
    http.get('/api/events', () => {
      return HttpResponse.json({ events: mockEvents });
    }),
    http.delete('/api/events/:id', ({ params }) => {
      const { id } = params;
      const index = mockEvents.findIndex((event) => event.id === id);

      mockEvents.splice(index, 1);
      return new HttpResponse(null, { status: 204 });
    })
  );
};
