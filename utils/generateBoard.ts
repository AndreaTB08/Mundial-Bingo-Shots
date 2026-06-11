import { EVENTS } from "@/data/events";
import { BingoCell } from "@/types/bingo";

export function generateBoard(): BingoCell[] {
  const shuffled = [...EVENTS].sort(() => Math.random() - 0.5);

  const selected = shuffled.slice(0, 24);

  const board: BingoCell[] = selected.map((event, index) => ({
    id: index,
    text: event,
    checked: false,
  }));

  board.splice(12, 0, {
    id: 999,
    text: "⚽ GOL",
    checked: true,
  });

  return board;
}