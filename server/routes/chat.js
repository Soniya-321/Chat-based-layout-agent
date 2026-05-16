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
    // Only use last 2 messages for context — saves tokens significantly
    const trimmedHistory = history.slice(-2);

    const result = await callLLM(layout, trimmedHistory, message);

    validateLayout(result.updatedLayout);

    return res.json({
      explanation: result.explanation || 'Layout updated!',
      updatedLayout: result.updatedLayout
    });

  } catch (err) {
    console.error('❌ Chat route error:', err.message);

    if (err instanceof SyntaxError) {
      return res.status(500).json({
        explanation: 'The AI returned malformed JSON. Please try again.',
        updatedLayout: layout
      });
    }

    // Handle token limit errors specifically
    if (err.message?.includes('413') || err.message?.includes('rate_limit')) {
      return res.status(429).json({
        explanation: 'Request too large. Try a simpler instruction.',
        updatedLayout: layout
      });
    }

    return res.status(500).json({
      explanation: 'Something went wrong. Please try again.',
      updatedLayout: layout
    });
  }
});

export default router;