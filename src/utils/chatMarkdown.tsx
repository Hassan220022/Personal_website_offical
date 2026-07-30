import React from 'react';

// Tiny safe chat renderer: paragraphs, bullets, bold, and plain links only.
// No HTML passthrough. Unknown markdown is shown as text.

function renderInline(text: string, keyPrefix: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  const re = /(\*\*[^*\n]+\*\*|https?:\/\/[^\s)]+)/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let i = 0;

  while ((match = re.exec(text)) !== null) {
    if (match.index > last) {
      nodes.push(text.slice(last, match.index));
    }
    const token = match[0];
    if (token.startsWith('**') && token.endsWith('**')) {
      nodes.push(
        <strong key={`${keyPrefix}-b-${i++}`} className="font-semibold">
          {token.slice(2, -2)}
        </strong>,
      );
    } else {
      nodes.push(
        <a
          key={`${keyPrefix}-a-${i++}`}
          href={token}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 break-all"
        >
          {token}
        </a>,
      );
    }
    last = match.index + token.length;
  }

  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

export function ChatMarkdown({ content }: { content: string }) {
  const blocks = String(content || '')
    .replace(/\r\n/g, '\n')
    .trim()
    .split(/\n{2,}/);

  if (!blocks.length) return null;

  return (
    <div className="text-sm space-y-2">
      {blocks.map((block, bi) => {
        const lines = block.split('\n').map((l) => l.trimEnd()).filter((l) => l.length > 0);
        const isList = lines.length > 0 && lines.every((l) => /^[-*•]\s+/.test(l));

        if (isList) {
          return (
            <ul key={`blk-${bi}`} className="list-disc pl-4 space-y-1">
              {lines.map((line, li) => (
                <li key={`blk-${bi}-li-${li}`}>
                  {renderInline(line.replace(/^[-*•]\s+/, ''), `blk-${bi}-li-${li}`)}
                </li>
              ))}
            </ul>
          );
        }

        return (
          <p key={`blk-${bi}`} className="whitespace-pre-wrap">
            {lines.map((line, li) => (
              <React.Fragment key={`blk-${bi}-ln-${li}`}>
                {li > 0 ? <br /> : null}
                {renderInline(line, `blk-${bi}-ln-${li}`)}
              </React.Fragment>
            ))}
          </p>
        );
      })}
    </div>
  );
}
