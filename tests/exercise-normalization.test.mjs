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

test("treats spacing around dashes and brackets as presentation only", () => {
  assert.equal(
    normalizeExactInput("The answer — if we can find it — will change the plan.", normalization),
    normalizeExactInput("The answer—if we can find it—will change the plan.", normalization),
  );
  assert.equal(
    normalizeExactInput("It was repeated in 2025 ( using a larger sample ).", normalization),
    normalizeExactInput("It was repeated in 2025 (using a larger sample).", normalization),
  );
});
