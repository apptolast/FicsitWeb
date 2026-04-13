#!/usr/bin/env node
// PreToolUse hook para Write|Edit|MultiEdit.
// Bloquea (exit 2) si el tool intenta escribir secretos o tocar archivos sensibles.

const chunks = [];
process.stdin.on("data", (chunk) => chunks.push(chunk));
process.stdin.on("end", () => {
  let input;
  try {
    input = JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}");
  } catch {
    process.exit(0);
  }

  const toolInput = input.tool_input || {};
  const filePath = toolInput.file_path || toolInput.filePath || "";
  const content =
    toolInput.content ||
    toolInput.new_string ||
    (Array.isArray(toolInput.edits)
      ? toolInput.edits.map((e) => e.new_string || "").join("\n")
      : "");

  const blockedPathFragments = [
    ".env",
    "secrets/",
    ".key",
    ".pem",
    "id_rsa",
    "credentials",
    ".mcp.env.local",
  ];

  const normalized = filePath.replace(/\\/g, "/").toLowerCase();
  for (const frag of blockedPathFragments) {
    if (normalized.includes(frag.toLowerCase())) {
      process.stderr.write(
        `[security-check] Escritura bloqueada en archivo sensible: ${filePath}\n` +
          `Si necesitas guardar una variable de entorno, pídele a Pablo que la añada manualmente a .claude/.mcp.env.local.\n`,
      );
      process.exit(2);
    }
  }

  const secretPatterns = [
    {
      name: "Google Stitch API key",
      re: /AQ\.[A-Za-z0-9_-]{20,}/,
    },
    {
      name: "OpenAI/Anthropic-style secret key",
      re: /sk-[A-Za-z0-9_-]{20,}/,
    },
    {
      name: "GitHub personal access token",
      re: /gh[pousr]_[A-Za-z0-9]{20,}/,
    },
    {
      name: "Generic api_key / secret assignment",
      re: /(api[_-]?key|secret[_-]?key|access[_-]?token)\s*[:=]\s*["'][A-Za-z0-9+/=_-]{20,}["']/i,
    },
  ];

  for (const { name, re } of secretPatterns) {
    if (re.test(content)) {
      process.stderr.write(
        `[security-check] Posible secreto detectado (${name}). Usa variables de entorno en .claude/.mcp.env.local con interpolación \${VAR_NAME}.\n`,
      );
      process.exit(2);
    }
  }

  process.exit(0);
});
