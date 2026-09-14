/** A completed first block stays intact when the second block is retried. */
export function hyperBlockState(questions: { correctIndex: number }[], answers: number[], index: number) {
  const start = index < 9 ? 0 : 9;
  const score = answers.slice(start, start + 9).filter((answer, offset) => answer === questions[start + offset]?.correctIndex).length;
  return { number: start === 0 ? 1 : 2, score, passed: score === 9 };
}

export function retryHyperBlock(answers: number[], index: number) {
  const start = index < 9 ? 0 : 9;
  return { answers: answers.slice(0, start), index: start };
}
