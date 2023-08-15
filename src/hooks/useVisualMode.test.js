import { renderHook, act } from "@testing-library/react-hooks";
import useVisualMode from "./useVisualMode";

const FIRST = "FIRST";
const SECOND = "SECOND";
const THIRD = "THIRD";

test("useVisualMode should initialize with default value", () => {
  const { result } = renderHook(() => useVisualMode(FIRST));
  // Verify that the initial mode matches the default value
  expect(result.current.mode).toBe(FIRST);
});

test("useVisualMode should transition to another mode", () => {
  const { result } = renderHook(() => useVisualMode(FIRST));
  // Transition to the SECOND mode
  act(() => result.current.transition(SECOND));
  // Verify that the mode has changed to SECOND
  expect(result.current.mode).toBe(SECOND);
});

test("useVisualMode should return to previous mode", () => {
  const { result } = renderHook(() => useVisualMode(FIRST));

  // Transition to the SECOND mode
  act(() => result.current.transition(SECOND));
  expect(result.current.mode).toBe(SECOND);

  // Transition to the THIRD mode
  act(() => result.current.transition(THIRD));
  expect(result.current.mode).toBe(THIRD);

  // Go back to the previous mode (SECOND)
  act(() => result.current.back());
  expect(result.current.mode).toBe(SECOND);

  // Go back to the initial mode (FIRST)
  act(() => result.current.back());
  expect(result.current.mode).toBe(FIRST);
});

test("useVisualMode should not return to previous mode if already at initial", () => {
  const { result } = renderHook(() => useVisualMode(FIRST));

  // Try to go back, but should stay at the initial mode (FIRST)
  act(() => result.current.back());
  expect(result.current.mode).toBe(FIRST);
});

test("useVisualMode should replace the current mode", () => {
  const { result } = renderHook(() => useVisualMode(FIRST));

  // Transition to the SECOND mode
  act(() => result.current.transition(SECOND));
  expect(result.current.mode).toBe(SECOND);

  // Transition to the THIRD mode, replacing the current mode
  act(() => result.current.transition(THIRD, true));
  expect(result.current.mode).toBe(THIRD);

  // Go back to the initial mode (FIRST)
  act(() => result.current.back());
  expect(result.current.mode).toBe(FIRST);
});