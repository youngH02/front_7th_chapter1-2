import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import App from '../../App';

describe('반복 일정 UI 통합 테스트', () => {
  it('TD-013: 캘린더 뷰 반복 아이콘 표시 - 캘린더 뷰에서 반복 일정에 Repeat 아이콘 표시됨', async () => {
    render(<App />);

    const titleInput = screen.getByLabelText('제목');
    const dateInput = screen.getByLabelText('날짜');
    const startTimeInput = screen.getByLabelText('시작 시간');
    const endTimeInput = screen.getByLabelText('종료 시간');

    await userEvent.clear(titleInput);
    await userEvent.type(titleInput, '반복 일정 테스트');
    await userEvent.clear(dateInput);
    await userEvent.type(dateInput, '2025-10-15');
    await userEvent.clear(startTimeInput);
    await userEvent.type(startTimeInput, '09:00');
    await userEvent.clear(endTimeInput);
    await userEvent.type(endTimeInput, '10:00');

    const repeatCheckbox = screen.getByRole('checkbox', { name: /반복 일정/i });
    await userEvent.click(repeatCheckbox);

    await waitFor(() => {
      const repeatTypeSelect = screen.getByLabelText('반복 유형');
      expect(repeatTypeSelect).toBeInTheDocument();
    });

    const repeatTypeSelect = screen.getByLabelText('반복 유형');
    await userEvent.selectOptions(repeatTypeSelect, 'daily');

    const submitButton = screen.getByRole('button', { name: /일정 추가/i });
    await userEvent.click(submitButton);

    await waitFor(() => {
      const repeatIcon = screen.queryByTestId('RepeatIcon');
      expect(repeatIcon).toBeInTheDocument();
    });
  });

  it('TD-014: 이벤트 리스트 반복 정보 표시 - 이벤트 리스트에서 반복 유형 정보 표시됨', async () => {
    render(<App />);

    const titleInput = screen.getByLabelText('제목');
    const dateInput = screen.getByLabelText('날짜');
    const startTimeInput = screen.getByLabelText('시작 시간');
    const endTimeInput = screen.getByLabelText('종료 시간');

    await userEvent.clear(titleInput);
    await userEvent.type(titleInput, '매주 반복 일정');
    await userEvent.clear(dateInput);
    await userEvent.type(dateInput, '2025-10-15');
    await userEvent.clear(startTimeInput);
    await userEvent.type(startTimeInput, '14:00');
    await userEvent.clear(endTimeInput);
    await userEvent.type(endTimeInput, '15:00');

    const repeatCheckbox = screen.getByRole('checkbox', { name: /반복 일정/i });
    await userEvent.click(repeatCheckbox);

    await waitFor(() => {
      const repeatTypeSelect = screen.getByLabelText('반복 유형');
      expect(repeatTypeSelect).toBeInTheDocument();
    });

    const repeatTypeSelect = screen.getByLabelText('반복 유형');
    await userEvent.selectOptions(repeatTypeSelect, 'weekly');

    const submitButton = screen.getByRole('button', { name: /일정 추가/i });
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/매주 반복/i)).toBeInTheDocument();
    });
  });

  it('TD-015: 단일 일정 수정 다이얼로그 표시 - 반복 일정 수정 시 수정 범위 선택 다이얼로그 표시됨', async () => {
    render(<App />);

    const titleInput = screen.getByLabelText('제목');
    const dateInput = screen.getByLabelText('날짜');
    const startTimeInput = screen.getByLabelText('시작 시간');
    const endTimeInput = screen.getByLabelText('종료 시간');

    await userEvent.clear(titleInput);
    await userEvent.type(titleInput, '수정 테스트 반복 일정');
    await userEvent.clear(dateInput);
    await userEvent.type(dateInput, '2025-10-15');
    await userEvent.clear(startTimeInput);
    await userEvent.type(startTimeInput, '09:00');
    await userEvent.clear(endTimeInput);
    await userEvent.type(endTimeInput, '10:00');

    const repeatTypeSelect = screen.getByLabelText('반복 유형');
    await userEvent.selectOptions(repeatTypeSelect, 'daily');

    const submitButton = screen.getByRole('button', { name: /일정 추가/i });
    await userEvent.click(submitButton);

    await waitFor(() => {
      const editButton = screen.getByRole('button', { name: /수정/i });
      expect(editButton).toBeInTheDocument();
    });

    const editButton = screen.getByRole('button', { name: /수정/i });
    await userEvent.click(editButton);

    await waitFor(() => {
      expect(screen.getByText('반복 일정 수정')).toBeInTheDocument();
      expect(screen.getByText('해당 일정만 수정하시겠어요?')).toBeInTheDocument();
    });
  });

  it('TD-016: 단일 일정만 수정 - "예" 선택 시 선택한 일정만 수정되고 일반 일정으로 변경됨', async () => {
    render(<App />);

    const titleInput = screen.getByLabelText('제목');
    const dateInput = screen.getByLabelText('날짜');
    const startTimeInput = screen.getByLabelText('시작 시간');
    const endTimeInput = screen.getByLabelText('종료 시간');

    await userEvent.clear(titleInput);
    await userEvent.type(titleInput, '단일 수정 테스트');
    await userEvent.clear(dateInput);
    await userEvent.type(dateInput, '2025-10-15');
    await userEvent.clear(startTimeInput);
    await userEvent.type(startTimeInput, '09:00');
    await userEvent.clear(endTimeInput);
    await userEvent.type(endTimeInput, '10:00');

    const repeatTypeSelect = screen.getByLabelText('반복 유형');
    await userEvent.selectOptions(repeatTypeSelect, 'daily');

    const submitButton = screen.getByRole('button', { name: /일정 추가/i });
    await userEvent.click(submitButton);

    await waitFor(() => {
      const editButton = screen.getByRole('button', { name: /수정/i });
      expect(editButton).toBeInTheDocument();
    });

    const editButton = screen.getByRole('button', { name: /수정/i });
    await userEvent.click(editButton);

    await waitFor(() => {
      const yesButton = screen.getByRole('button', { name: /예/i });
      expect(yesButton).toBeInTheDocument();
    });

    const yesButton = screen.getByRole('button', { name: /예/i });
    await userEvent.click(yesButton);

    await waitFor(() => {
      const titleInputAfter = screen.getByLabelText('제목');
      expect(titleInputAfter).toHaveValue('단일 수정 테스트');
    });

    const titleInputAfter = screen.getByLabelText('제목');
    await userEvent.clear(titleInputAfter);
    await userEvent.type(titleInputAfter, '수정된 제목');

    const updateButton = screen.getByRole('button', { name: /일정 수정/i });
    await userEvent.click(updateButton);

    await waitFor(() => {
      expect(screen.getByText('수정된 제목')).toBeInTheDocument();
      const repeatIcon = screen.queryByTestId('RepeatIcon');
      expect(repeatIcon).not.toBeInTheDocument();
    });
  });

  it('TD-017: 전체 일정 수정 - "아니오" 선택 시 모든 반복 인스턴스가 수정됨', async () => {
    render(<App />);

    const titleInput = screen.getByLabelText('제목');
    const dateInput = screen.getByLabelText('날짜');
    const startTimeInput = screen.getByLabelText('시작 시간');
    const endTimeInput = screen.getByLabelText('종료 시간');

    await userEvent.clear(titleInput);
    await userEvent.type(titleInput, '전체 수정 테스트');
    await userEvent.clear(dateInput);
    await userEvent.type(dateInput, '2025-10-15');
    await userEvent.clear(startTimeInput);
    await userEvent.type(startTimeInput, '09:00');
    await userEvent.clear(endTimeInput);
    await userEvent.type(endTimeInput, '10:00');

    const repeatTypeSelect = screen.getByLabelText('반복 유형');
    await userEvent.selectOptions(repeatTypeSelect, 'daily');

    const submitButton = screen.getByRole('button', { name: /일정 추가/i });
    await userEvent.click(submitButton);

    await waitFor(() => {
      const editButton = screen.getByRole('button', { name: /수정/i });
      expect(editButton).toBeInTheDocument();
    });

    const editButton = screen.getByRole('button', { name: /수정/i });
    await userEvent.click(editButton);

    await waitFor(() => {
      const noButton = screen.getByRole('button', { name: /아니오/i });
      expect(noButton).toBeInTheDocument();
    });

    const noButton = screen.getByRole('button', { name: /아니오/i });
    await userEvent.click(noButton);

    await waitFor(() => {
      const titleInputAfter = screen.getByLabelText('제목');
      expect(titleInputAfter).toHaveValue('전체 수정 테스트');
    });

    const titleInputAfter = screen.getByLabelText('제목');
    await userEvent.clear(titleInputAfter);
    await userEvent.type(titleInputAfter, '전체 수정된 제목');

    const updateButton = screen.getByRole('button', { name: /일정 수정/i });
    await userEvent.click(updateButton);

    await waitFor(() => {
      const allEvents = screen.getAllByText('전체 수정된 제목');
      expect(allEvents.length).toBeGreaterThan(1);
      const repeatIcon = screen.queryByTestId('RepeatIcon');
      expect(repeatIcon).toBeInTheDocument();
    });
  });

  it('TD-018: 단일 수정 후 원본 유지 - 단일 수정 후 다른 반복 인스턴스는 영향 없음', async () => {
    render(<App />);

    const titleInput = screen.getByLabelText('제목');
    const dateInput = screen.getByLabelText('날짜');
    const startTimeInput = screen.getByLabelText('시작 시간');
    const endTimeInput = screen.getByLabelText('종료 시간');

    await userEvent.clear(titleInput);
    await userEvent.type(titleInput, '원본 유지 테스트');
    await userEvent.clear(dateInput);
    await userEvent.type(dateInput, '2025-10-15');
    await userEvent.clear(startTimeInput);
    await userEvent.type(startTimeInput, '09:00');
    await userEvent.clear(endTimeInput);
    await userEvent.type(endTimeInput, '10:00');

    const repeatTypeSelect = screen.getByLabelText('반복 유형');
    await userEvent.selectOptions(repeatTypeSelect, 'daily');

    const submitButton = screen.getByRole('button', { name: /일정 추가/i });
    await userEvent.click(submitButton);

    await waitFor(() => {
      const originalEvents = screen.getAllByText('원본 유지 테스트');
      expect(originalEvents.length).toBeGreaterThan(1);
    });

    const originalCount = screen.getAllByText('원본 유지 테스트').length;

    const editButtons = screen.getAllByRole('button', { name: /수정/i });
    await userEvent.click(editButtons[0]);

    await waitFor(() => {
      const yesButton = screen.getByRole('button', { name: /예/i });
      expect(yesButton).toBeInTheDocument();
    });

    const yesButton = screen.getByRole('button', { name: /예/i });
    await userEvent.click(yesButton);

    await waitFor(() => {
      const titleInputAfter = screen.getByLabelText('제목');
      expect(titleInputAfter).toHaveValue('원본 유지 테스트');
    });

    const titleInputAfter = screen.getByLabelText('제목');
    await userEvent.clear(titleInputAfter);
    await userEvent.type(titleInputAfter, '수정된 단일 일정');

    const updateButton = screen.getByRole('button', { name: /일정 수정/i });
    await userEvent.click(updateButton);

    await waitFor(() => {
      expect(screen.getByText('수정된 단일 일정')).toBeInTheDocument();
      const remainingOriginalEvents = screen.getAllByText('원본 유지 테스트');
      expect(remainingOriginalEvents.length).toBe(originalCount - 1);
    });
  });

  it('TD-019: 단일 일정 삭제 다이얼로그 표시 - 반복 일정 삭제 시 삭제 범위 선택 다이얼로그 표시됨', async () => {
    render(<App />);

    const titleInput = screen.getByLabelText('제목');
    const dateInput = screen.getByLabelText('날짜');
    const startTimeInput = screen.getByLabelText('시작 시간');
    const endTimeInput = screen.getByLabelText('종료 시간');

    await userEvent.clear(titleInput);
    await userEvent.type(titleInput, '삭제 테스트 반복 일정');
    await userEvent.clear(dateInput);
    await userEvent.type(dateInput, '2025-10-15');
    await userEvent.clear(startTimeInput);
    await userEvent.type(startTimeInput, '09:00');
    await userEvent.clear(endTimeInput);
    await userEvent.type(endTimeInput, '10:00');

    const repeatTypeSelect = screen.getByLabelText('반복 유형');
    await userEvent.selectOptions(repeatTypeSelect, 'daily');

    const submitButton = screen.getByRole('button', { name: /일정 추가/i });
    await userEvent.click(submitButton);

    await waitFor(() => {
      const deleteButton = screen.getByRole('button', { name: /삭제/i });
      expect(deleteButton).toBeInTheDocument();
    });

    const deleteButton = screen.getByRole('button', { name: /삭제/i });
    await userEvent.click(deleteButton);

    await waitFor(() => {
      expect(screen.getByText('반복 일정 삭제')).toBeInTheDocument();
      expect(screen.getByText('해당 일정만 삭제하시겠어요?')).toBeInTheDocument();
    });
  });

  it('TD-020: 단일 일정만 삭제 - "예" 선택 시 선택한 일정만 삭제됨', async () => {
    render(<App />);

    const titleInput = screen.getByLabelText('제목');
    const dateInput = screen.getByLabelText('날짜');
    const startTimeInput = screen.getByLabelText('시작 시간');
    const endTimeInput = screen.getByLabelText('종료 시간');

    await userEvent.clear(titleInput);
    await userEvent.type(titleInput, '단일 삭제 테스트');
    await userEvent.clear(dateInput);
    await userEvent.type(dateInput, '2025-10-15');
    await userEvent.clear(startTimeInput);
    await userEvent.type(startTimeInput, '09:00');
    await userEvent.clear(endTimeInput);
    await userEvent.type(endTimeInput, '10:00');

    const repeatTypeSelect = screen.getByLabelText('반복 유형');
    await userEvent.selectOptions(repeatTypeSelect, 'daily');

    const submitButton = screen.getByRole('button', { name: /일정 추가/i });
    await userEvent.click(submitButton);

    await waitFor(() => {
      const events = screen.getAllByText('단일 삭제 테스트');
      expect(events.length).toBeGreaterThan(1);
    });

    const originalCount = screen.getAllByText('단일 삭제 테스트').length;

    const deleteButtons = screen.getAllByRole('button', { name: /삭제/i });
    await userEvent.click(deleteButtons[0]);

    await waitFor(() => {
      const yesButton = screen.getByRole('button', { name: /예/i });
      expect(yesButton).toBeInTheDocument();
    });

    const yesButton = screen.getByRole('button', { name: /예/i });
    await userEvent.click(yesButton);

    await waitFor(() => {
      const remainingEvents = screen.getAllByText('단일 삭제 테스트');
      expect(remainingEvents.length).toBe(originalCount - 1);
    });
  });

  it('TD-021: 전체 일정 삭제 - "아니오" 선택 시 모든 반복 인스턴스가 삭제됨', async () => {
    render(<App />);

    const titleInput = screen.getByLabelText('제목');
    const dateInput = screen.getByLabelText('날짜');
    const startTimeInput = screen.getByLabelText('시작 시간');
    const endTimeInput = screen.getByLabelText('종료 시간');

    await userEvent.clear(titleInput);
    await userEvent.type(titleInput, '전체 삭제 테스트');
    await userEvent.clear(dateInput);
    await userEvent.type(dateInput, '2025-10-15');
    await userEvent.clear(startTimeInput);
    await userEvent.type(startTimeInput, '09:00');
    await userEvent.clear(endTimeInput);
    await userEvent.type(endTimeInput, '10:00');

    const repeatTypeSelect = screen.getByLabelText('반복 유형');
    await userEvent.selectOptions(repeatTypeSelect, 'daily');

    const submitButton = screen.getByRole('button', { name: /일정 추가/i });
    await userEvent.click(submitButton);

    await waitFor(() => {
      const events = screen.getAllByText('전체 삭제 테스트');
      expect(events.length).toBeGreaterThan(1);
    });

    const deleteButtons = screen.getAllByRole('button', { name: /삭제/i });
    await userEvent.click(deleteButtons[0]);

    await waitFor(() => {
      const noButton = screen.getByRole('button', { name: /아니오/i });
      expect(noButton).toBeInTheDocument();
    });

    const noButton = screen.getByRole('button', { name: /아니오/i });
    await userEvent.click(noButton);

    await waitFor(() => {
      const events = screen.queryAllByText('전체 삭제 테스트');
      expect(events.length).toBe(0);
    });
  });

  it('TD-022: 단일 수정 후 재수정 - 단일 수정으로 일반 일정이 된 일정 재수정 시 다이얼로그 미표시', async () => {
    render(<App />);

    const titleInput = screen.getByLabelText('제목');
    const dateInput = screen.getByLabelText('날짜');
    const startTimeInput = screen.getByLabelText('시작 시간');
    const endTimeInput = screen.getByLabelText('종료 시간');

    await userEvent.clear(titleInput);
    await userEvent.type(titleInput, '재수정 테스트');
    await userEvent.clear(dateInput);
    await userEvent.type(dateInput, '2025-10-15');
    await userEvent.clear(startTimeInput);
    await userEvent.type(startTimeInput, '09:00');
    await userEvent.clear(endTimeInput);
    await userEvent.type(endTimeInput, '10:00');

    const repeatTypeSelect = screen.getByLabelText('반복 유형');
    await userEvent.selectOptions(repeatTypeSelect, 'daily');

    const submitButton = screen.getByRole('button', { name: /일정 추가/i });
    await userEvent.click(submitButton);

    await waitFor(() => {
      const editButton = screen.getByRole('button', { name: /수정/i });
      expect(editButton).toBeInTheDocument();
    });

    const editButtons = screen.getAllByRole('button', { name: /수정/i });
    await userEvent.click(editButtons[0]);

    await waitFor(() => {
      const yesButton = screen.getByRole('button', { name: /예/i });
      expect(yesButton).toBeInTheDocument();
    });

    const yesButton = screen.getByRole('button', { name: /예/i });
    await userEvent.click(yesButton);

    await waitFor(() => {
      const titleInputAfter = screen.getByLabelText('제목');
      expect(titleInputAfter).toHaveValue('재수정 테스트');
    });

    const titleInputAfter = screen.getByLabelText('제목');
    await userEvent.clear(titleInputAfter);
    await userEvent.type(titleInputAfter, '첫 번째 수정');

    const updateButton = screen.getByRole('button', { name: /일정 수정/i });
    await userEvent.click(updateButton);

    await waitFor(() => {
      expect(screen.getByText('첫 번째 수정')).toBeInTheDocument();
    });

    const editButtonsAfter = screen.getAllByRole('button', { name: /수정/i });
    const firstEditButton = editButtonsAfter.find((btn) => {
      const parent = btn.closest('[data-testid]');
      return parent?.textContent?.includes('첫 번째 수정');
    });

    if (firstEditButton) {
      await userEvent.click(firstEditButton);

      await waitFor(() => {
        const titleInputFinal = screen.getByLabelText('제목');
        expect(titleInputFinal).toHaveValue('첫 번째 수정');
        expect(screen.queryByText('반복 일정 수정')).not.toBeInTheDocument();
      });
    }
  });
});
