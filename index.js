const express = require('express');
const cors = require('cors');
const z = require('zod');

const app = express();
app.use(express.json());

app.use(cors());


// Validation schema for simple interest
const SimpleInterestSchema = z.object({
  p: z.number(),
  r: z.number(),
  t: z.number(),
});

// Validation schema for compound interest
const CompoundInterestSchema = z.object({
  p: z.number(),
  r: z.number(),
  t: z.number(),
  n: z.number(),
});

app.get('/',(req,res) => {
  res.status(200).send("Welcome...");
})

// Simple interest calculation endpoint
app.post('/SimpleInterest', (req, res) => {
  const validateInput = SimpleInterestSchema.safeParse(req.body);
  if (!validateInput.success) {
    return res.status(400).json({ message: "Invalid input. Please provide valid numbers." });
  }

  const { p, r, t } = validateInput.data;
  const simpleInterest = (p * t * r) / 100;
  return res.status(200).json({ simpleInterest });
});

// Compound interest calculation endpoint
app.post('/CompoundInterest', (req, res) => {
  const validateInput = CompoundInterestSchema.safeParse(req.body);
  if (!validateInput.success) {
    return res.status(400).json({ message: "Invalid input. Please provide valid numbers." });
  }

  const { p, r, t, n } = validateInput.data;
  const compoundInterest = p * (Math.pow((1 + (r / (100 * n))), n * t)) - p;
  return res.status(200).json({ compoundInterest });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
