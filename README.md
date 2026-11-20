# Agentic Gaming

**Your work laptop lost Solitaire. Your coding agent can make you another one.**

Managed corporate laptops often have no Solitaire, no Minesweeper, no game installs, and no access to gaming websites. You have a browser, a coding agent, and a few minutes to spare.

So the idea is simple: **if the games are blocked, generate your own.** Small games, short rounds, and files you can open locally whenever you are bored. The comparison games need no installer, administrator access, backend, or external assets; they run wherever local HTML is permitted.

This repository collects those games and the experiment behind them: **what happens when different models, model generations, and reasoning settings tackle the same kind of game?**

Compare the different game builds at [agenticgames.qiovra.de](https://agenticgames.qiovra.de/).

## One genre, different models

![Six real top-down RPG gameplay screenshots, labeled with their model and reasoning setting: GPT-6.2 Astra high, GPT-6.2 Sol max, GPT-6 Luna medium, Gemini Argon high, Gemini Hydrogen medium, and Claude Opus 5.5 high.](docs/images/rpg-model-comparison.jpg)

*Actual browser captures of six top-down RPGs. Click the image to inspect it at full size. These are examples of the results, not a ranking.*

## What is here?

There are **42 games**: 40 builds across six comparison genres, plus two additional samples.

| Collection | Games | What to expect |
| --- | ---: | --- |
| [Top-down RPG](games/top-down-rpg/) | 9 | Explore, fight monsters, complete a compact quest |
| [Arena shooter](games/quake3arena/) | 9 | First-person movement, weapons, enemies, and an arena |
| [Turn-based tactics](games/xcom-tactics/) | 9 | Tactical turns, several enemies, and line-of-sight decisions |
| [Tower defense](games/tower-defense/) | 7 | Build and upgrade defenses against waves; includes touch-friendly builds |
| [Solitaire](games/solitaire/) | 3 | Klondike with cards, foundations, and restart |
| [Minesweeper](games/minesweeper/) | 3 | Reveal tiles, place flags, avoid mines |
| Additional samples | 2 | [Signal Match](games/signal-match/) and [Gem Circuit](games/gem-circuit/) |

The collection includes these recorded configurations:

| Model labels | Reasoning |
| --- | --- |
| GPT-6 Astra / GPT-6.2 Astra | high |
| GPT-6.1 Sol / GPT-6.2 Sol | max |
| GPT-6 Luna | medium |
| Gemini Hydrogen | medium |
| Gemini Argon | high |
| Claude Fable 5.2 | medium |
| Claude Opus 5.5 | high |

Coverage varies by genre. Model and effort names are the labels recorded for the run or supplied with an imported game. The two additional samples have no recorded model or reasoning setting.

## Play locally

1. Download this repository using **Code → Download ZIP**, or clone it.
2. Extract the files and open `games/<genre>/<model>/index.html` in a desktop browser.
3. Read the controls on the start screen, then play.

For example, open [`games/solitaire/luna/index.html`](games/solitaire/luna/index.html) for **Moonlit Tableau**, or [`games/top-down-rpg/astra-6.2/index.html`](games/top-down-rpg/astra-6.2/index.html) for **The Bell Fen**.

The 40 comparison builds are self-contained HTML files with inline CSS and JavaScript. Keep the entire folder for Signal Match and Gem Circuit: those samples also use the supplied `game.js` and `styles.css` files. Their editable source is included as well.

Most builds target keyboard and mouse. Check each game's `metadata.json` for `mobileSupported` and the notes explaining its touch controls or limitations. A responsive canvas alone does not mean the game supports mobile play.

## Play through GitHub Pages

GitHub's repository file viewer displays HTML source. **GitHub Pages** serves it as an actual web page, so the same files become playable links without changing the games.

To publish this collection, open [repository Settings → Pages](https://github.com/nkombouris/agentic-gaming/settings/pages), choose **Deploy from a branch**, select **main** and **/(root)**, then save. After the first deployment, an individual game will be available at a URL such as:

```text
https://nkombouris.github.io/agentic-gaming/games/solitaire/luna/
```

The existing `games/` directory structure stays intact. See [GitHub's publishing-source instructions](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site) for the setup.

## How the experiment works

- Give agents a shared game-generation brief and a genre. The brief asks for a complete core loop, visible controls, a HUD, win/lose conditions, and restart.
- Run builds in isolated directories so agents cannot overwrite each other's work.
- Compare gameplay, controls, visual choices, completeness, and the amount of fixing needed across models and reasoning settings.
- Keep earlier generations alongside newer runs. For example, `astra/` and `astra-6.2/` are separate entries.
- Save the exact prompt and its hash where available. The GPT-6.2 reruns preserve the earlier genre prompts; [this saved RPG prompt](games/top-down-rpg/astra-6.2/game-prompt.txt) is one example.
- Record what was actually checked. Syntax checks, browser smoke tests, and full gameplay testing are different kinds of evidence.

This is an evolving collection, not a controlled benchmark. Some games were imported from other agents, some received documented fixes, and prompts are not preserved for every entry. Recorded wall-clock times also use different timing boundaries, described in each file; they should not be treated as model-speed rankings.

## Files and metadata

```text
games/
├── top-down-rpg/
│   ├── catalog.json
│   ├── astra/
│   │   ├── index.html
│   │   └── metadata.json
│   ├── astra-6.2/
│   │   ├── index.html
│   │   ├── metadata.json
│   │   └── game-prompt.txt
│   └── ...
├── quake3arena/
├── xcom-tactics/
├── tower-defense/
├── solitaire/
├── minesweeper/
├── signal-match/
├── gem-circuit/
└── shared/
```

Each game's metadata records its title, agent, model, reasoning setting, generation timing, mobile support, and validation where known. Some entries also include source hashes, prompt hashes, or revision history. Unknown values remain `null` or are omitted rather than guessed.

The goal is a small, inspectable game you can actually play—and a useful record of how different agents got there.
