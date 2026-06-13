import type { CupResult, LineupSlot, FormationKey } from "../types";

const COLORS = {
  page: "#EEE8D9",
  paper: "#FBF8EF",
  ink: "#17140F",
  soft: "#6E665A",
  line: "rgba(23,20,15,0.12)",
  gold: "#C8972E",
  goldLight: "#E7BE4D",
};

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function drawBrazilFlag(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number
) {
  ctx.save();
  ctx.fillStyle = "#009C3B";
  ctx.fillRect(x, y, w, h);
  ctx.fillStyle = "#FFDF00";
  ctx.beginPath();
  ctx.moveTo(x + w / 2, y + 2);
  ctx.lineTo(x + w - 3, y + h / 2);
  ctx.lineTo(x + w / 2, y + h - 2);
  ctx.lineTo(x + 3, y + h / 2);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "#002776";
  ctx.beginPath();
  ctx.arc(x + w / 2, y + h / 2, h * 0.26, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

const OUTCOME_TEXT: Record<CupResult["outcome"], string> = {
  CAMPEÃO: "CAMPEÃO",
  VICE: "VICE-CAMPEÃO",
  ELIMINADO: "ELIMINADO",
};

export async function renderCardBlob(
  lineup: LineupSlot[],
  cup: CupResult,
  formationKey: FormationKey
): Promise<Blob> {
  try {
    await (document as any).fonts?.ready;
  } catch {
    /* ignore */
  }

  const players = lineup.filter((s) => s.player);
  const W = 760;
  const PAD = 54;
  const FRAME = 7;

  // ---- layout vertical (determinístico) ----
  const yBrand = 84;
  const yDivider = 104;
  const yOutcome = 168;
  const yRecord = 300;
  const boxY = 336;
  const boxH = 188;
  const listStart = boxY + boxH + 52;
  const rowH = 52;
  const lastRowY = listStart + players.length * rowH;
  const footerY = lastRowY + 6;
  const H = footerY + 58;

  const scale = 2;
  const canvas = document.createElement("canvas");
  canvas.width = W * scale;
  canvas.height = H * scale;
  const ctx = canvas.getContext("2d")!;
  ctx.scale(scale, scale);
  ctx.textBaseline = "alphabetic";

  // fundo da página + moldura dourada fina
  ctx.fillStyle = COLORS.page;
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = COLORS.gold;
  roundRect(ctx, 14, 14, W - 28, H - 28, 20);
  ctx.fill();
  ctx.fillStyle = COLORS.paper;
  roundRect(ctx, 14 + FRAME, 14 + FRAME, W - 28 - FRAME * 2, H - 28 - FRAME * 2, 14);
  ctx.fill();

  // ---- topo: marca + seed ----
  ctx.fillStyle = COLORS.ink;
  ctx.font = "800 30px Archivo, sans-serif";
  ctx.textAlign = "left";
  ctx.fillText("7", PAD, yBrand);
  const w7 = ctx.measureText("7").width;
  ctx.fillStyle = COLORS.gold;
  ctx.fillText("x", PAD + w7, yBrand);
  const wx = ctx.measureText("x").width;
  ctx.fillStyle = COLORS.ink;
  ctx.fillText("1", PAD + w7 + wx, yBrand);

  ctx.fillStyle = COLORS.soft;
  ctx.font = "600 18px Inter, sans-serif";
  ctx.textAlign = "right";
  ctx.fillText(`seed #${cup.seed}`, W - PAD, yBrand);

  // linha
  ctx.strokeStyle = COLORS.line;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(PAD, yDivider);
  ctx.lineTo(W - PAD, yDivider);
  ctx.stroke();

  // ---- resultado ----
  ctx.textAlign = "center";
  ctx.fillStyle = COLORS.ink;
  ctx.font = "800 42px Archivo, sans-serif";
  ctx.fillText(OUTCOME_TEXT[cup.outcome], W / 2, yOutcome);

  // recorde grande (gold 3d)
  const record = `${cup.wins}-${cup.losses}`;
  ctx.font = "108px Anton, sans-serif";
  ctx.fillStyle = "#7C5713";
  ctx.fillText(record, W / 2 + 3, yRecord + 3);
  ctx.fillStyle = COLORS.goldLight;
  ctx.fillText(record, W / 2, yRecord);

  // ---- caixa de estatísticas (2x2, divisores completos) ----
  const boxX = PAD;
  const boxW = W - PAD * 2;
  ctx.strokeStyle = COLORS.ink;
  ctx.lineWidth = 2.5;
  roundRect(ctx, boxX, boxY, boxW, boxH, 10);
  ctx.stroke();
  // divisores que cruzam a caixa
  ctx.strokeStyle = COLORS.line;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(boxX + boxW / 2, boxY + 12);
  ctx.lineTo(boxX + boxW / 2, boxY + boxH - 12);
  ctx.moveTo(boxX + 12, boxY + boxH / 2);
  ctx.lineTo(boxX + boxW - 12, boxY + boxH / 2);
  ctx.stroke();

  const stat = (cx: number, cy: number, value: string, label: string, gold = false) => {
    ctx.textAlign = "center";
    ctx.fillStyle = gold ? COLORS.gold : COLORS.ink;
    ctx.font = "52px Anton, sans-serif";
    ctx.fillText(value, cx, cy);
    ctx.fillStyle = COLORS.soft;
    ctx.font = "600 15px Inter, sans-serif";
    ctx.fillText(label.toUpperCase(), cx, cy + 26);
  };
  const cxL = boxX + boxW * 0.25;
  const cxR = boxX + boxW * 0.75;
  const cyTop = boxY + boxH * 0.25 + 16;
  const cyBot = boxY + boxH * 0.75 + 16;
  stat(cxL, cyTop, String(cup.goalsFor), "Gols pró");
  stat(cxR, cyTop, String(cup.goalsAgainst), "Sofridos", true);
  stat(cxL, cyBot, String(cup.overall), "Overall");
  stat(cxR, cyBot, String(cup.wins), "Vitórias", true);

  // ---- lista de jogadores ----
  let y = listStart;
  for (const slot of lineup) {
    const p = slot.player;
    if (!p) continue;
    const isMvp = p.id === cup.mvp.id;
    const rowX = PAD;
    const rowW = W - PAD * 2;

    if (isMvp) {
      ctx.fillStyle = "rgba(200,151,46,0.10)";
      roundRect(ctx, rowX, y - rowH + 14, rowW, rowH - 8, 9);
      ctx.fill();
      ctx.strokeStyle = COLORS.gold;
      ctx.lineWidth = 2;
      roundRect(ctx, rowX, y - rowH + 14, rowW, rowH - 8, 9);
      ctx.stroke();
    } else {
      ctx.strokeStyle = COLORS.line;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(rowX, y + 12);
      ctx.lineTo(rowX + rowW, y + 12);
      ctx.stroke();
    }

    ctx.textAlign = "left";
    ctx.fillStyle = COLORS.soft;
    ctx.font = "700 18px Archivo, sans-serif";
    ctx.fillText(String(p.shirtNumber), rowX + 18, y);

    ctx.fillStyle = isMvp ? COLORS.gold : COLORS.ink;
    ctx.font = "700 22px Archivo, sans-serif";
    ctx.fillText(p.shortName, rowX + 58, y);

    // bandeira + BRA + ano (da direita p/ esquerda)
    const rightEdge = rowX + rowW - 18;
    ctx.textAlign = "right";
    ctx.font = "700 18px Inter, sans-serif";
    ctx.fillStyle = COLORS.ink;
    ctx.fillText(String(p.year), rightEdge, y);
    const yearW = ctx.measureText(String(p.year)).width;

    const braRight = rightEdge - yearW - 7;
    ctx.font = "600 18px Inter, sans-serif";
    ctx.fillStyle = COLORS.soft;
    ctx.fillText("BRA", braRight, y);
    const braW = ctx.measureText("BRA").width;

    drawBrazilFlag(ctx, braRight - braW - 32, y - 14, 25, 17);
    ctx.textAlign = "left";

    y += rowH;
  }

  // ---- rodapé ----
  ctx.strokeStyle = COLORS.line;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(PAD, footerY - 22);
  ctx.lineTo(W - PAD, footerY - 22);
  ctx.stroke();
  ctx.textAlign = "center";
  ctx.fillStyle = COLORS.soft;
  ctx.font = "600 18px Inter, sans-serif";
  ctx.fillText(`7x1  ·  ${formationKey}  ·  monte o seu`, W / 2, footerY + 8);

  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error("Falha ao gerar a imagem"));
    }, "image/png");
  });
}

export async function downloadCard(
  lineup: LineupSlot[],
  cup: CupResult,
  formationKey: FormationKey
): Promise<void> {
  const blob = await renderCardBlob(lineup, cup, formationKey);
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `7x1-${cup.seed}.png`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}
