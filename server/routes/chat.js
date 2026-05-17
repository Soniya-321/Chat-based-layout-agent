import express from 'express';
import { callLLM } from '../services/llmService.js';
import { validateLayout } from '../utils/jsonValidator.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { message, layout, history = [] } = req.body;

  if (!message || !layout) {
    return res.status(400).json({ error: 'message and layout are required' });
  }

  try {
    const result = await callLLM(layout, history.slice(-2), message);
    validateLayout(result.updatedLayout);

    return res.json({
      explanation:   result.explanation || 'Layout updated!',
      updatedLayout: result.updatedLayout,
    });

  } catch (err) {
    console.error('❌ Chat route error:', err.message);

    if (err instanceof SyntaxError || err.message?.includes('invalid JSON')) {
      return res.status(500).json({
        explanation:   'AI returned malformed JSON. Please try again.',
        updatedLayout: layout,
      });
    }

    if (err.message?.includes('rate_limit') || err.status === 429) {
      return res.status(429).json({
        explanation:   '⏳ Rate limit reached. Please wait a moment and try again.',
        updatedLayout: layout,
      });
    }

    return res.status(500).json({
      explanation:   'Something went wrong. Please try again.',
      updatedLayout: layout,
    });
  }
});

export default router;