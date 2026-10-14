import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json({ limit: '10mb' }));

  // Shared server-side Gemini client
  const apiKey = process.env.GEMINI_API_KEY || '';
  const ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });

  // Health and info check
  app.get('/api/health', (_req, res) => {
    res.json({
      status: 'ok',
      conference: 'TechTalk2026',
      organizer: 'ICPeP Oman Chapter',
      theme: 'Pioneering Intelligent Frontiers: Oman Vision 2040, Sustainable Computing & Next-Gen Cyber-Physical Systems',
      hasApiKey: Boolean(process.env.GEMINI_API_KEY),
      timestamp: new Date().toISOString(),
    });
  });

  // Deep Reasoning Endpoint using gemini-4-argon with high thinking mode
  app.post('/api/gemini/deep-reasoning', async (req, res) => {
    try {
      const { prompt, mode, contextData } = req.body;

      if (!prompt || typeof prompt !== 'string') {
        return res.status(400).json({ error: 'Prompt is required.' });
      }

      if (!process.env.GEMINI_API_KEY) {
        return res.status(503).json({
          error: 'GEMINI_API_KEY is not configured on the server. Please add your API key in the Secrets panel.',
        });
      }

      const systemInstruction = `You are the Lead Technical & Scientific Advisory Engine for "TechTalk2026", the flagship annual international technical conference organized by the Institute of Computer Engineers of the Philippines (ICPeP) - Oman Chapter, hosted in Muscat, Sultanate of Oman.

Conference Theme: "Pioneering Intelligent Frontiers: Oman Vision 2040, Sustainable Computing & Next-Gen Cyber-Physical Systems".
Target Audience: Professional Computer Engineers (CpE), Electronics Engineers (ECE), Cloud & Security Architects, Embedded Systems Engineers, Researchers, and Engineering Students across Oman and the GCC.

Mode Context: ${mode || 'general'}
Context Parameters: ${JSON.stringify(contextData || {})}

Guidelines:
1. Conduct exhaustive, rigorous, and logically sound engineering reasoning. Address concrete engineering metrics (latency, memory overhead, thermal constraints, bandwidth, bill-of-materials, reliability MTBF, security threat vectors, and compliance standards like IEEE, ISO 26262, IEC 62443, GCC data sovereignty).
2. Format output cleanly in Markdown:
   - ### Executive Summary
   - ### Deep Architectural & Scientific Analysis
   - ### Trade-Off Matrix / Practical Constraints
   - ### Recommended Implementation (Code / Schematics / Architectural Blueprint)
   - ### TechTalk2026 & Oman Vision 2040 Relevance (Track connections & CPD growth)
3. Maintain high technical authority, clarity, and precision.`;

      let response;
      let usedModel = 'gemini-4-argon';

      // Call gemini-4-argon with thinkingLevel: ThinkingLevel.HIGH
      // Per instructions: DO NOT set maxOutputTokens
      try {
        response = await ai.models.generateContent({
          model: 'gemini-4-argon',
          contents: [
            {
              role: 'user',
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
          config: {
            systemInstruction,
            thinkingConfig: {
              thinkingLevel: ThinkingLevel.HIGH,
            },
          },
        });
      } catch (argonError: any) {
        console.warn('gemini-4-argon request encountered:', argonError?.message);
        // If gemini-4-argon is restricted due to free-tier quota limits (limit 0 on free tier), fallback to gemini-3.8-flash with HIGH thinking
        if (
          argonError?.status === 429 || 
          argonError?.message?.includes('quota') || 
          argonError?.message?.includes('RESOURCE_EXHAUSTED') ||
          argonError?.message?.includes('limit: 0')
        ) {
          usedModel = 'gemini-3.8-flash (High-Reasoning Fallback)';
          response = await ai.models.generateContent({
            model: 'gemini-3.8-flash',
            contents: [
              {
                role: 'user',
                parts: [
                  {
                    text: prompt,
                  },
                ],
              },
            ],
            config: {
              systemInstruction,
              thinkingConfig: {
                thinkingLevel: ThinkingLevel.HIGH,
              },
            },
          });
        } else {
          throw argonError;
        }
      }

      const text = response?.text || 'No response generated from reasoning engine.';

      return res.json({
        success: true,
        result: text,
        model: usedModel,
        thinkingLevel: 'HIGH',
      });
    } catch (error: any) {
      console.error('Gemini 4 Argon reasoning error:', error);
      return res.status(500).json({
        error: error.message || 'Failed to generate technical analysis.',
        details: error.status || 'Internal Error',
      });
    }
  });

  // Setup Vite in development or static serving in production
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`TechTalk2026 server running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Server startup error:', err);
  process.exit(1);
});
