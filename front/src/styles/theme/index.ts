import { COLORS } from "./colors";

const theme = {
  colors: COLORS,
} as const;

export type Theme = typeof theme;
export default theme;
