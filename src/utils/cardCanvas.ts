import type { CupResult, LineupSlot, FormationKey } from "../types";
import { BRAZIL_FLAG } from "../data/brazilData";

const COLORS = {
  paper: "#FBF8EF",
  panel: "#17140F",
  ink: "#17140F",
  soft: "#6E665A",
  line: "rgba(0,0,0,0.14)",
  gold: "#C8972E",
  goldLight: "#E7BE4D",
  red: "#E8472B",
  green: "#2F8F3E",
  white: "#F4F0E4",
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

/** Desenha o card e devolve um Blob PNG */
export async function renderCardBlob(
  lineup: LineupSlot[],
  cup: CupResult,
  formationKey: FormationKey
): Promise<Blob> {
  // Garante que as fontes do Google já carregaram
  try {
    await (document as any).fonts?.ready;
  } catch {
    /* ignore */
  }

  const W = 760;
  const H = 1232;
  const scale = 2;
  const canvas = document.createElement("canvas");
  canvas.width = W * scale;
  canvas.height = H * scale;
  const ctx = canvas.getContext("2d")!;
  ctx.scale(scale, scale);

  // Fundo + moldura dourada
  ctx.fillStyle = "#EDE7D7";
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = COLORS.gold;
  roundRect(ctx, 16, 16, W - 32, H - 32, 18);
  ctx.fill();
  ctx.fillStyle = COLORS.paper;
  roundRect(ctx, 24, 24, W - 48, H - 48, 14);
  ctx.fill();

  const PAD = 56;
  let y = 78;

  // Topo: marca + seed
  ctx.textBaseline = "alphabetic";
  ctx.fillStyle = COLORS.ink;
  ctx.font = '700 30px Archivo, sans-serif';
  ctx.textAlign = "left";
  ctx.fillText("7", PAD, y);
  const w7 = ctx.measureText("7").width;
  ctx.fillStyle = COLORS.gold;
  ctx.fillText("x", PAD + w7, y);
  const wx = ctx.measureText("x").width;
  ctx.fillStyle = COLORS.ink;
  ctx.fillText("1", PAD + w7 + wx, y);

  ctx.fillStyle = COLORS.soft;
  ctx.font = "600 18px Inter, sans-serif";
  ctx.textAlign = "right";
  ctx.fillText(`seed #${cup.seed}`, W - PAD, y);

  // Linha
  y += 18;
  ctx.strokeStyle = COLORS.line;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(PAD, y);
  ctx.lineTo(W - PAD, y);
  ctx.stroke();

  // Resultado
  y += 64;
  ctx.textAlign = "center";
  ctx.fillStyle = COLORS.ink;
  ctx.font = "800 40px Archivo, sans-serif";
  const outcomeText =
    cup.outcome === "CAMPEÃO"
      ? "CAMPEÃO"
      : cup.outcome === "VICE"
      ? "VICE-CAMPEÃO"
      : "ELIMINADO";
  ctx.fillText(outcomeText, W / 2, y);

  // Recorde grande (gold 3d)
  y += 132;
  const record = `${cup.wins}-${cup.losses}`;
  ctx.font = "112px Anton, sans-serif";
  ctx.fillStyle = "#7C5713";
  ctx.fillText(record, W / 2 + 4, y + 4);
  ctx.fillStyle = COLORS.goldLight;
  ctx.fillText(record, W / 2, y);

  // Caixa de estatísticas (2x2)
  y += 40;
  const boxX = PAD;
  const boxW = W - PAD * 2;
  const boxH = 200;
  ctx.strokeStyle = COLORS.ink;
  ctx.lineWidth = 2.5;
  roundRect(ctx, boxX, y, boxW, boxH, 8);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(boxX + boxW / 2, y + 16);
  ctx.lineTo(boxX + boxW / 2, y + boxH - 16);
  ctx.moveTo(boxX + 20, y + boxH / 2);
  ctx.lineTo(boxX + boxW - 20, y + boxH / 2);
  ctx.strokeStyle = COLORS.line;
  ctx.lineWidth = 1.5;
  ctx.stroke();

  const stat = (
    cx: number,
    cy: number,
    value: string,
    label: string,
    gold = false
  ) => {
    ctx.textAlign = "center";
    ctx.fillStyle = gold ? COLORS.gold : COLORS.ink;
    ctx.font = "62px Anton, sans-serif";
    ctx.fillText(value, cx, cy);
    ctx.fillStyle = COLORS.soft;
    ctx.font = "600 15px Inter, sans-serif";
    ctx.fillText(label.toUpperCase(), cx, cy + 26);
  };
  const qx = boxX + boxW * 0.25;
  const qx2 = boxX + boxW * 0.75;
  stat(qx, y + 70, String(cup.goalsFor), "Gols pró");
  stat(qx2, y + 70, String(cup.goalsAgainst), "Sofridos", true);
  stat(qx, y + 70 + boxH / 2, String(cup.overall), "Overall");
  stat(qx2, y + 70 + boxH / 2, String(cup.wins), "Vitórias", true);

  // Lista de jogadores
  y += boxH + 40;
  const rowH = 52;
  for (const slot of lineup) {
    const p = slot.player;
    if (!p) continue;
    const isMvp = p.id === cup.mvp.id;
    const rowX = PAD;
    const rowW = W - PAD * 2;
    if (isMvp) {
      ctx.fillStyle = "rgba(200,151,46,0.10)";
      roundRect(ctx, rowX, y - rowH + 14, rowW, rowH - 8, 8);
      ctx.fill();
      ctx.strokeStyle = COLORS.gold;
      ctx.lineWidth = 2;
      roundRect(ctx, rowX, y - rowH + 14, rowW, rowH - 8, 8);
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
    ctx.fillText(String(p.shirtNumber), rowX + 16, y);

    ctx.fillStyle = isMvp ? COLORS.gold : COLORS.ink;
    ctx.font = "700 22px Archivo, sans-serif";
    ctx.fillText(p.shortName, rowX + 58, y);

    ctx.textAlign = "right";
    ctx.fillStyle = COLORS.soft;
    ctx.font = "600 18px Inter, sans-serif";
    ctx.fillText(`${BRAZIL_FLAG} BRA ${p.year}`, rowX + rowW - 16, y);

    y += rowH;
  }

  // Rodapé
  y += 10;
  ctx.strokeStyle = COLORS.line;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(PAD, y - 24);
  ctx.lineTo(W - PAD, y - 24);
  ctx.stroke();
  ctx.textAlign = "center";
  ctx.fillStyle = COLORS.soft;
  ctx.font = "600 18px Inter, sans-serif";
  ctx.fillText(`7x1  ·  ${formationKey}  ·  monte o seu`, W / 2, y + 6);

  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error("Falha ao gerar a imagem"));
    }, "image/png");
  });
}

/** Gera e baixa o card como PNG */
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
