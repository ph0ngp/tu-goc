import assert from "node:assert/strict";
import test from "node:test";
import { normalizeExactInput } from "../app/exercise-normalization.ts";

const normalization = {
  trim: true,
  ignoreInitialCapital: true,
  ignoreFinalPeriod: true,
};

test("normalizes harmless mobile-keyboard differences in exact answers", () => {
  assert.equal(
    normalizeExactInput('  “Yes, ”  she said.  ', normalization),
    normalizeExactInput('"Yes," she said.', normalization),
  );
  assert.equal(
    normalizeExactInput("She  said  she’d come.", normalization),
    normalizeExactInput("she said she'd come", normalization),
  );
});

test("does not erase punctuation that changes the grammatical answer", () => {
  assert.notEqual(
    normalizeExactInput("The plan failed, we changed direction.", normalization),
    normalizeExactInput("The plan failed; we changed direction.", normalization),
  );
});
