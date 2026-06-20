# Palette Generator

A semantic color palette generator built with React. Pick one primary color, and the app derives a full role-based palette — secondary, accent, background, and foreground — using HSL color math.

セマンティックカラーパレットジェネレーター。メインカラーを1つ選ぶと、HSLカラーモデルに基づいて secondary / accent / background / foreground を含む役割ベースのパレットを自動生成します。

**Live Demo:** _(coming soon)_

---

## Overview / 概要

**EN**
Most palette tools generate random colors. This one takes a different approach: it treats a single **primary color as the source of truth** and _derives_ every other color from it through deterministic HSL rules. Change the primary, and the entire palette updates in real time. The goal was to model how a real design system builds color roles from a base, rather than picking colors at random.

**JA**
多くのパレットツールはランダムに色を生成します。本プロジェクトは異なるアプローチを取り、**メインカラーを「単一の信頼できる情報源（source of truth）」**として扱い、HSLの計算ルールで他のすべての色を導出します。メインカラーを変更すると、パレット全体がリアルタイムで更新されます。ランダムな色選びではなく、実際のデザインシステムがベースカラーから色の役割を構築する仕組みをモデル化することを目指しました。

---

## Features / 機能

- **Single source of truth** — one primary color drives the whole palette / メインカラー1つでパレット全体を制御
- **HSL-based derivation** — secondary, accent, background, foreground computed via hue/saturation/lightness rules / HSLベースの色導出
- **Dual input** — native color picker + hex text input, kept in sync / カラーピッカーとHEXテキスト入力の二刀流（同期済み）
- **Live preview** — palette recomputes on every change (derived state, never stored) / リアルタイムプレビュー
- **Auto-contrast labels** — text color (dark/light) chosen automatically from each swatch's lightness / 明度に応じた文字色の自動切り替え
- **Click to copy** — click any swatch to copy its HEX to clipboard / クリックでHEXをコピー

---

## Tech Stack / 技術スタック

- **React** (Vite)
- **JavaScript** — no external color libraries; all color math written from scratch / カラー計算ライブラリ不使用、すべて自前実装
- **Inline styles** (intentionally — see Design Notes) / インラインスタイル（意図的な選択、下記参照）

---

## Design & Engineering Notes / 設計・実装メモ

**EN**

A few decisions worth highlighting:

**1. Logic / UI separation.**
All color computation lives in pure functions (`hexToHsl`, `generatePalette`, `hslToCss`, …) that have zero dependency on React. The React layer only consumes their output. This made the logic easy to verify in isolation (via `console.log`) and would let the same engine be reused outside React.

**2. Why HSL instead of RGB.**
Deriving related colors (a complementary accent, a lighter background) is awkward in RGB but natural in HSL, where hue, saturation, and lightness map directly to human intuition. Rotating the hue by a fixed angle or pushing lightness toward an extreme produces predictable, harmonious results.

**3. Keeping the hue family intact.**
Background and foreground retain the primary's **hue** (at low saturation) instead of using neutral gray. This subtle shared "color DNA" is what makes the palette read as one coherent family rather than unrelated colors.

**4. Draft state for the hex input.**
The text field uses a separate "draft" state and only commits to the primary color once the input is a valid 6-digit hex. This prevents the palette from breaking while the user is mid-typing an incomplete value.

**JA**

特筆すべき設計判断：

**1. ロジックとUIの分離。**
すべての色計算はReactに依存しない純粋関数（`hexToHsl`, `generatePalette` など）にまとめ、Reactレイヤーはその出力を表示するだけにしました。ロジックを単独で検証でき、React以外でも再利用可能な構成です。

**2. RGBではなくHSLを採用した理由。**
関連する色の導出（補色のアクセント、明るい背景など）はRGBでは扱いにくく、色相・彩度・明度が人間の直感に対応するHSLでは自然に表現できます。

**3. 色相ファミリーの統一。**
背景色と前景色は、ニュートラルなグレーではなく、メインカラーの**色相**を（低彩度で）保持します。この共通の「カラーDNA」が、パレット全体を一つのまとまりとして見せます。

**4. HEX入力のドラフトステート。**
テキスト入力には独立した「ドラフト」ステートを用い、有効な6桁HEXが入力された時のみメインカラーに反映します。入力途中の不完全な値でパレットが壊れるのを防ぎます。

---

## Roadmap / 今後の予定

This is the v1 from the foundational build. Planned improvements / 基礎段階のv1です。今後の改善予定：

- [ ] Multiple palette styles (earthy / vibrant / monochrome) as switchable rule sets / 複数のパレットスタイルの切り替え
- [ ] WCAG contrast checking for accessibility / アクセシビリティのためのコントラスト判定
- [ ] Rebuild UI with Tailwind CSS for refined visual design / Tailwind CSSによるUIの再設計
- [ ] Export as design tokens (CSS variables / JSON) / デザイントークンとしてのエクスポート

---

## Running Locally / ローカル実行

```bash
npm install
npm run dev
```

---

## About / 制作者

Built as a portfolio project while transitioning toward design engineering — combining a UI design background with React.

UIデザインの経験を活かし、デザインエンジニアを目指す過程で制作したポートフォリオ作品です。

# Palette Generator

A semantic color palette generator built with React. Pick one primary color, and the app derives a full role-based palette — secondary, accent, background, and foreground — using HSL color math.

セマンティックカラーパレットジェネレーター。メインカラーを1つ選ぶと、HSLカラーモデルに基づいて secondary / accent / background / foreground を含む役割ベースのパレットを自動生成します。

**Live Demo:** _(coming soon)_

---

## Overview / 概要

**EN**
Most palette tools generate random colors. This one takes a different approach: it treats a single **primary color as the source of truth** and _derives_ every other color from it through deterministic HSL rules. Change the primary, and the entire palette updates in real time. The goal was to model how a real design system builds color roles from a base, rather than picking colors at random.

**JA**
多くのパレットツールはランダムに色を生成します。本プロジェクトは異なるアプローチを取り、**メインカラーを「単一の信頼できる情報源（source of truth）」**として扱い、HSLの計算ルールで他のすべての色を導出します。メインカラーを変更すると、パレット全体がリアルタイムで更新されます。ランダムな色選びではなく、実際のデザインシステムがベースカラーから色の役割を構築する仕組みをモデル化することを目指しました。

---

## Features / 機能

- **Single source of truth** — one primary color drives the whole palette / メインカラー1つでパレット全体を制御
- **HSL-based derivation** — secondary, accent, background, foreground computed via hue/saturation/lightness rules / HSLベースの色導出
- **Dual input** — native color picker + hex text input, kept in sync / カラーピッカーとHEXテキスト入力の二刀流（同期済み）
- **Live preview** — palette recomputes on every change (derived state, never stored) / リアルタイムプレビュー
- **Auto-contrast labels** — text color (dark/light) chosen automatically from each swatch's lightness / 明度に応じた文字色の自動切り替え
- **Click to copy** — click any swatch to copy its HEX to clipboard / クリックでHEXをコピー

---

## Tech Stack / 技術スタック

- **React** (Vite)
- **JavaScript** — no external color libraries; all color math written from scratch / カラー計算ライブラリ不使用、すべて自前実装
- **Inline styles** (intentionally — see Design Notes) / インラインスタイル（意図的な選択、下記参照）

---

## Design & Engineering Notes / 設計・実装メモ

**EN**

A few decisions worth highlighting:

**1. Logic / UI separation.**
All color computation lives in pure functions (`hexToHsl`, `generatePalette`, `hslToCss`, …) that have zero dependency on React. The React layer only consumes their output. This made the logic easy to verify in isolation (via `console.log`) and would let the same engine be reused outside React.

**2. Why HSL instead of RGB.**
Deriving related colors (a complementary accent, a lighter background) is awkward in RGB but natural in HSL, where hue, saturation, and lightness map directly to human intuition. Rotating the hue by a fixed angle or pushing lightness toward an extreme produces predictable, harmonious results.

**3. Keeping the hue family intact.**
Background and foreground retain the primary's **hue** (at low saturation) instead of using neutral gray. This subtle shared "color DNA" is what makes the palette read as one coherent family rather than unrelated colors.

**4. Draft state for the hex input.**
The text field uses a separate "draft" state and only commits to the primary color once the input is a valid 6-digit hex. This prevents the palette from breaking while the user is mid-typing an incomplete value.

**JA**

特筆すべき設計判断：

**1. ロジックとUIの分離。**
すべての色計算はReactに依存しない純粋関数（`hexToHsl`, `generatePalette` など）にまとめ、Reactレイヤーはその出力を表示するだけにしました。ロジックを単独で検証でき、React以外でも再利用可能な構成です。

**2. RGBではなくHSLを採用した理由。**
関連する色の導出（補色のアクセント、明るい背景など）はRGBでは扱いにくく、色相・彩度・明度が人間の直感に対応するHSLでは自然に表現できます。

**3. 色相ファミリーの統一。**
背景色と前景色は、ニュートラルなグレーではなく、メインカラーの**色相**を（低彩度で）保持します。この共通の「カラーDNA」が、パレット全体を一つのまとまりとして見せます。

**4. HEX入力のドラフトステート。**
テキスト入力には独立した「ドラフト」ステートを用い、有効な6桁HEXが入力された時のみメインカラーに反映します。入力途中の不完全な値でパレットが壊れるのを防ぎます。

---

## Roadmap / 今後の予定

This is the v1 from the foundational build. Planned improvements / 基礎段階のv1です。今後の改善予定：

- [ ] Multiple palette styles (earthy / vibrant / monochrome) as switchable rule sets / 複数のパレットスタイルの切り替え
- [ ] WCAG contrast checking for accessibility / アクセシビリティのためのコントラスト判定
- [ ] Rebuild UI with Tailwind CSS for refined visual design / Tailwind CSSによるUIの再設計
- [ ] Export as design tokens (CSS variables / JSON) / デザイントークンとしてのエクスポート

---

## Running Locally / ローカル実行

```bash
npm install
npm run dev
```

---

## About / 制作者

Built as a portfolio project while transitioning toward design engineering — combining a UI design background with React.

UIデザインの経験を活かし、デザインエンジニアを目指す過程で制作したポートフォリオ作品です。
