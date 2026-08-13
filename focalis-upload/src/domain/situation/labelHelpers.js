export function labelOf(options, value) {
  return options.find((o) => o.value === value)?.label ?? value;
}
