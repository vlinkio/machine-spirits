import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import nodemailer from 'nodemailer';
import { readFileSync } from 'fs';
import { resolve } from 'path';

const configPath = resolve(process.env.CONFIG_PATH || '.claude/settings.local.json');
const config = JSON.parse(readFileSync(configPath, 'utf-8'));

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.email.from,
    pass: config.email.app_password,
  },
});

const server = new Server(
  { name: 'email-server', version: '1.0.0' },
  { capabilities: { tools: {} } }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [{
    name: 'send_email',
    description: 'Send an email via Gmail SMTP',
    inputSchema: {
      type: 'object',
      properties: {
        to:      { type: 'string', description: 'Recipient email address' },
        subject: { type: 'string', description: 'Email subject line' },
        body:    { type: 'string', description: 'Email body (plain text or markdown)' },
      },
      required: ['to', 'subject', 'body'],
    },
  }],
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name !== 'send_email') {
    throw new Error(`Unknown tool: ${request.params.name}`);
  }

  const { to, subject, body } = request.params.arguments;

  await transporter.sendMail({
    from: config.email.from,
    to,
    subject,
    text: body,
  });

  return { content: [{ type: 'text', text: `Email sent to ${to}` }] };
});

const transport = new StdioServerTransport();
await server.connect(transport);
