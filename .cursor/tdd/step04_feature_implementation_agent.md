# Feature Implementation Agent Rule (GREEN)

# **STEP04. 기능 구현 (GREEN)**

## 📍 현재 단계: 4️⃣ 기능 구현 (GREEN)

**역할**: 실패하는 테스트를 통과시키기 위해 필요한 최소한의 기능 구현을 수행한다.
테스트를 GREEN 상태로 만든다.

**⚠️ 금지 사항**:

- **테스트 코드 수정 절대 금지** - RED 단계에서 작성한 테스트를 변경하면 안됨
- 테스트 코드는 건드리지 않고 구현 코드만 작성

## 실행 절차

1. **⚠️ 프로젝트 구조 참고 (필수)**: `.cursor/rules/00. foundation/project_structure` 파일을 읽어 파일 배치 규칙 확인
   - 기능이 배치될 위치 확인 (`src/features/`, `src/components/`, `src/utils/`, `src/services/` 등)
   - 파일명 규칙 및 디렉터리 구조 이해
   - 기존 패턴과 일관성 유지
2. **구현 코드 작성**: 테스트를 통과시키는 최소한의 코드를 프로젝트 구조 규칙에 맞게 작성
   - 프로젝트 구조 규칙에 따라 올바른 위치에 파일 생성
   - 파일명 규칙 준수 (PascalCase.tsx, camelCase.ts 등)
3. **테스트 실행**: `echo "q" | pnpm test [파일명]`으로 GREEN 상태를 확인한다.
4. **최소 구현 원칙**: 테스트를 통과시키는 데 필요한 최소한의 구현만 수행한다.
5. **⚠️ 커밋 실행 (절대 필수)**: `run_terminal_cmd` 도구를 사용하여 실제 git 커밋 명령을 실행
   - 커밋이 성공할 때까지 이 단계를 종료하지 않음

## 작성 규칙

- **⚠️ 프로젝트 구조 참고 필수**: 구현 전 `.cursor/rules/00. foundation/project_structure` 파일을 반드시 읽고 확인
  - 기능 구현 위치 결정 시 프로젝트 구조 규칙 준수
  - 파일 배치 규칙에 맞는 경로 사용
  - 기존 프로젝트 패턴과 일관성 유지
- **코드 배치**: `.cursor/rules/00. foundation/project_structure` 규칙에 따라 `src` 폴더 내 적절한 위치에 배치
  - `src/features/[domain]/` - 도메인별 기능 모듈
  - `src/components/` - 재사용 가능한 UI 컴포넌트
  - `src/utils/` - 순수 함수 유틸리티
  - `src/services/` - API 클라이언트, 비즈니스 로직
  - `src/hooks/` - 커스텀 훅
- **코드 컨벤션**: `.cursor/rules/00. foundation/` 규칙 엄격히 준수
- **최소 구현**: 테스트 통과에 필요한 최소한의 코드만 작성
- **테스트 실행**: 구현한 기능의 테스트 파일만 지정하여 실행하고 자동 종료
- **불필요한 개선 금지**: 테스트 통과와 무관한 리팩토링은 하지 않는다

## 커밋 규칙

### 커밋 메시지 형식

```
feat(td-green): implement [기능명]

- 구현 파일: [파일 경로]
- 테스트 파일: [테스트 파일 경로]
- 상태: 통과 (GREEN)
```

### 커밋 체크리스트

- ✅ 모든 RED 테스트가 GREEN으로 통과하는지 실행 결과 확인
- ✅ 최소 구현 원칙 준수 여부 점검
- ✅ 사용자와 통과 결과 공유

**⚠️ 커밋 실행 (절대 필수)**: 이 단계를 마치기 전에 반드시 실제 git 커밋을 실행해야 합니다

- `run_terminal_cmd` 도구를 사용하여 다음 명령을 실행:

  ```bash
  git add src/**/*.ts src/**/*.tsx
  git commit -m "feat(td-green): implement [기능명]" \
    -m "Files:
  - src/features/[도메인]/[파일명].ts
  - src/utils/[파일명].ts

  Test Files:
  - src/__tests__/unit/[파일명].spec.ts
  - src/__tests__/integration/[파일명].spec.tsx

  Status: 통과 (GREEN)
  Coverage: 모든 테스트 통과"
  ```

- **커밋이 성공적으로 완료될 때까지 이 단계를 절대 종료하지 않음**
- 커밋 실패 시 에러를 확인하고 재시도
- 커밋 완료 후 다음 단계로 진행

위 항목을 충족하면 **STEP04 종료 전에 반드시 커밋**합니다.

8. **⚠️ STEP04 요약 표시 (절대 필수)**: 커밋 전에 반드시 STEP04 요약 표를 화면에 표시합니다

## STEP04 요약 (반드시 화면에 표시!)

**⚠️ 필수**: 커밋 전에 반드시 아래 형식으로 화면에 표시하여 사용자가 확인할 수 있도록 해야 합니다!

```markdown
# 📋 STEP04 기능 구현 요약

| 항목        | 내용                                                                               |
| ----------- | ---------------------------------------------------------------------------------- |
| 설계서      | docs/test*design/###*기능명\_test_design.md                                        |
| 구현 파일   | src/utils/[파일명].ts<br>src/features/[도메인]/[파일명].ts                         |
| 테스트 파일 | src/**tests**/unit/[파일명].spec.ts<br>src/**tests**/integration/[파일명].spec.tsx |
| 테스트 상태 | [N]/[M] 통과, [K]개 실패 (있는 경우)                                               |
| 다음 단계   | 5️⃣ 리팩토링                                                                        |
```

**⚠️ 중요**: 이 STEP04 요약을 화면에 표시하지 않고는 STEP04를 종료할 수 없습니다!

---

STEP04는 GREEN 상태 확인과 **커밋까지 완료**해야 종료됩니다.
