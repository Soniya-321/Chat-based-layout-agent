import { useState, useCallback } from 'react';
import initialLayout from '../data/initialLayout.json';
import { sendChatMessage } from '../utils/api.js';

export function useLayoutAgent() {
  const [layout, setLayout] = useState(initialLayout);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "👋 Hi! I'm your layout agent. Try: \"Convert to 9:16\", \"Move the headline to the top\", or \"Make the offer badge bigger\"."
    }
  ]);
  const [loading, setLoading] = useState(false);

  const sendMessage = useCallback(async (text) => {
    const userMsg = { role: 'user', content: text };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      // Pass last 6 messages as history for follow-up context
      const history = messages
        .slice(-6)
        .map(({ role, content }) => ({ role, content }));

      const { explanation, updatedLayout } = await sendChatMessage({
        message: text,
        layout,
        history
      });

      setLayout(updatedLayout);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: explanation }
      ]);
    } catch (err) {
      const errorMsg =
        err?.response?.data?.explanation || 'Something went wrong. Please try again.';
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: `⚠️ ${errorMsg}` }
      ]);
    } finally {
      setLoading(false);
    }
  }, [layout, messages]);

  const resetLayout = useCallback(() => {
    setLayout(initialLayout);
    setMessages((prev) => [
      ...prev,
      { role: 'assistant', content: '🔄 Layout reset to original.' }
    ]);
  }, []);

  return { layout, messages, loading, sendMessage, resetLayout };
}